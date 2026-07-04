import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/admin/ui";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";
import { fmtDate, fmtDateTime, sourceLabel, waLink, telLink } from "@/lib/crm";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";
import { addActivityAction, convertLeadAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).single();
  if (!lead) notFound();

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .eq("entity_type", "lead")
    .eq("entity_id", id)
    .order("created_at", { ascending: false });

  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--color-cloud)] placeholder:text-[color:var(--color-mist-2)] outline-none focus:border-[color:var(--color-gold)]";

  return (
    <>
      <Link href="/admin/leads" className="ticket text-[0.7rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-sky)]">
        ← Leadler
      </Link>

      <div className="mt-3 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)]">
            {lead.name}
          </h1>
          <p className="ticket mt-1 text-[0.72rem] text-[color:var(--color-mist-2)]">
            {sourceLabel(lead.source)} · {fmtDate(lead.created_at)}
          </p>
        </div>
        <LeadStatusSelect id={lead.id} status={lead.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* left: details + notes */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-sm font-semibold text-[color:var(--color-cloud)]">Bilgiler</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">TELEFON</dt>
                <dd className="ticket mt-1 text-[color:var(--color-cloud)]">{lead.phone}</dd>
              </div>
              <div>
                <dt className="ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">E-POSTA</dt>
                <dd className="mt-1 text-[color:var(--color-cloud)]">{lead.email || "—"}</dd>
              </div>
              <div>
                <dt className="ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">VİZE TÜRÜ</dt>
                <dd className="mt-1 text-[color:var(--color-cloud)]">{lead.visa_type || "—"}</dd>
              </div>
              <div>
                <dt className="ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">DURUM</dt>
                <dd className="mt-1 text-[color:var(--color-cloud)]">{lead.status}</dd>
              </div>
              {lead.note && (
                <div className="col-span-2">
                  <dt className="ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">NOT</dt>
                  <dd className="mt-1 text-[color:var(--color-mist)]">{lead.note}</dd>
                </div>
              )}
            </dl>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-sm font-semibold text-[color:var(--color-cloud)]">Notlar & geçmiş</h2>
            <form action={addActivityAction} className="mb-5 flex gap-2">
              <input type="hidden" name="entity_type" value="lead" />
              <input type="hidden" name="entity_id" value={lead.id} />
              <input name="body" placeholder="Not ekle…" className={field} required />
              <button className="shrink-0 rounded-lg bg-[color:var(--color-cloud)] px-4 text-sm font-semibold text-white">
                Ekle
              </button>
            </form>
            <ul className="space-y-3">
              {(activities ?? []).map((a) => (
                <li key={a.id} className="flex gap-3 border-l-2 border-[color:var(--color-hairline-2)] pl-3">
                  <div>
                    <div className="text-sm text-[color:var(--color-cloud)]">{a.body}</div>
                    <div className="ticket text-[0.62rem] text-[color:var(--color-mist-2)]">
                      {a.kind} · {fmtDateTime(a.created_at)}
                    </div>
                  </div>
                </li>
              ))}
              {(!activities || activities.length === 0) && (
                <li className="text-sm text-[color:var(--color-mist-2)]">Henüz kayıt yok.</li>
              )}
            </ul>
          </Card>
        </div>

        {/* right: actions */}
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-[color:var(--color-cloud)]">Hızlı iletişim</h2>
            <div className="space-y-2.5">
              <a
                href={waLink(lead.phone, `Merhaba ${lead.name}, VDM Vize Danışmanlık'tan ulaşıyorum.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[color:var(--color-wa)] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <WaIcon /> WhatsApp
              </a>
              <a
                href={telLink(lead.phone)}
                className="flex items-center gap-2 rounded-lg border border-[color:var(--color-hairline-2)] px-4 py-2.5 text-sm font-semibold text-[color:var(--color-cloud)]"
              >
                <PhoneIcon /> {lead.phone}
              </a>
            </div>
          </Card>

          {lead.status !== "won" && (
            <Card className="p-5">
              <h2 className="mb-1 text-sm font-semibold text-[color:var(--color-cloud)]">Müşteriye çevir</h2>
              <p className="mb-3 text-xs text-[color:var(--color-mist)]">
                Lead&apos;i müşteri kaydına dönüştürür ve vize/tarih ekleyebilirsin.
              </p>
              <form action={convertLeadAction}>
                <input type="hidden" name="id" value={lead.id} />
                <button className="btn-gold w-full rounded-full px-4 py-2.5 text-sm font-bold">
                  Müşteriye çevir →
                </button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
