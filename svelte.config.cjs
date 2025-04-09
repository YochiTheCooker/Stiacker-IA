const { vitePreprocess } = require('@sveltejs/vite-plugin-svelte');
const adapter = require('@sveltejs/adapter-vercel');

module.exports = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      runtime: 'nodejs18.x'
    })
  }
}; 