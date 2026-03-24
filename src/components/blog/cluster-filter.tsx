"use client";

import { useState } from "react";
import type { BlogPostMeta } from "@/lib/blog";
import { BlogCard } from "./blog-card";

const clusters = [
  "All",
  "Interactive Learning Design",
  "AI + EdTech",
  "Building EdTech Products",
];

const POSTS_PER_PAGE = 6;

export function ClusterFilter({ posts }: { posts: BlogPostMeta[] }) {
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filtered = active === "All" ? posts : posts.filter((p) => p.cluster === active);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleClusterChange(cluster: string) {
    setActive(cluster);
    setVisibleCount(POSTS_PER_PAGE);
  }

  return (
    <>
      <div className="flex flex-wrap gap-2.5 mb-10">
        {clusters.map((c) => {
          const count = c === "All" ? posts.length : posts.filter((p) => p.cluster === c).length;
          return (
            <button
              key={c}
              onClick={() => handleClusterChange(c)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium transition-all duration-200 cursor-pointer ${
                active === c
                  ? "bg-accent text-white shadow-sm"
                  : "bg-warm text-charcoal/55 hover:bg-warm-dark hover:text-charcoal"
              }`}
            >
              {c}
              <span className="opacity-50 text-sm">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-charcoal/50 text-center py-16 text-base">
          No posts yet in this cluster. Check back soon.
        </p>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            {visible.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-warm-dark/60 text-base font-medium text-charcoal/60 hover:text-charcoal hover:border-accent/40 hover:shadow-sm transition-all duration-200 cursor-pointer bg-white"
              >
                Show more posts
                <span className="text-sm text-charcoal/40">
                  ({filtered.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
