# Backlog (ordered by expected booked calls per hour of work)
1. /dashboard: internal admin page for free-applet submissions is indexable and reuses the homepage title. Add `robots: { index: false }` in src/app/dashboard/layout.tsx.
2. Organization schema: email says hello@appletpod.com, site says venkatesh@appletpod.com; sameAs links (twitter.com/appletpod, linkedin.com/company/appletpod) unverified. Needs Venky's answer.
3. Applet titles with dashes (fix in appletpod-gallery, not here): chocolate-fractions, coordinates-floor-plan, coordinates-distance-formula, orbital-practice.
4. Applet pages: add LearningResource structured data.
5. Comparison page: "AppletPod vs H5P" (custom build vs self-serve authoring). Needs Venky's view on where H5P is better.
6. GA config has `debug_mode: true` in production (src/app/layout.tsx). Not SEO; flag only.
7. Keyword map: needs Search Console to fill positions; volumes need a keyword tool.
