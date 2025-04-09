import { execSync } from 'child_process';
import fs from 'fs';

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
  } else {
    console.error('❌ Dist directory does not exist!');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 