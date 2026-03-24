import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { ArrowRight, Clock } from "lucide-react";

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-warm-dark">
      <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
        Related posts
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative block p-5 md:p-6 rounded-xl border border-warm-dark/60 hover:border-accent/40 hover:shadow-[0_4px_20px_rgba(232,123,53,0.06)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="font-heading text-base font-semibold text-charcoal group-hover:text-accent transition-colors leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">
              {post.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-charcoal/40 pt-3 border-t border-warm-dark/30">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
