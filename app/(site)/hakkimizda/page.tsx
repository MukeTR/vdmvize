import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { FormButton, WhatsAppButton } from "@/components/ui/Cta";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import StampDrop from "@/components/StampDrop";
import CtaInline from "@/components/CtaInline";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "2004'ten bu yana İstanbul Beyoğlu'ndan Schengen, İngiltere ve Amerika vizelerinde 9.500'den fazla başarılı başvuru. VDM Vize Danışmanlık'ın hikayesi.",
};

const milestones = [
  { year: "2004", title: "Beyoğlu'nda kurulduk", text: "Gümüşsuyu'ndaki ofisimizde ilk dosyamızı açtık. Bir tek prensiple: yolcunun yanında durmak." },
  { year: "2010", title: "Schengen uzmanlaştık", text: "Avrupa konsolosluklarının dilini öğrendik; ret dosyalarını onaya çevirmeye başladık." },
  { year: "2016", title: "Amerika & İngiltere masaları", text: "DS-160, mülakat provası ve UK başvuruları için ayrı uzman ekipler kurduk." },
  { year: "2020", title: "Dijital süreç yönetimi", text: "Belge takibini ve randevu avını uçtan uca dijitalleştirdik — hız, işin merkezine geçti." },
  { year: "Bugün", title: "9.500+ başarılı başvuru", text: "12 kişilik uzman ekiple, her ay yeni yolcuları doğru rotaya çıkarıyoruz." },
];

const values = [
  { k: "Dürüstlük", v: "Olmayacak başvuruya “olur” demeyiz. Riskleri ve gerçekçi ihtimalleri baştan, net konuşuruz." },
  { k: "Hız", v: "Zor açılan randevuları takip eder, en erken tarihi sizin için yakalarız. Beklemek yok." },
  { k: "Şeffaflık", v: "Sürecin her adımını, ne yaptığımızı ve neden yaptığımızı bilerek ilerlersiniz." },
  { k: "Uçtan uca", v: "İlk görüşmeden pasaportunuza vize damgası düşene kadar tek muhatap biziz." },
];

const stamps = [
  { c: "SCHENGEN", d: "ONAYLANDI", color: "var(--color-stamp)" },
  { c: "USA · B1/B2", d: "APPROVED", color: "var(--color-gold-ink)" },
  { c: "UK VISA", d: "GRANTED", color: "var(--color-sky)" },
];

export default function HakkimizdaPage() {
  return (
    <>
      {/* HERO — editorial split */}
      <section className="paper-bg relative overflow-hidden border-b border-[color:var(--color-hairline)] pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#916410 1px, transparent 1px), linear-gradient(90deg, #916410 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(circle at 80% 20%, black, transparent 72%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow mb-5">
              <span className="mr-2 h-px w-8 bg-[color:var(--color-sky)]/60" />
              EST. 2004 · {site.city}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-[2.7rem] font-bold leading-[1.01] tracking-tight text-[color:var(--color-cloud)] sm:text-[4.1rem]">
              Doğru rotayı
              <br />
              <span className="text-[color:var(--color-gold-ink)]">20 yıldır</span> biz çiziyoruz.
            </h1>
            <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-[color:var(--color-mist)]">
              VDM, bir “işlem bürosu” değil. Vizeyi bir bilet değil, bir hikaye olarak
              görüyoruz: kim olduğunuzu, neden gittiğinizi ve geri döneceğinizi
              konsolosluğa en güçlü şekilde anlatan hikayeyi birlikte kuruyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <FormButton label="Ücretsiz ön değerlendirme" />
              <WhatsAppButton />
            </div>
          </div>

          {/* passport page with stamps that thud in */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rounded-[22px] border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] p-8 shadow-[0_50px_90px_-50px_rgba(20,32,60,0.5)]">
              <div className="ticket flex items-center justify-between text-[0.6rem] tracking-[0.2em] text-[color:var(--color-mist-2)]">
                <span>PASSPORT</span>
                <span>TÜRKİYE · TR</span>
              </div>
              <div className="mt-6 flex flex-col items-center gap-5 py-4">
                {stamps.map((s, i) => (
                  <StampDrop key={s.c} delay={i * 220}>
                    <div
                      className="rounded-lg border-2 px-4 py-2 text-center"
                      style={{ borderColor: s.color, color: s.color, transform: "rotate(-11deg)", boxShadow: `inset 0 0 0 2px ${s.color}22` }}
                    >
                      <div className="ticket text-[0.6rem] font-bold tracking-[0.14em]">{s.c}</div>
                      <div className="font-[family-name:var(--font-display)] text-lg font-bold leading-none">{s.d}</div>
                    </div>
                  </StampDrop>
                ))}
              </div>
              <div className="ticket mt-4 border-t border-dashed border-[color:var(--color-hairline-2)] pt-3 text-center text-[0.58rem] tracking-[0.24em] text-[color:var(--color-mist-2)]">
                VDM · IST → DÜNYA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO pull-quote */}
      <section className="border-b border-[color:var(--color-hairline)] bg-[color:var(--color-ink-2)] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="text-5xl text-[color:var(--color-gold)]">“</span>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-[color:var(--color-cloud)] sm:text-[2.1rem] sm:leading-[1.25]">
              Bir vizeyi almak, formu doldurmak değildir. Doğru ülkeye, doğru kategoride,
              doğru anlatımla başvurmaktır. Yirmi yıldır yaptığımız tam olarak bu.
            </p>
            <p className="mt-6 text-sm font-medium text-[color:var(--color-mist-2)]">
              — VDM Vize Danışmanlık Ekibi
            </p>
          </Reveal>
        </div>
      </section>

      {/* NUMBERS — asymmetric, 2 per row */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Rakamlarla VDM</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-4xl">
              Güven, tek seferde
              <br />
              <span className="text-[color:var(--color-gold-ink)]">kazanılmaz.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[color:var(--color-mist)]">
              Bu sayılar reklam değil; yirmi yılda tek tek biriktirdiğimiz gerçek yolcuların
              kaydı.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)]">
            {[
              { n: 20, suffix: "+", label: "Yıl kesintisiz tecrübe" },
              { n: 9500, suffix: "+", group: true, label: "Başarılı başvuru" },
              { n: 12, suffix: "", label: "Kişilik uzman ekip" },
              { n: 40, suffix: "+", label: "Ülkeye vize desteği" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="bg-[color:var(--color-ink-3)] p-7 sm:p-9">
                <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-[color:var(--color-gold-ink)] sm:text-5xl">
                  <Counter n={s.n} suffix={s.suffix} grouped={s.group} />
                </div>
                <div className="mt-1 text-sm text-[color:var(--color-mist)]">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE — route with stops */}
      <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface-2)] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow mb-4 justify-center">Uçuş Güzergâhımız</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-4xl">
              Bir ofisten bir markaya
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-gradient-to-b from-[color:var(--color-gold)] via-[color:var(--color-sky)] to-transparent sm:left-[1.4rem]" />
            <ol className="space-y-6">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 90} as="li">
                  <div className="flex gap-5">
                    <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--color-gold)]/50 bg-[color:var(--color-night)] font-[family-name:var(--font-mono)] text-[0.62rem] font-bold text-[color:var(--color-gold)] sm:h-12 sm:w-12 sm:text-xs">
                      {m.year}
                    </div>
                    <div className="flex-1 rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-5 shadow-[0_18px_44px_-40px_rgba(20,32,60,0.5)] sm:p-6">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
                        {m.title}
                      </h3>
                      <p className="mt-1.5 text-[color:var(--color-mist)]">{m.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* VALUES — 2 per row */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow mb-4">Nasıl Çalışırız</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-4xl">
              Dört kural, hiç değişmedi
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.k} delay={i * 80} className="flex gap-5 rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-7 shadow-[0_20px_50px_-42px_rgba(20,32,60,0.5)]">
                <span className="font-[family-name:var(--font-mono)] text-2xl font-bold text-[color:var(--color-gold-ink)]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-cloud)]">
                    {v.k}
                  </h3>
                  <p className="mt-2 text-[color:var(--color-mist)]">{v.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE + CTA */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            <Reveal className="rounded-[22px] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-2)] p-8 sm:p-10">
              <p className="eyebrow mb-4">Bizi Ziyaret Edin</p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)]">
                Beyoğlu&apos;ndaki ofisimiz
              </h2>
              <p className="mt-3 text-[color:var(--color-mist)]">{site.address}</p>
              <div className="mt-5 space-y-1.5 text-sm text-[color:var(--color-mist)]">
                {site.hours.map((h) => (
                  <p key={h.d} className="flex max-w-xs justify-between gap-6">
                    <span>{h.d}</span>
                    <span className="ticket text-[color:var(--color-mist-2)]">{h.h}</span>
                  </p>
                ))}
              </div>
              <Link
                href={site.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-gold-ink)] hover:underline"
              >
                Haritada aç →
              </Link>
            </Reveal>

            <CtaInline
              title="Rotanızı birlikte çizelim"
              text="20 yıllık tecrübemizi sizin başvurunuza taşıyalım. Ücretsiz ön değerlendirme bir mesaj uzağınızda."
            />
          </div>
        </div>
      </section>
    </>
  );
}
