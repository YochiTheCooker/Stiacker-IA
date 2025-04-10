import fs from 'fs';
import { execSync } from 'child_process';

console.log('🔄 Running Vercel setup...');;

try {
  // Verificar que el directorio dist existe
  if (!fs.existsSync('./dist')) {
    console.error('❌ Error: dist directory not found!');
    process.exit(1);
  }

  console.log('📁 dist directory exists');
  
  // Listar archivos en dist para diagnóstico
  const filesDist = fs.readdirSync('./dist');
  console.log('📑 Files in dist directory:', filesDist);  
  // Crear estructura de directorios para Vercel
  const vercelOutputDir = './.vercel/output/static';
  const vercelConfigPath = './.vercel/output/config.json'
  console.log(`📁 Creating ${vercelOutputDir} directory...`);
  fs.mkdirSync(vercelOutputDir, { recursive: true });

  //Copiar todo el contenido de dist a .vercel/output/static
  console.log('📋 Copying files to Vercel output directory...');
  execSync(`cp -r dist/* ${vercelOutputDir}`);

  // Crear archivo config.json para Vercel
  console.log('📝 Creating Vercel config.json...');
  const vercelConfig = {
    version: 3,
    routes: [{ handle: 'filesystem' }, { src: '/.*', dest: '/index.html', status: 200 }],
    output: {
      path: '.vercel/output/static'
    }
  }
  fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
  // Crear archivo _redirects para SPA routing
  console.log('📝 Creating SPA routing file...');
  fs.writeFileSync(`${vercelOutputDir}/_redirects`, '/* /index.html 200');
  
  console.log('✅ Setup completed successfully!');
} catch (error) {
  console.error('❌ Setup failed:', error);
  process.exit(1);
} 