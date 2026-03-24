import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();

  const postList = posts
    .map(
      (post) =>
        `- [${post.title}](https://appletpod.com/blog/${post.slug}): ${post.description}`
    )
    .join("\n");

  const content = `# AppletPod

> Interactive learning content, built fast. We design and ship interactive applets for K-12 math, science, and language learning using AI-assisted development.

## About

AppletPod helps EdTech companies, publishers, and training providers ship interactive learning products in 3-4 weeks instead of 3-4 months. Founded by Venky Golisetti, who has shipped 100+ interactive educational applets across multiple subjects and languages.

## What We Do

- Interactive educational applets (K-8 math, science, language)
- AI-powered training and education tools
- Course content and product videos
- Full-stack app development for EdTech

## Core Expertise

- Custom React framework (~5KB, zero dependencies, 48+ production applets)
- HTML5 Canvas interactive simulations
- Multi-language educational content (English, Indonesian, Filipino)
- WCAG 2.1 AA accessible learning tools
- AI-assisted rapid development (Claude, Codex, Cursor)

## Blog

Practitioner insights on interactive learning design, AI in education, and building EdTech products.

${postList}

## Contact

- Website: https://appletpod.com
- Book a call: https://cal.com/venkatesh.g/30min
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
