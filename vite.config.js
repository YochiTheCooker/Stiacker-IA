import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import fs from 'fs'; // Import Node.js fs module

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), "");
  return {
    plugins: [svelte()],
    publicDir: 'public',
    css: {
      postcss: "./postcss.config.js",
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    // Add server configuration for HTTPS
    server: {
      https: {
        // Make sure these file paths are correct relative to your project root
        key: fs.readFileSync('./localhost-key.pem'), 
        cert: fs.readFileSync('./localhost.pem'),    
      },
      // Optional: Uncomment to force a specific port
      // port: 5173, 
      // Optional: Automatically open the app in the browser
      // open: true 
    },
  };
});