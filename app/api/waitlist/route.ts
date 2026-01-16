import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  fetchSupabaseWaitlistCount,
  getSupabaseWaitlistConfig,
  insertSupabaseWaitlistRow,
  SupabaseWaitlistRequestError,
} from '../../../lib/supabaseWaitlist';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(6).max(32),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const config = getSupabaseWaitlistConfig();
    const payload = {
      name: parsed.data.name.trim(),
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone.trim(),
      consent: true as const,
    };

    try {
      await insertSupabaseWaitlistRow(config, payload);
    } catch (error) {
      const supabaseError = error as SupabaseWaitlistRequestError;
      if (supabaseError.code === '23505' || supabaseError.status === 409) {
        const count = await fetchSupabaseWaitlistCount(config);
        return NextResponse.json(
          { success: false, reason: 'duplicate', count },
          { status: 409 },
        );
      }
      throw error;
    }

    const count = await fetchSupabaseWaitlistCount(config);
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (err) {
    console.error('Waitlist POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
