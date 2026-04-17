# AppletPod SEO Setup Checklist

## ✅ Code Done
- [x] IndexNow API key file: `public/a7c2d4e8-9f1b-4c3d-a5e7-2b8f9c1d3e5f.txt`
- [x] IndexNow ping endpoint: `src/app/api/indexnow/route.ts`
- [x] Auto-ping on deploy: `npm run build` now pings IndexNow
- [x] Organization schema in layout
- [x] Metadata for free-applet, work pages
- [x] Canonical tags on all pages

## ⚠️ Manual Tasks (Do Next)

### 1. Google Search Console (15 min)
1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Enter: `https://appletpod.com`
4. Choose verification method: "HTML tag"
5. Copy the meta tag, add to `src/app/layout.tsx` `<head>`
6. Verify property
7. Go to "Sitemaps", submit: `https://appletpod.com/sitemap.xml`
8. Wait 1-2 days for initial crawl

### 2. Bing Webmaster Tools (5 min)
1. Go to https://bing.com/webmasters
2. Sign in (Microsoft/Google account)
3. Click "Import from Google Search Console"
4. Select AppletPod property
5. Done — Bing auto-imports sitemap

### 3. Monitor Weekly
- Check Google Search Console for crawl errors
- Monitor Core Web Vitals
- Check search queries + impressions

## IndexNow Info
**API Key:** `a7c2d4e8-9f1b-4c3d-a5e7-2b8f9c1d3e5f`

Every deploy now pings:
- Bing
- Yandex
- Other IndexNow partners

## Test Locally
```bash
node scripts/ping-indexnow.js
```

Should see: `✓ IndexNow ping successful`
