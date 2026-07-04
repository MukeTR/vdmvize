import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { haberler, getArticle } from "@/lib/articles";
import ArticleView from "@/components/ArticleView";

export function generateStaticParams() {
  return haberler.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Haber bulunamadı" };
  return { title: a.title, description: a.excerpt };
}

export default async function HaberPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a || a.kind !== "haber") notFound();

  const related = haberler.filter((x) => x.slug !== a.slug).slice(0, 2);
  return <ArticleView article={a} related={related} />;
}
