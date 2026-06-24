import '../css/app.css';
import '../css/irep.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { createApp, h } from 'vue';
import { createInertiaApp, router } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createPinia } from 'pinia';

history.scrollRestoration = 'manual';
router.on('navigate', () => window.scrollTo(0, 0));

const pinia = createPinia();

createInertiaApp({
    title: (title) => {
        const appName = import.meta.env.VITE_APP_NAME ?? 'Flatview';
        return title ? `${title} - ${appName}` : appName;
    },
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
