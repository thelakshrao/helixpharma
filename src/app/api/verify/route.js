import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export async function POST(req) {
  const { code } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  const cleanCode = code.trim().toUpperCase();

  const { data, error } = await supabase
    .from("verification_codes")
    .select("id, is_used")
    .eq("code", cleanCode)
    .single();

  if (error || !data) {
    return NextResponse.json({ status: "invalid" });
  }

  if (data.is_used) {
    return NextResponse.json({ status: "already_used" });
  }

  await supabase
    .from("verification_codes")
    .update({ is_used: true, used_at: new Date().toISOString() })
    .eq("id", data.id);

  return NextResponse.json({ status: "valid" });
}