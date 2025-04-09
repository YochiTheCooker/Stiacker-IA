import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('⚙️ Starting Vercel build process...');
console.log('📋 Node version:', process.version);
console.log('📂 Working directory:', process.cwd());

try {
  // Verificar si estamos en Vercel
  const isVercel = process.env.VERCEL === '1';
  console.log(`🔍 Running in Vercel environment: ${isVercel}`);
  
  // Crear archivo project.json para ayudar a Vercel a detectar el framework
  console.log('📝 Creating Vercel project configuration...');
  const projectConfig = {
    "projectType": "vite",
    "framework": "vite",
    "buildCommand": "vite build",
    "outputDirectory": "dist",
    "devCommand": "vite dev"
  };
  fs.writeFileSync('./project.json', JSON.stringify(projectConfig, null, 2));
  
  console.log('🔨 Running standard Vite build...');
  execSync('vite build', { stdio: 'inherit' });

  // Verificar que se haya creado el dist y tenga archivos
  if (fs.existsSync('./dist') && fs.existsSync('./dist/index.html')) {
    console.log('✅ Build completed successfully');
    console.log('📁 Dist directory created successfully');
    
    // Para diagnóstico, imprimir el contenido del directorio
    console.log('📑 Files in dist directory:');
    const files = fs.readdirSync('./dist');
    console.log(files);
    
    // Verificar si hay subdirectorio de assets
    if (files.includes('assets')) {
      console.log('📑 Files in assets directory:');
      const assetFiles = fs.readdirSync('./dist/assets');
      console.log(assetFiles);
    }
    
    // Crear archivo _redirects para SPA en la carpeta dist
    console.log('📝 Creating SPA _redirects file...');
    fs.writeFileSync('./dist/_redirects', `/* /index.html 200`);
    
    // Si estamos en Vercel, también preparamos la estructura .vercel
    if (isVercel) {
      const staticDir = './.vercel/output/static';
      fs.mkdirSync(staticDir, { recursive: true });
      
      console.log('📋 Copying files to Vercel output directory...');
      execSync(`cp -R ./dist/* ${staticDir}/`, { stdio: 'inherit' });
      
      console.log('📝 Creating Vercel config.json...');
      const configJson = {
        "version": 3,
        "routes": [
          { "handle": "filesystem" },
          { "src": "/(.*)", "dest": "/index.html" }
        ],
        "cleanUrls": true
      };
      fs.writeFileSync('./.vercel/output/config.json', JSON.stringify(configJson, null, 2));
    }
  } else {
    console.error('❌ Dist directory or index.html not found!');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 