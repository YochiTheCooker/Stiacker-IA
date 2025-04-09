import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔄 Running Vercel setup...');

// Comprobar si estamos en Vercel
const isVercel = process.env.VERCEL === '1';
console.log(`🔍 Running in Vercel environment: ${isVercel}`);

try {
  // Verificar que el directorio dist existe
  if (!fs.existsSync('./dist')) {
    console.error('❌ Error: dist directory not found!');
    process.exit(1);
  }

  console.log('📁 dist directory exists');
  
  // Listar archivos en dist para diagnóstico
  const files = fs.readdirSync('./dist');
  console.log('📑 Files in dist directory:', files);

  if (isVercel) {
    // Crear estructura de directorios para Vercel
    const outputDir = './.vercel/output/static';
    console.log(`📁 Creating ${outputDir} directory...`);
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Copiar archivos de dist a .vercel/output/static
    console.log('📋 Copying files to Vercel output directory...');
    
    // Usar métodos de fs para copiar archivos
    function copyDir(src, dest) {
      // Crear directorio de destino si no existe
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      // Leer contenido del directorio
      const entries = fs.readdirSync(src, { withFileTypes: true });
      
      // Iterar sobre archivos y directorios
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          // Si es un directorio, llamar recursivamente
          copyDir(srcPath, destPath);
        } else {
          // Si es un archivo, copiarlo
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
    
    // Copiar todo el contenido de dist a .vercel/output/static
    copyDir('./dist', outputDir);
    
    // Crear archivo config.json para Vercel
    console.log('📝 Creating Vercel config.json...');
    const configJson = {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index.html" }
      ],
      cleanUrls: true
    };
    
    fs.writeFileSync('./.vercel/output/config.json', JSON.stringify(configJson, null, 2));
    
    // Crear archivo _redirects para SPA routing
    console.log('📝 Creating SPA routing file...');
    fs.writeFileSync(`${outputDir}/_redirects`, '/* /index.html 200');
    
    // Verificar resultado
    console.log('📑 Files in Vercel output directory:');
    console.log(fs.readdirSync(outputDir));
  }
  
  console.log('✅ Setup completed successfully!');
} catch (error) {
  console.error('❌ Setup failed:', error);
  process.exit(1);
} 