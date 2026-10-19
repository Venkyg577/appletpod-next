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

> A build studio. AI agents and small tools for founder-led firms, plus interactive learning content (Flipbooks and Applets).

## About

AppletPod (VAMIX Technologies Pvt Ltd, Bengaluru) is run by Venkatesh G (Venky), who ran a content studio of about two hundred people at BYJU'S from 2013 to 2023. Since 2023 he builds with AI: agents in production for clients in real estate, logistics and education, and 100+ interactive educational applets. AppletPod partners with thelaunch.space.

## What We Do

- AI agents for founder-led firms (a working first version in about two weeks)
- Small internal tools and written AI briefs
- Flipbooks: existing textbooks with an interactive layer (https://appletpod.com/flipbooks)
- Applets: custom interactive learning modules (https://appletpod.com/applets)
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
