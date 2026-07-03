import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getArticle } from "@/lib/articles";
import ArticleView from "@/components/ArticleView";

export function generateStaticParams() {
  return blogPosts.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Yazı bulunamadı" };
  return { title: a.title, description: a.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a || a.kind !== "blog") notFound();

  const related = blogPosts.filter((x) => x.slug !== a.slug).slice(0, 2);
  return <ArticleView article={a} related={related} />;
}
