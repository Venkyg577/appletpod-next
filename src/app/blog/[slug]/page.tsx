import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { RelatedPosts } from "@/components/blog/related-posts";
import { BookCallCTA } from "@/components/blog/book-call-cta";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} — AppletPod Blog`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://appletpod.com/blog/${slug}`,
      siteName: "AppletPod",
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified || undefined,
      authors: [post.author],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    alternates: {
      canonical: `https://appletpod.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, post.cluster, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://appletpod.com",
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    publisher: {
      "@type": "Organization",
      name: "AppletPod",
      url: "https://appletpod.com",
    },
    mainEntityOfPage: `https://appletpod.com/blog/${slug}`,
    wordCount: post.wordCount,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pt-28 pb-20 px-4 md:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-base text-charcoal/40 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All posts
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="text-sm font-medium text-accent/80 bg-accent/8 px-3 py-1 rounded-full">
                {post.cluster}
              </span>
              {post.pillar && (
                <span className="text-sm font-medium text-charcoal/50 bg-warm px-3 py-1 rounded-full">
                  Pillar Guide
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal leading-tight tracking-tight mb-4">
              {post.title}
            </h1>

            <p className="text-charcoal/50 text-lg leading-relaxed mb-6">
              {post.description}
            </p>

            <div className="flex items-center gap-4 text-base text-charcoal/40 pb-7 border-b border-warm-dark">
              <span className="font-medium text-charcoal/60">{post.author}</span>
              <time dateTime={post.datePublished}>
                {new Date(post.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>
          </header>

          {/* Post body */}
          <div className="prose-appletpod">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Keywords */}
          {post.keywords.length > 0 && (
            <div className="mt-12 pt-6 border-t border-warm-dark flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-sm text-charcoal/40 bg-warm px-3 py-1.5 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* Book a Call CTA */}
          <div className="mt-12">
            <BookCallCTA />
          </div>

          {/* Related posts */}
          <RelatedPosts posts={related} />
        </article>
      </main>
      <Footer />
    </>
  );
}
