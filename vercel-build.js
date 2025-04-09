import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('⚙️ Starting Vercel build process...');
console.log('📋 Node version:', process.version);
console.log('📂 Working directory:', process.cwd());

try {
  console.log('🔨 Running build command...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully');
  
  // Verify dist directory exists
  if (fs.existsSync('./dist')) {
    console.log('📁 Dist directory exists');
    const files = fs.readdirSync('./dist');
    console.log('📑 Files in dist:', files);
    
    // Create .vercel/output/static directory if it doesn't exist
    const outputDir = './.vercel/output/static';
    console.log(`📂 Creating ${outputDir} directory...`);
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Copy all files from dist to .vercel/output/static
    console.log('📋 Copying files from dist to .vercel/output/static...');
    execSync(`cp -R ./dist/* ${outputDir}/`, { stdio: 'inherit' });
    
    // Create config.json file for Vercel
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
    
    console.log('✅ Files copied successfully');
  } else {
    console.error('❌ Dist directory does not exist!');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 