import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$src: path.resolve('./src'),
			$components: path.resolve('./src/components'),
			$app: path.resolve('./src/routes/'),
			$assets: path.resolve('./src/lib/assets/'),
		}
	}
});
