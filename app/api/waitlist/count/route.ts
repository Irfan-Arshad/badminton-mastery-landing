import { NextResponse } from 'next/server';
import { prisma, ensureDb } from '../../../../lib/db';

async function fetchSupabaseWaitlistCount(url: string, serviceRoleKey: string, table = 'waitlist') {
  const endpoint = new URL(`/rest/v1/${table}`, url);
  endpoint.searchParams.set('select', 'id');
  endpoint.searchParams.set('head', 'true');

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'count=exact',
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Supabase waitlist count failed (${response.status})`);
  }

  const contentRange = response.headers.get('content-range');
  if (!contentRange) {
    throw new Error('Supabase waitlist count missing content-range header');
  }

  const totalPart = contentRange.split('/').pop();
  const count = totalPart ? Number(totalPart) : Number.NaN;
  if (Number.isNaN(count)) {
    throw new Error(`Supabase waitlist count invalid header: ${contentRange}`);
  }

  return count;
}

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const waitlistTable = process.env.SUPABASE_WAITLIST_TABLE || 'waitlist';

  if (supabaseUrl && supabaseServiceRoleKey) {
    try {
      const count = await fetchSupabaseWaitlistCount(supabaseUrl, supabaseServiceRoleKey, waitlistTable);
      return NextResponse.json({ count });
    } catch (_error) {
      // Fall back to Prisma below if Supabase is misconfigured.
    }
  }

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

