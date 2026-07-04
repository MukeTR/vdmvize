import type { Metadata } from "next";
import { blogPosts } from "@/lib/articles";
import PageHero from "@/components/PageHero";
import ArticleCard from "@/components/ArticleCard";
import CtaInline from "@/components/CtaInline";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Vize başvurusu, belge hazırlığı ve yurt dışı seyahat üzerine VDM uzmanlarından pratik rehberler.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        eyebrow="VDM Blog"
        title={
          <>
            Vize yolculuğunuz için{" "}
            <span className="text-[color:var(--color-gold-ink)]">rehberler.</span>
          </>
        }
        subtitle="Başvuru süreçleri, belge hazırlığı ve seyahat ipuçları — 20 yılı aşkın tecrübemizden damıttığımız pratik yazılar."
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Blog" }]}
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
