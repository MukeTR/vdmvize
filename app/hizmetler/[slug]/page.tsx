import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesDetail, getService } from "@/lib/content";
import PageHero from "@/components/PageHero";
import CtaInline from "@/components/CtaInline";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return servicesDetail.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Hizmet bulunamadı" };
  return {
    title: s.title,
    description: s.intro,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const others = servicesDetail.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero
        eyebrow={`Vize Hizmeti · ${s.code}`}
        title={
          <>
            {s.flag} {s.title}
          </>
        }
        subtitle={s.intro}
        route={s.route}
        crumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "Hizmetler", href: "/hizmetler" },
          { label: s.title },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* 2 columns: what we do / who it's for */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-7 shadow-[0_20px_50px_-40px_rgba(20,32,60,0.5)] sm:p-9">
              <p className="eyebrow mb-4">Neler Yapıyoruz</p>
              <ul className="space-y-4">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[color:var(--color-mist)]">
                    <span className="mt-1 text-[color:var(--color-gold-ink)]">✈</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100} className="rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-2)] p-7 sm:p-9">
              <p className="eyebrow mb-4">Kimler İçin</p>
              <div className="flex flex-wrap gap-2.5">
                {s.forWhom.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] px-4 py-2 text-sm font-medium text-[color:var(--color-cloud)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-dashed border-[color:var(--color-gold)]/40 bg-[color:var(--color-gold)]/8 p-5">
                <p className="text-sm leading-relaxed text-[color:var(--color-mist)]">
                  Durumunuz listede yok mu? Sorun değil — {s.title.toLowerCase()} sürecinizi
                  birebir dinleyip size özel bir yol haritası çıkarıyoruz.
                </p>
              </div>
            </Reveal>
          </div>

          {/* FAQ — max two per row */}
          <div className="mt-14">
            <Reveal>
              <p className="eyebrow mb-4">Sık Sorulanlar</p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)] sm:text-3xl">
                {s.title} hakkında merak edilenler
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {s.faq.map((f, i) => (
                <Reveal
                  key={f.q}
                  delay={i * 80}
                  className="rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-6"
                >
                  <h3 className="flex items-start gap-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
                    <span className="text-[color:var(--color-gold-ink)]">•</span>
                    {f.q}
                  </h3>
                  <p className="mt-2 text-[color:var(--color-mist)]">{f.a}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <CtaInline
              title={`${s.title} için hazır mısınız?`}
              text="Ücretsiz ön değerlendirmede profilinizi inceleyip en doğru başvuru stratejisini birlikte belirleyelim."
              wa={`Merhaba, ${s.title} hakkında bilgi almak istiyorum.`}
            />
          </div>

          {/* other services — pills, not a card grid */}
          <div className="mt-12">
            <p className="ticket mb-4 text-[0.66rem] tracking-[0.18em] text-[color:var(--color-mist-2)]">
              DİĞER VİZE HİZMETLERİ
            </p>
            <div className="flex flex-wrap gap-2.5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/hizmetler/${o.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] px-4 py-2 text-sm font-medium text-[color:var(--color-cloud)] transition-colors hover:border-[color:var(--color-gold)]/60 hover:text-[color:var(--color-gold-ink)]"
                >
                  <span>{o.flag}</span> {o.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
