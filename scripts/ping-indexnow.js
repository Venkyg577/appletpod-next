// Ping IndexNow on deploy — notifies search engines to crawl updated content
const https = require('https');

const INDEXNOW_KEY = 'a7c2d4e8-9f1b-4c3d-a5e7-2b8f9c1d3e5f';
const HOST = 'appletpod.com';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

// Pages to ping on every deploy, plus every blog post published or changed
// in the last 7 days, so a new post is announced on the deploy that ships it.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECENT_DAYS = 7;
const POSTS_DIR = path.join(__dirname, '../content/posts');

function recentPostUrls() {
  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => ({
      slug: f.replace(/\.mdx?$/, ''), // same rule as getAllPosts in src/lib/blog.ts
      data: matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8')).data,
    }))
    .filter(({ data }) => data.status !== 'draft')
    .filter(({ data }) => new Date(data.dateModified || data.datePublished).getTime() >= cutoff)
    .map(({ slug }) => `https://appletpod.com/blog/${slug}`);
}

const urlsToPing = [
  'https://appletpod.com',
  'https://appletpod.com/blog',
  'https://appletpod.com/work',
  'https://appletpod.com/sitemap.xml',
  ...recentPostUrls(),
];
console.log(`IndexNow: pinging ${urlsToPing.length} URLs`);

const payload = JSON.stringify({
  host: HOST,
  key: INDEXNOW_KEY,
  urlList: urlsToPing,
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✓ IndexNow ping successful');
      process.exit(0);
    } else {
      console.log(`✗ IndexNow ping failed: ${res.statusCode}`);
      process.exit(0); // Don't fail build if ping fails
    }
  });
});

req.on('error', (e) => {
  console.log(`✗ IndexNow ping error: ${e.message}`);
  process.exit(0); // Don't fail build
});

req.write(payload);
req.end();
