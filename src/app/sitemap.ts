import { readFileSync } from "fs";
import { join } from "path";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

type Applet = { slug: string; status: string };

// Same source and filter as src/app/work/[slug]/page.tsx, so the sitemap
// lists exactly the applet pages that render.
function getVisibleApplets(): Applet[] {
  const registry: Applet[] = JSON.parse(
    readFileSync(join(process.cwd(), "public/content/applets/registry.json"), "utf-8")
  );
  return registry.filter((a) => a.status === "published" || a.status === "live");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `https://appletpod.com/blog/${post.slug}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly" as const,
    priority: post.pillar ? 0.9 : 0.7,
  }));

  const appletEntries = getVisibleApplets().map((applet) => ({
    url: `https://appletpod.com/work/${applet.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://appletpod.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["flipbooks", "applets", "work", "free-applet"].map((path) => ({
      url: `https://appletpod.com/${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: "https://appletpod.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
    ...appletEntries,
  ];
}
