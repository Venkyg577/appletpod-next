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

export function ClusterFilter({ posts }: { posts: BlogPostMeta[] }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.cluster === active);

  return (
    <>
      <div className="flex flex-wrap gap-2.5 mb-10">
        {clusters.map((c) => {
          const count = c === "All" ? posts.length : posts.filter((p) => p.cluster === c).length;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
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
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
