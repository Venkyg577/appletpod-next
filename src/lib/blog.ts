import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  cluster: string;
  pillar: boolean;
  freshnessType?: string;
  keywords: string[];
  featuredImage?: string;
  status: string;
  content: string;
  readingTime: string;
  wordCount: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  datePublished: string;
  cluster: string;
  pillar: boolean;
  keywords: string[];
  featuredImage?: string;
  readingTime: string;
  wordCount: number;
}

function getClusterLabel(cluster: string): string {
  const map: Record<string, string> = {
    "1-interactive-design": "Interactive Learning Design",
    "2-ai-edtech": "AI + EdTech",
    "2-math-concepts": "Math Concepts & Misconceptions",
    "2-science-concepts": "Science Concepts & Misconceptions",
    "3-building-products": "Building EdTech Products",
    "3-science-skills": "Science Skills & Safety",
    "interactive-content": "Interactive Content Design",
  };
  return map[cluster] || cluster;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      if (data.status === "draft") return null;

      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        author: data.author || "AppletPod",
        datePublished: data.datePublished || data.date || "",
        cluster: getClusterLabel(data.cluster || ""),
        pillar: data.pillar || false,
        keywords: data.keywords || [],
        featuredImage: data.featuredImage || null,
        readingTime: stats.text,
        wordCount: stats.words,
      } as BlogPostMeta;
    })
    .filter(Boolean) as BlogPostMeta[];

  return posts.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    const filePath = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        author: data.author || "AppletPod",
        datePublished: data.datePublished || data.date || "",
        dateModified: data.dateModified || null,
        cluster: getClusterLabel(data.cluster || ""),
        pillar: data.pillar || false,
        freshnessType: data.freshnessType || null,
        keywords: data.keywords || [],
        featuredImage: data.featuredImage || null,
        status: data.status || "published",
        content,
        readingTime: stats.text,
        wordCount: stats.words,
      } as BlogPost;
    }
  }

  return null;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostsByCluster(cluster: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.cluster === cluster);
}

export function getRelatedPosts(currentSlug: string, cluster: string, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.cluster === cluster)
    .slice(0, limit);
}

export { getClusterLabel };
