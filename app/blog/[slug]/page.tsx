import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: `https://meublerfacile.com/blog/${article.slug}`,
      type: "article",
      publishedTime: article.datePublished,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <article className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
            <Link href="/" className="hover:text-stone-700 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-stone-700 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-stone-600 truncate max-w-xs">{article.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <p className="text-xs text-stone-400 mb-3">
              {new Date(article.datePublished).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 mb-6">
              {article.h1}
            </h1>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-50">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80";
                }}
              />
            </div>
          </header>

          {/* Content */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-stone-100">
            <Link
              href="/blog"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              ← Retour aux articles
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
