import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = supabaseServer();

    const { count, error } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("Supabase count error:", error);
      return NextResponse.json(
        { count: 0 },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { count: count ?? 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e: any) {
    console.error("Waitlist count route error:", e);
    return NextResponse.json(
      { count: 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
