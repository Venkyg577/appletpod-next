#!/usr/bin/env node

/**
 * Sync applets from gallery repo to appletpod-next
 * Pulls registry.json and applet folders from https://github.com/Venkyg577/appletpod-gallery
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GALLERY_REPO = 'https://raw.githubusercontent.com/Venkyg577/appletpod-gallery/main';
const GALLERY_DIR = path.join(__dirname, '../.gallery-tmp');
const DEMOS_DIR = path.join(__dirname, '../public/demos');
const REGISTRY_FILE = path.join(__dirname, '../content/applets/registry.json');

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(`❌ Failed to fetch ${url}:`, err.message);
    throw err;
  }
}

async function main() {
  try {
    console.log('📡 Syncing applets from gallery repo...');

    // Fetch registry.json from gallery
    console.log('📥 Fetching registry from gallery...');
    const registryUrl = `${GALLERY_REPO}/registry.json`;
    const registry = await fetchJSON(registryUrl);

    // Update local registry.json
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2) + '\n');
    console.log(`✅ Updated registry.json with ${registry.length} applets`);

    // Ensure demos directory exists
    if (!fs.existsSync(DEMOS_DIR)) {
      fs.mkdirSync(DEMOS_DIR, { recursive: true });
    }

    // Get list of applet slugs from registry
    const appletSlugs = registry.map(a => a.slug);
    const localApplets = fs.readdirSync(DEMOS_DIR)
      .filter(f => fs.statSync(path.join(DEMOS_DIR, f)).isDirectory());

    // Remove applets not in registry
    for (const applet of localApplets) {
      if (!appletSlugs.includes(applet)) {
        console.log(`🗑️  Removing old applet: ${applet}`);
        execSync(`rm -rf "${path.join(DEMOS_DIR, applet)}"`);
      }
    }

    // Clone gallery repo to temp directory for copying applets
    console.log('📥 Cloning gallery repo (for applet files)...');
    if (fs.existsSync(GALLERY_DIR)) {
      execSync(`rm -rf "${GALLERY_DIR}"`);
    }
    execSync(`git clone --depth 1 https://github.com/Venkyg577/appletpod-gallery.git "${GALLERY_DIR}"`, {
      stdio: 'pipe'
    });

    // Copy applet folders
    for (const slug of appletSlugs) {
      const srcApplet = path.join(GALLERY_DIR, slug);
      const destApplet = path.join(DEMOS_DIR, slug);

      if (fs.existsSync(srcApplet)) {
        console.log(`📦 Syncing applet: ${slug}`);
        if (fs.existsSync(destApplet)) {
          execSync(`rm -rf "${destApplet}"`);
        }
        execSync(`cp -r "${srcApplet}" "${destApplet}"`);
      } else {
        console.warn(`⚠️  Applet folder not found in gallery: ${slug}`);
      }
    }

    // Cleanup temp directory
    execSync(`rm -rf "${GALLERY_DIR}"`);

    console.log(`\n✅ Gallery sync complete! ${appletSlugs.length} applets ready.`);
  } catch (err) {
    console.error('\n❌ Sync failed:', err.message);
    process.exit(1);
  }
}

main();
