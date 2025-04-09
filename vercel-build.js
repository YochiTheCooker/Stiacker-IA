import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('⚙️ Starting Vercel build process...');
console.log('📋 Node version:', process.version);
console.log('📂 Working directory:', process.cwd());

try {
  // Setup Vercel output directories
  console.log('📂 Setting up Vercel output directories...');
  const staticDir = './.vercel/output/static';
  fs.mkdirSync(staticDir, { recursive: true });
  
  // Create config.json for Vercel
  console.log('📝 Creating Vercel config.json...');
  const configJson = {
    "version": 3,
    "routes": [
      { "handle": "filesystem" },
      { "src": "/assets/(.*)", "dest": "/assets/$1" },
      { "src": "/(.*)", "dest": "/index.html" }
    ]
  };
  fs.writeFileSync('./.vercel/output/config.json', JSON.stringify(configJson, null, 2));
  
  // Run Vite build directly into the Vercel output directory
  console.log('🔨 Running Vite build directly to Vercel output directory...');
  // Temporarily modify vite.config.js to output directly to .vercel/output/static
  const viteConfigPath = './vite.config.js';
  const originalViteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  
  // Create a temporary modified config
  const modifiedConfig = originalViteConfig.replace(
    /outDir: ['"]dist['"],?/,
    `outDir: './.vercel/output/static',`
  );
  
  // Save the modified config
  fs.writeFileSync(viteConfigPath, modifiedConfig);
  
  // Run the build
  execSync('vite build', { stdio: 'inherit' });
  
  // Restore original config
  fs.writeFileSync(viteConfigPath, originalViteConfig);
  
  // Verify output directory has content
  if (fs.existsSync(staticDir)) {
    console.log('📁 Vercel output directory exists');
    const files = fs.readdirSync(staticDir);
    console.log('📑 Files in output directory:', files);
    
    if (files.length > 0) {
      console.log('✅ Build completed successfully');
    } else {
      console.error('❌ Output directory is empty!');
      process.exit(1);
    }
  } else {
    console.error('❌ Output directory does not exist!');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 