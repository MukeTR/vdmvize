import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function authorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // no secret set -> allow (dev)
  const url = new URL(req.url);
  const header =
    req.headers.get("x-cron-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    url.searchParams.get("secret");
  return header === secret;
}

function fmt(iso: string) {
  const d = new Date(iso);
  const m = ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

async function run(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdmin();
  const { data: generated } = await admin.rpc("generate_visa_reminders");

  const today = new Date().toISOString().slice(0, 10);
  const { data: due } = await admin
    .from("visa_reminders")
    .select("due_date, offset_days, customers(name,phone), visas(country,valid_until)")
    .eq("status", "pending")
    .lte("due_date", today)
    .order("due_date", { ascending: true });

  const rows = (due ?? []) as any[];

  const rowsHtml = rows.length
    ? rows
        .map(
          (r) =>
            `<tr>
               <td style="padding:8px 12px;border-bottom:1px solid #eee">${r.customers?.name ?? "—"}</td>
               <td style="padding:8px 12px;border-bottom:1px solid #eee">${r.visas?.country ?? "—"}</td>
               <td style="padding:8px 12px;border-bottom:1px solid #eee">${fmt(r.visas?.valid_until)}</td>
               <td style="padding:8px 12px;border-bottom:1px solid #eee">${r.customers?.phone ?? "—"}</td>
             </tr>`
        )
        .join("")
    : `<tr><td colspan="4" style="padding:16px;text-align:center;color:#777">Bugün aranacak müşteri yok.</td></tr>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <h2 style="color:#14203c">VDM Vize · Günlük Hatırlatma Özeti</h2>
      <p style="color:#555">${fmt(today)} — vize bitişi yaklaşan <b>${rows.length}</b> müşteri ile iletişime geçilmeli.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <thead>
          <tr style="text-align:left;background:#f7f3eb">
            <th style="padding:8px 12px">Müşteri</th><th style="padding:8px 12px">Ülke</th>
            <th style="padding:8px 12px">Bitiş</th><th style="padding:8px 12px">Telefon</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <p style="color:#999;font-size:12px;margin-top:20px">Bu e-posta VDM CRM tarafından otomatik gönderildi.</p>
    </div>`;

  let emailed = false;
  const key = process.env.RESEND_API_KEY;
  const to = process.env.DIGEST_TO;
  if (key && to && rows.length > 0) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "VDM CRM <onboarding@resend.dev>",
          to: [to],
          subject: `VDM CRM · ${rows.length} vize hatırlatması (${fmt(today)})`,
          html,
        }),
      });
      emailed = res.ok;
      if (!res.ok) console.error("[digest] resend error:", await res.text());
    } catch (e) {
      console.error("[digest] email failed:", e);
    }
  } else {
    console.log(`[digest] ${rows.length} due reminders (email skipped — no RESEND_API_KEY).`);
  }

  return NextResponse.json({
    ok: true,
    generated: generated ?? 0,
    due: rows.length,
    emailed,
  });
}

export async function GET(req: Request) {
  return run(req);
}
export async function POST(req: Request) {
  return run(req);
}
