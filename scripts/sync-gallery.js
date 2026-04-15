#!/usr/bin/env node

/**
 * Sync registry from gallery repo
 * Fetches registry.json from https://github.com/Venkyg577/appletpod-gallery
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GALLERY_URL = 'https://raw.githubusercontent.com/Venkyg577/appletpod-gallery/main/registry.json';
const REGISTRY_FILE = path.join(__dirname, '../content/applets/registry.json');

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log('📡 Fetching registry from gallery repo...');
    const registry = await fetchJSON(GALLERY_URL);

    // Write to local registry.json
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2) + '\n');
    console.log(`✅ Updated registry.json with ${registry.length} applets`);
    console.log(registry.map(a => `  - ${a.title} (${a.slug})`).join('\n'));
  } catch (err) {
    console.error('⚠️  Could not fetch registry, using local copy');
    console.error(err.message);
    // Don't fail the build - use existing registry.json
    process.exit(0);
  }
}

main();
