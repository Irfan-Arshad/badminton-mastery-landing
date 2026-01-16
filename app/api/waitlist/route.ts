import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";

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
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const supabase = supabaseServer();

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert([parsed.data]);

    if (insertError) {
      // Handle duplicate email
      if (insertError.code === "23505") {
        const { data: countData } = await supabase.rpc("waitlist_count");
        return NextResponse.json(
          { success: false, reason: "duplicate", count: Number(countData) },
          { status: 409 }
        );
      }
      throw insertError;
    }

    // Fetch updated count
    const { data: count, error: countErr } = await supabase.rpc("waitlist_count");
    if (countErr) throw countErr;

    return NextResponse.json({ success: true, count: Number(count) }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
