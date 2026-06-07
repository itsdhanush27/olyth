import fs from 'fs';
import path from 'path';

async function fetchPage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return await res.text();
}

async function main() {
  const baseUrl = 'https://peaceful-donut-3e8135.netlify.app/';
  try {
    console.log(`Fetching index.html from ${baseUrl}...`);
    const html = await fetchPage(baseUrl);
    console.log('index.html fetched successfully. Content preview:');
    console.log(html.slice(0, 1000));
    
    // Find script tags
    const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
    let match;
    const scripts = [];
    while ((match = scriptRegex.exec(html)) !== null) {
      scripts.push(match[1]);
    }
    
    console.log('\nFound script files:', scripts);
    
    // Download and search each script
    for (const src of scripts) {
      const scriptUrl = src.startsWith('http') ? src : new URL(src, baseUrl).toString();
      console.log(`Fetching script: ${scriptUrl}...`);
      const code = await fetchPage(scriptUrl);
      
      // Let's write the script content to local files for inspection
      const filename = path.basename(src);
      fs.writeFileSync(filename, code);
      console.log(`Saved ${filename} (${code.length} bytes)`);
      
      // Let's search for some strings in this script
      const keywords = ['tally', 'Waitlist', 'hero-bg', 'dashboard-mockup', 'Play', 'View Demo'];
      console.log(`Searching keywords in ${filename}:`);
      for (const kw of keywords) {
        const index = code.indexOf(kw);
        if (index !== -1) {
          console.log(`  - Found "${kw}" at index ${index}. Preview:`);
          console.log(`    ... ${code.slice(Math.max(0, index - 100), Math.min(code.length, index + 300))} ...`);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching deployed code:', error);
  }
}

main();
