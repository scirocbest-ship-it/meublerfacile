import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | meublerfacile.com — Conseils ameublement investisseurs",
  description:
    "Guides pratiques pour meubler votre bien locatif, optimiser votre LMNP et maximiser votre rendement.",
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="section-title">Conseils &amp; Guides</h1>
            <p className="section-sub">
              Tout ce qu&apos;il faut savoir pour meubler votre bien locatif, optimiser votre
              LMNP et maximiser votre rendement.
            </p>
          </div>

          {articles.length === 0 ? (
            <p className="text-stone-400 text-center py-20">
              Les premiers articles arrivent bientôt.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block border border-stone-100 rounded-2xl overflow-hidden hover:border-[#c9ed76] hover:shadow-md transition-all duration-200"
                >
                  <div className="aspect-[16/9] bg-stone-50 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-stone-400 mb-2">
                      {new Date(article.datePublished).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="font-semibold text-stone-900 group-hover:text-stone-700 line-clamp-2 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-stone-500 line-clamp-3">{article.excerpt}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-stone-700 group-hover:text-stone-900">
                      Lire l&apos;article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
