# Backlog (ordered by expected booked calls per hour of work)
1. Brand query: a web search for "AppletPod interactive applets" on 2026-11-21 returned no appletpod.com result. Check in Search Console whether the homepage ranks for "appletpod"; if not, request indexing for /, /applets, /flipbooks, /work. Needs Venky (Search Console access).
2. Organization schema: email says hello@appletpod.com, site says venkatesh@appletpod.com; sameAs links (twitter.com/appletpod, linkedin.com/company/appletpod) unverified. Needs Venky's answer.
3. Em dashes in site body copy (rule 3): faq.tsx, about.tsx, pilot.tsx, final-cta.tsx, pricing.tsx, work/page.tsx, work/[slug]/page.tsx, free-applet/page.tsx, privacy, terms, refund-policy, and the submit-free-applet email subject. One PR per area to keep review short.
4. Applet titles and descriptions with dashes (fix in appletpod-gallery, not here): chocolate-fractions, coordinates-floor-plan, coordinates-distance-formula, orbital-practice (titles); animal-cell (description).
5. Applet pages: add LearningResource structured data.
6. Comparison page: "AppletPod vs H5P" (custom build vs self-serve authoring). Needs Venky's view on where H5P is better.
7. llms.txt "Core Expertise" lists 48+ applets, Indonesian and Filipino content, WCAG 2.1 AA. Not verified against any source; Venky to confirm or cut.
8. GA config has `debug_mode: true` in production (src/app/layout.tsx). Not SEO; flag only.
9. Keyword map: needs Search Console to fill positions; volumes need a keyword tool.
