import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// Set by `composer dev:mobile` (scripts/dev-mobile.sh) to your Mac's LAN IP so
// Vite + HMR are reachable from other devices. Defaults to localhost otherwise.
const viteHost = process.env.VITE_DEV_HOST || 'localhost';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss(),
    ],
    server: {
        host: viteHost,
        cors: true,
        hmr: {
            host: viteHost,
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
