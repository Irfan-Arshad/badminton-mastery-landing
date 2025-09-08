import { NextResponse } from 'next/server';
import { prisma, ensureDb } from '../../../../lib/db';

export async function GET() {
  try {
    await ensureDb();
    const count = await prisma.waitlist.count();
    return NextResponse.json({ count });
  } catch (e: any) {
    const msg = String(e?.message || e);
    if (e?.code === 'P2021' || msg.includes('no such table')) {
      // Table missing: best-effort create then retry once
      try {
        await ensureDb();
        const count = await prisma.waitlist.count();
        return NextResponse.json({ count });
      } catch {
        return NextResponse.json({ count: 0 });
      }
    }
    // Fallback: don’t block UI; return 0
    return NextResponse.json({ count: 0 });
  }
}

