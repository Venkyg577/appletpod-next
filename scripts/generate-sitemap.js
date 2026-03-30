#!/usr/bin/env node
/**
 * Generate sitemap.xml for AppletPod blog posts
 * Run after new blog posts are published
 */
const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const BASE_URL = 'https://appletpod.com';

function generateSitemap() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
  
  const urls = [
    // Home
    { url: '/', lastmod: new Date().toISOString().split('T')[0], priority: '1.0' },
    // Blog index
    { url: '/blog', lastmod: new Date().toISOString().split('T')[0], priority: '0.9' },
    // Blog posts
    ...files.map(file => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(POSTS_DIR, file);
      const stat = fs.statSync(filePath);
      return {
        url: `/blog/${slug}`,
        lastmod: stat.mtime.toISOString().split('T')[0],
        priority: '0.8'
      };
    }),
    // Static pages
    { url: '/about', lastmod: new Date().toISOString().split('T')[0], priority: '0.7' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
}

generateSitemap();
