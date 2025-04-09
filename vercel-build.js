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
  
  // Create config.json for Vercel - usando formato más simple
  console.log('📝 Creating Vercel config.json...');
  const configJson = {
    "version": 3,
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/$1"
      }
    ],
    "cleanUrls": true
  };
  fs.writeFileSync('./.vercel/output/config.json', JSON.stringify(configJson, null, 2));
  
  // Realizar build normal primero para verificar
  console.log('🔨 Running standard Vite build first...');
  execSync('vite build', { stdio: 'inherit' });

  // Verificar que se haya creado el dist y tenga archivos
  if (fs.existsSync('./dist') && fs.existsSync('./dist/index.html')) {
    console.log('📁 Dist directory built successfully');
    
    // Copiar todos los archivos de dist a .vercel/output/static
    console.log('📋 Copying files from dist to .vercel/output/static...');
    execSync(`cp -R ./dist/* ${staticDir}/`, { stdio: 'inherit' });
    
    // Crear archivo _redirects para SPA en la carpeta de salida
    console.log('📝 Creating SPA _redirects file...');
    fs.writeFileSync(`${staticDir}/_redirects`, `/* /index.html 200`);
    
    // Verificar que index.html se haya copiado correctamente
    if (fs.existsSync(`${staticDir}/index.html`)) {
      console.log('✅ index.html copied successfully');
      
      // Imprimir el contenido del directorio para diagnóstico
      console.log('📑 Files in output directory:');
      const files = fs.readdirSync(staticDir);
      console.log(files);
      
      // Verificar subdirectorios
      if (files.includes('assets')) {
        const assetFiles = fs.readdirSync(`${staticDir}/assets`);
        console.log('📑 Files in assets directory:');
        console.log(assetFiles);
      }
    } else {
      console.error('❌ index.html not found in output directory!');
      process.exit(1);
    }
  } else {
    console.error('❌ Dist directory or index.html not found!');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 