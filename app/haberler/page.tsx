import type { Metadata } from "next";
import { haberler } from "@/lib/articles";
import PageHero from "@/components/PageHero";
import ArticleCard from "@/components/ArticleCard";
import CtaInline from "@/components/CtaInline";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Haberler",
  description:
    "Vize süreçleri, randevu ve seyahat gündemine dair güncel bilgiler ve VDM'den duyurular.",
};

export default function HaberlerPage() {
  const [featured, ...rest] = haberler;
  return (
    <>
      <PageHero
        eyebrow="VDM Haberler"
        title={
          <>
            Gündemi{" "}
            <span className="text-[color:var(--color-gold-ink)]">yakından takip ediyoruz.</span>
          </>
        }
        subtitle="Vize süreçleri, randevu koşulları ve seyahat gündemine dair bilmeniz gerekenleri sizin için derliyoruz."
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Haberler" }]}
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {featured && (
            <Reveal className="mb-8">
              <ArticleCard a={featured} featured />
            </Reveal>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <ArticleCard a={a} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <CtaInline />
          </div>
        </div>
      </section>
    </>
  );
}
