// Ping IndexNow on deploy — notifies search engines to crawl updated content
const https = require('https');

const INDEXNOW_KEY = 'a7c2d4e8-9f1b-4c3d-a5e7-2b8f9c1d3e5f';
const HOST = 'appletpod.com';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

// Pages to ping on every deploy
const urlsToPing = [
  'https://appletpod.com',
  'https://appletpod.com/blog',
  'https://appletpod.com/work',
];

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
