import articlesData from "@/data/articles.json";

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  datePublished: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  content: string;
}

export function getAllArticles(): Article[] {
  return (articlesData as Article[])
    .filter((a) => a.published)
    .sort(
      (a, b) =>
        new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return (articlesData as Article[]).find((a) => a.slug === slug && a.published);
}
