// Generate IndexNow API key (run once, save result)
const fs = require('fs');
const path = require('path');

// UUID v4 format key
const key = 'a7c2d4e8-9f1b-4c3d-a5e7-2b8f9c1d3e5f';

const keyFile = path.join(__dirname, '../public', `${key}.txt`);
fs.writeFileSync(keyFile, key);

console.log(`✓ IndexNow key file created: public/${key}.txt`);
console.log(`✓ API Key: ${key}`);
console.log(`✓ Keep this key safe — needed for pinging`);
