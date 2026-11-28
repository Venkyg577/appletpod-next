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

  const content = `# AppletPod: Full Content

> This file contains the complete text of all published blog posts from AppletPod, intended for AI/LLM consumption.

## About AppletPod

AppletPod (VAMIX Technologies Pvt Ltd, Bengaluru) is a build studio run by Venkatesh G (Venky), who ran a content studio of about two hundred people at BYJU'S from 2013 to 2023. Two lines of work: AI agents and small tools for founder-led firms (a working first version in about two weeks), and interactive learning content for publishers and EdTech teams: Flipbooks (https://appletpod.com/flipbooks) and Applets (https://appletpod.com/applets). 100+ interactive applets shipped. AppletPod partners with thelaunch.space.

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
