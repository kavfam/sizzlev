import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	kit: {
		files: { lib: './src/lib/' },
		adapter: adapter()
	},
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	}
};
