import { NextResponse } from 'next/server';
import { prisma, ensureDb } from '../../../lib/db';
import { checkRateLimit } from '../../../lib/rateLimit';
import { normalizePhone, waitlistSchema } from '../../../lib/validations';

function getClientIp(req: Request) {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0]?.trim() || 'unknown';
  const ip = req.headers.get('x-real-ip');
  return ip || 'unknown';
}

export async function POST(req: Request) {
  await ensureDb();
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please slow down.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const phone = normalizePhone(data.phone);
  try {
    await prisma.waitlist.create({
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase(),
        phone,
        consent: true,
      },
    });
  } catch (e: any) {
    const msg = String(e?.message || e);
    if (e?.code === 'P2021' || msg.includes('no such table')) {
      // Table missing: create and retry once
      try {
        await ensureDb();
        await prisma.waitlist.create({
          data: {
            name: data.name.trim(),
            email: data.email.toLowerCase(),
            phone,
            consent: true,
          },
        });
      } catch (e2: any) {
        if (e2?.code === 'P2002') {
          return NextResponse.json(
            { success: false, error: 'You are already on the waitlist.' },
            { status: 409 },
          );
        }
        return NextResponse.json(
          { success: false, error: 'Unexpected error. Please try again later.' },
          { status: 500 },
        );
      }
    } else if (e?.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'You are already on the waitlist.' },
        { status: 409 },
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Unexpected error. Please try again later.' },
        { status: 500 },
      );
    }
  }

  const count = await prisma.waitlist.count();
  return NextResponse.json({ success: true, count }, { status: 200 });
}

