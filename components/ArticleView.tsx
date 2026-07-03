import type { Article } from "@/lib/articles";
import PageHero from "@/components/PageHero";
import CtaInline from "@/components/CtaInline";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/ui/Reveal";

function fmtDate(iso: string) {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

export default function ArticleView({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const isBlog = article.kind === "blog";
  const backHref = isBlog ? "/blog" : "/haberler";
  const backLabel = isBlog ? "Blog" : "Haberler";

  return (
    <>
      <PageHero
        eyebrow={`${backLabel} · ${article.tag}`}
        title={article.title}
        crumbs={[
          { label: "Anasayfa", href: "/" },
          { label: backLabel, href: backHref },
          { label: article.tag },
        ]}
      >
        <div className="ticket mt-6 flex flex-wrap items-center gap-3 text-[0.72rem] tracking-[0.1em] text-[color:var(--color-mist-2)]">
          <span>{fmtDate(article.date)}</span>
          <span className="text-[color:var(--color-gold-ink)]">·</span>
          <span>{article.readingMinutes} dk okuma</span>
          <span className="text-[color:var(--color-gold-ink)]">·</span>
          <span>VDM VİZE DANIŞMANLIK</span>
        </div>
      </PageHero>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* 2 columns: article + sticky CTA rail */}
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
            <article
              className="prose-vdm max-w-none"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <CtaInline
                title="Sorunuz mu var?"
                text="Yazıyı okurken aklınıza takılan her şey için uzman ekibimiz bir mesaj uzağınızda."
                wa={`Merhaba, "${article.title}" yazısı hakkında bir sorum var.`}
              />
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-[color:var(--color-hairline)] pt-12">
              <p className="eyebrow mb-6">Bunlar da İlginizi Çekebilir</p>
              <div className="grid gap-6 md:grid-cols-2">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 90}>
                    <ArticleCard a={r} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
