import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, Card } from "@/components/admin/ui";
import { fmtDate } from "@/lib/crm";
import { inviteTeamMemberAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const supabase = await createSupabaseServer();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--color-cloud)] outline-none focus:border-[color:var(--color-gold)]";
  const label = "ticket mb-1.5 block text-[0.62rem] tracking-[0.16em] text-[color:var(--color-mist-2)]";

  return (
    <>
      <PageTitle title="Ekip" subtitle="Panele erişebilen kullanıcılar" />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="overflow-hidden">
          <ul className="divide-y divide-[color:var(--color-hairline)]">
            {(profiles ?? []).map((p) => (
              <li key={p.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-gold)]/15 font-bold text-[color:var(--color-gold-ink)]">
                    {(p.full_name || "?").slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <div className="font-semibold text-[color:var(--color-cloud)]">{p.full_name || "—"}</div>
                    <div className="ticket text-[0.62rem] text-[color:var(--color-mist-2)]">katılım {fmtDate(p.created_at)}</div>
                  </div>
                </div>
                <span className="rounded-full bg-[color:var(--color-ink-2)] px-2.5 py-1 text-[0.7rem] font-semibold text-[color:var(--color-mist)]">
                  {p.role}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="mb-1 text-sm font-semibold text-[color:var(--color-cloud)]">Yeni üye ekle</h2>
          <p className="mb-4 text-xs text-[color:var(--color-mist)]">
            Kullanıcı hemen giriş yapabilir. Şifreyi kendisiyle paylaşın.
          </p>
          <form action={inviteTeamMemberAction} className="space-y-3">
            <div>
              <label className={label}>AD SOYAD</label>
              <input name="full_name" className={field} placeholder="Ad Soyad" />
            </div>
            <div>
              <label className={label}>E-POSTA *</label>
              <input name="email" type="email" className={field} required placeholder="ekip@vdmturizm.com" />
            </div>
            <div>
              <label className={label}>GEÇİCİ ŞİFRE *</label>
              <input name="password" className={field} required placeholder="En az 6 karakter" minLength={6} />
            </div>
            <button className="btn-gold rounded-full px-5 py-2.5 text-sm font-bold">Üye ekle</button>
          </form>
        </Card>
      </div>
    </>
  );
}
