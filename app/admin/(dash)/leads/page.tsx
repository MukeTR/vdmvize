import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle } from "@/components/admin/ui";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";
import { LEAD_STATUSES, fmtDate, sourceLabel, waLink, telLink } from "@/lib/crm";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createSupabaseServer();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  const all = leads ?? [];

  return (
    <>
      <PageTitle
        title="Leadler"
        subtitle={`${all.length} kayıt · durumlar arasında taşımak için etikete dokunun`}
        action={
          <Link
            href="/admin/leads/new"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            + Lead ekle
          </Link>
        }
      />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {LEAD_STATUSES.map((st) => {
          const items = all.filter((l) => l.status === st.key);
          return (
            <div key={st.key} className="w-[280px] shrink-0">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-cloud)]">
                  <span className="h-2 w-2 rounded-full" style={{ background: st.color }} />
                  {st.label}
                </span>
                <span className="ticket text-xs text-[color:var(--color-mist-2)]">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((l) => (
                  <div
                    key={l.id}
                    className="rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-3.5 shadow-[0_14px_36px_-32px_rgba(20,32,60,0.5)]"
                  >
                    <Link href={`/admin/leads/${l.id}`} className="block">
                      <div className="font-semibold text-[color:var(--color-cloud)] hover:text-[color:var(--color-gold-ink)]">
                        {l.name}
                      </div>
                      <div className="ticket mt-0.5 text-[0.7rem] text-[color:var(--color-mist)]">
                        {l.visa_type || "—"}
                      </div>
                      <div className="ticket mt-1 text-[0.62rem] text-[color:var(--color-mist-2)]">
                        {sourceLabel(l.source)} · {fmtDate(l.created_at)}
                      </div>
                    </Link>
                    <div className="mt-3 flex items-center justify-between">
                      <LeadStatusSelect id={l.id} status={l.status} />
                      <div className="flex gap-1.5">
                        <a
                          href={waLink(l.phone, `Merhaba ${l.name}, VDM Vize Danışmanlık'tan ulaşıyorum.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--color-wa)]/12 text-[color:var(--color-wa-ink)]"
                          title="WhatsApp"
                        >
                          <WaIcon className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={telLink(l.phone)}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-[color:var(--color-hairline-2)] text-[color:var(--color-cloud)]"
                          title="Ara"
                        >
                          <PhoneIcon className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[color:var(--color-hairline)] py-6 text-center text-xs text-[color:var(--color-mist-2)]">
                    boş
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
