import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase.rpc("waitlist_count");

    if (error) throw error;
    return NextResponse.json({ count: Number(data) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
