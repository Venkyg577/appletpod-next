import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function GET() {
  const postsMeta = getAllPosts();

  const sections = postsMeta.map((meta) => {
    const post = getPostBySlug(meta.slug);
    if (!post) return "";

    return `## ${post.title}

URL: https://appletpod.com/blog/${post.slug}
Published: ${post.datePublished}
Cluster: ${post.cluster}
Keywords: ${post.keywords.join(", ")}

${post.content}

---
`;
  });

  const content = `# AppletPod — Full Content

> This file contains the complete text of all published blog posts from AppletPod, intended for AI/LLM consumption.

## About AppletPod

AppletPod helps EdTech companies, publishers, and training providers ship interactive learning products in 3-4 weeks. Founded by Venky Golisetti — 100+ interactive applets shipped, 2+ years building with AI. We specialize in interactive content that actually improves learning outcomes, not decorated PDFs.

Website: https://appletpod.com
Book a call: https://cal.com/venkatesh.g/30min

---

${sections.join("\n")}`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
