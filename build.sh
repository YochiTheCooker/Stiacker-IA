#!/bin/bash
echo "🚀 Starting build process..."

# Build the application
echo "📦 Building the application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Build failed: dist directory not found!"
  exit 1
fi

# If we're in Vercel environment
if [ "$VERCEL" = "1" ]; then
  echo "🔄 Setting up for Vercel deployment..."
  
  # If .vercel/output directory doesn't exist, create it
  if [ ! -d ".vercel/output" ]; then
    echo "📁 Creating .vercel/output directories..."
    mkdir -p .vercel/output/static
  fi
  
  # Copy dist contents to .vercel/output/static
  echo "📋 Copying build files to Vercel output directory..."
  cp -r dist/* .vercel/output/static/
  
  # Create a simple config.json for Vercel
  echo "📝 Creating Vercel configuration..."
  echo '{
  "version": 3,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}' > .vercel/output/config.json

  # Create _redirects file
  echo "📝 Creating SPA routing file..."
  echo "/* /index.html 200" > .vercel/output/static/_redirects
fi

echo "✅ Build process completed successfully!" 