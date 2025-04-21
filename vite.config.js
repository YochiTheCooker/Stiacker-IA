import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";


export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), "");
  return {
    plugins: [svelte()],
    publicDir: 'public',
    css: {
      postcss: "./postcss.config.js"
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true
    },
    server: {
      proxy: {
      '/api': {
        target: 'https://api-inference.huggingface.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }}
  };
});
