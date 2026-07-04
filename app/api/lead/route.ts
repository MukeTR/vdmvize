import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

function clean(v: unknown) {
  const s = (v ?? "").toString().trim();
  return s.length ? s : null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
  }

  const name = clean(body.name);
  const phone = clean(body.phone);
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Ad ve telefon zorunlu" }, { status: 400 });
  }

  const admin = createSupabaseAdmin();
  const { error } = await admin.from("leads").insert({
    name,
    phone,
    email: clean(body.email),
    visa_type: clean(body.visa),
    note: clean(body.note),
    source: clean(body.source) ?? "website",
  });

  if (error) {
    console.error("[lead] insert error:", error.message);
    return NextResponse.json({ ok: false, error: "Kayıt oluşturulamadı" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
