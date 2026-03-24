import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { Clock } from "lucide-react";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative border border-warm-dark/60 rounded-xl p-6 md:p-7 hover:border-accent/40 hover:shadow-[0_4px_24px_rgba(232,123,53,0.08)] hover:-translate-y-0.5 transition-all duration-300 bg-white overflow-hidden h-full flex flex-col">
          {/* Gradient top accent on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-sm font-medium text-accent/80 bg-accent/8 px-3 py-1 rounded-full">
              {post.cluster}
            </span>
            {post.pillar && (
              <span className="text-sm font-medium text-charcoal/50 bg-warm px-3 py-1 rounded-full">
                Pillar
              </span>
            )}
          </div>

          <h2 className="font-heading text-lg md:text-xl font-semibold text-charcoal group-hover:text-accent transition-colors duration-200 leading-snug mb-3 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-charcoal/55 text-base leading-relaxed mb-5 line-clamp-2 flex-grow">
            {post.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-warm-dark/40 mt-auto">
            <time
              dateTime={post.datePublished}
              className="text-sm text-charcoal/40"
            >
              {new Date(post.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <span className="flex items-center gap-1.5 text-sm text-charcoal/40">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
