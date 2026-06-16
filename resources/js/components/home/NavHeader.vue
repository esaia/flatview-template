<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Link } from "@inertiajs/vue3";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const props = defineProps({
    startDark: { type: Boolean, default: false },
    showScrim: { type: Boolean, default: true },
    triggerSelector: { type: String, default: "#hero" },
    scrollThreshold: { type: Number, default: null },
    topLinks: {
        type: Array,
        default: () => [
            { label: "Residences", href: "/" },
            { label: "Office & Retail", href: "/#rezidence" },
        ],
    },
});

const scrolledPast = ref(false);
const overlayRef = ref(null);
let menuTl = null;
let ctx = null;
let scrollHandler = null;

const navTextClass = computed(() =>
    props.startDark || scrolledPast.value ? "text-ink" : "text-white",
);
const scrimOpacity = computed(() =>
    props.showScrim && !scrolledPast.value ? 1 : 0,
);

onMounted(() => {
    gsap.set(overlayRef.value, { autoAlpha: 0 });

    menuTl = gsap.timeline({
        paused: true,
        onStart: () => gsap.set(overlayRef.value, { autoAlpha: 1 }),
        onReverseComplete: () => gsap.set(overlayRef.value, { autoAlpha: 0 }),
    });

    menuTl
        .to(".menu-panel", { scaleY: 1, duration: 0.6, ease: "power4.inOut" })
        .from(
            overlayRef.value.querySelectorAll(".menu-item"),
            {
                yPercent: 120,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
            },
            "-=0.2",
        )
        .from(
            [
                overlayRef.value.querySelector(".menu-close-link"),
                overlayRef.value.querySelector("#menuClose"),
                overlayRef.value.querySelector(".menu-foot"),
            ],
            {
                opacity: 0,
                y: 16,
                duration: 0.5,
                stagger: 0.06,
                ease: "power2.out",
            },
            "-=0.5",
        );

    overlayRef.value.querySelectorAll(".menu-item").forEach((item) => {
        const label = item.querySelector(".menu-text");
        if (!label) return;
        item.addEventListener("mouseenter", () =>
            gsap.to(label, { x: 14, duration: 0.4, ease: "power2.out" }),
        );
        item.addEventListener("mouseleave", () =>
            gsap.to(label, { x: 0, duration: 0.4, ease: "power2.out" }),
        );
    });

    if (props.scrollThreshold !== null) {
        scrollHandler = () => {
            scrolledPast.value = window.scrollY > props.scrollThreshold;
        };
        window.addEventListener("scroll", scrollHandler, { passive: true });
    } else {
        ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: props.triggerSelector,
                start: "bottom top+=80",
                onEnter: () => {
                    scrolledPast.value = true;
                },
                onLeaveBack: () => {
                    scrolledPast.value = false;
                },
            });
        });
    }

    document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
    if (ctx) ctx.revert();
    if (menuTl) menuTl.kill();
    if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    document.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
});

function onKeydown(e) {
    if (e.key === "Escape") closeMenu();
}

function openMenu() {
    document.body.style.overflow = "hidden";
    menuTl.timeScale(1).play();
}

function closeMenu() {
    document.body.style.overflow = "";
    menuTl.timeScale(1.6).reverse();
}
</script>

<template>
    <!-- Fixed nav bar -->
    <header
        id="nav"
        class="fixed top-0 inset-x-0 z-50 transition-colors duration-500"
    >
        <div
            class="nav-scrim pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-transparent transition-opacity duration-500"
            :style="{ opacity: scrimOpacity }"
        ></div>
        <div
            class="nav-bar pointer-events-none absolute inset-0 bg-paper/80 backdrop-blur-md border-b border-ink/10 transition-opacity duration-500"
            :style="{ opacity: scrolledPast ? 1 : 0 }"
        ></div>

        <div
            :class="[
                'relative px-6 md:px-12 py-5 md:py-6 flex items-center justify-between transition-colors duration-500',
                navTextClass,
            ]"
        >
            <nav class="flex items-center gap-7">
                <template v-for="(link, i) in topLinks" :key="link.href">
                    <span
                        v-if="i > 0"
                        class="hidden md:block h-3.5 w-px bg-current/30"
                    ></span>
                    <a
                        :href="link.href"
                        :class="[
                            'link-underline uppercase text-[13px] font-semibold tracking-[0.18em]',
                            i > 0
                                ? 'opacity-75 hover:opacity-100 transition'
                                : '',
                        ]"
                        >{{ link.label }}</a
                    >
                </template>
            </nav>

            <Link
                href="/"
                class="hidden md:block display font-medium text-xl tracking-tight absolute left-1/2 -translate-x-1/2 select-none"
                >V8</Link
            >

            <button
                @click="openMenu"
                class="group flex items-center cursor-pointer gap-3 border border-current/30 rounded-full pl-5 pr-4 py-2 hover:bg-current/10 transition-colors"
            >
                <span
                    class="text-[12px] font-semibold tracking-[0.22em] uppercase"
                    >Menu</span
                >
                <span class="flex flex-col gap-[5px]">
                    <span
                        class="block h-px w-5 bg-current transition-all group-hover:w-6"
                    ></span>
                    <span
                        class="block h-px w-5 bg-current transition-all group-hover:w-3.5"
                    ></span>
                </span>
            </button>
        </div>
    </header>

    <!-- Fullscreen menu overlay -->
    <div ref="overlayRef" class="fixed inset-0 z-[70] text-white">
        <div
            class="menu-panel absolute inset-0 bg-ink scale-y-0 origin-top"
        ></div>

        <div class="relative h-full flex flex-col px-6 md:px-12 py-6">
            <div class="flex items-center justify-between shrink-0">
                <Link
                    href="/"
                    class="menu-close-link display font-medium text-xl"
                    @click="closeMenu"
                    >V8</Link
                >
                <button
                    id="menuClose"
                    @click="closeMenu"
                    class="group flex items-center cursor-pointer gap-3 border border-white/30 rounded-full pl-5 pr-4 py-2 hover:bg-white/10 transition-colors"
                >
                    <span
                        class="text-[12px] font-semibold tracking-[0.22em] uppercase"
                        >Close</span
                    >
                    <span class="relative block h-3 w-3">
                        <span
                            class="absolute top-1/2 left-0 h-px w-3 bg-white rotate-45"
                        ></span>
                        <span
                            class="absolute top-1/2 left-0 h-px w-3 bg-white -rotate-45"
                        ></span>
                    </span>
                </button>
            </div>

            <nav
                class="flex-1 flex flex-col justify-center gap-2 md:gap-3 -mt-8"
            >
                <Link
                    href="/"
                    class="menu-item flex items-baseline gap-5 w-fit"
                    @click="closeMenu"
                >
                    <span class="text-xs text-white/40 font-mono">01</span>
                    <span class="menu-text display font-medium text-6xl md:text-8xl leading-[1.05]">Home</span>
                </Link>
                <a
                    href="/#rezidence"
                    class="menu-item flex items-baseline gap-5 w-fit"
                    @click="closeMenu"
                >
                    <span class="text-xs text-white/40 font-mono">02</span>
                    <span class="menu-text display font-medium text-6xl md:text-8xl leading-[1.05]">Residences</span>
                </a>
                <Link
                    href="/projects"
                    class="menu-item flex items-baseline gap-5 w-fit"
                    @click="closeMenu"
                >
                    <span class="text-xs text-white/40 font-mono">03</span>
                    <span class="menu-text display font-medium text-6xl md:text-8xl leading-[1.05]">Projects</span>
                </Link>
                <Link
                    href="/about"
                    class="menu-item flex items-baseline gap-5 w-fit"
                    @click="closeMenu"
                >
                    <span class="text-xs text-white/40 font-mono">04</span>
                    <span class="menu-text display font-medium text-6xl md:text-8xl leading-[1.05]">About</span>
                </Link>
            </nav>

            <div
                class="menu-foot shrink-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-sm text-white/60"
            >
                <div class="flex gap-12">
                    <div>
                        <p
                            class="text-white/40 uppercase tracking-[0.2em] text-[11px] mb-2"
                        >
                            Sales
                        </p>
                        <a
                            href="mailto:prodej@pentarealestate.com"
                            class="link-underline"
                            >prodej@pentarealestate.com</a
                        >
                    </div>
                    <div>
                        <p
                            class="text-white/40 uppercase tracking-[0.2em] text-[11px] mb-2"
                        >
                            Follow
                        </p>
                        <div class="flex gap-4">
                            <a href="#" class="hover:text-white transition"
                                >FB</a
                            >
                            <a href="#" class="hover:text-white transition"
                                >IG</a
                            >
                        </div>
                    </div>
                </div>
                <p class="display text-2xl md:text-3xl text-white/80">
                    Vinohradská 8
                </p>
            </div>
        </div>
    </div>
</template>
