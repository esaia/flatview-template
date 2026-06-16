<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const heroRef = ref(null)
let ctx = null
let dotTween = null
let current = 0
const DURATION = 5

const slides = [
    {
        img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop',
        alt: 'Luxury residence exterior',
    },
    {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop',
        alt: 'Modern architecture',
    },
    {
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop',
        alt: 'Prague skyline',
    },
]

onMounted(() => {
    const el = heroRef.value
    const slideEls = el.querySelectorAll('.hero-slide')
    const dotInners = el.querySelectorAll('.dot span')

    gsap.set(slideEls[0], { opacity: 1 })

    function goTo(next) {
        if (next === current) return
        gsap.to(slideEls[current], { opacity: 0, duration: 1.1, ease: 'power2.inOut' })
        gsap.to(slideEls[next], { opacity: 1, duration: 1.1, ease: 'power2.inOut' })
        current = next
        runDots()
    }

    function runDots() {
        gsap.set(dotInners, { scaleX: 0 })
        if (dotTween) dotTween.kill()
        dotTween = gsap.fromTo(
            dotInners[current],
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: DURATION,
                ease: 'none',
                onComplete: () => goTo((current + 1) % slideEls.length),
            }
        )
    }

    el.querySelectorAll('.dot').forEach((d, i) => {
        d.addEventListener('click', () => goTo(i))
    })

    ctx = gsap.context(() => {
        // Hero intro
        gsap.timeline({ delay: 0.2 })
            .fromTo('.hero-title', { yPercent: 120 }, { yPercent: 0, duration: 1.2, ease: 'power4.out' })
            .fromTo('.hero-sub', { yPercent: 120 }, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, '-=0.8')
            .fromTo('.hero-logos', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')
            .add(runDots, '-=0.5')

        // Parallax on scroll
        gsap.to('.hero-slides', {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
    })
})

onUnmounted(() => {
    if (ctx) ctx.revert()
    if (dotTween) dotTween.kill()
})
</script>

<template>
    <section id="hero" ref="heroRef" class="relative h-screen w-full overflow-hidden bg-ink">
        <!-- Slides -->
        <div class="hero-slides absolute inset-0">
            <div
                v-for="(slide, i) in slides"
                :key="i"
                class="hero-slide absolute inset-0 opacity-0"
                :data-slide="i"
            >
                <img
                    :src="slide.img"
                    :alt="slide.alt"
                    class="h-full w-full object-cover"
                    style="animation: drift 14s ease-in-out infinite alternate"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30"></div>
            </div>
        </div>

        <!-- Hero content -->
        <div class="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 pt-28 md:pt-32 pb-10 text-white pointer-events-none">
            <h1 class="display font-medium text-[15vw] md:text-[8.5vw] leading-none">
                <span class="mask-line"><span class="hero-title">VINOHRADSKÁ 8</span></span>
            </h1>

            <div class="flex items-end justify-between">
                <h2 class="display font-medium text-[10vw] md:text-[4.6vw] leading-[0.92]">
                    <span class="mask-line"><span class="hero-sub">Symphony</span></span>
                    <span class="mask-line"><span class="hero-sub">of Life</span></span>
                </h2>

                <div class="hidden md:flex items-center gap-6 text-white/90 hero-logos opacity-0">
                    <div class="text-right leading-tight">
                        <div class="text-lg font-bold tracking-tight">PENTA</div>
                        <div class="text-[10px] tracking-[0.25em]">REAL ESTATE</div>
                    </div>
                    <div class="h-10 w-px bg-white/40"></div>
                    <div class="text-2xl font-bold tracking-tight flex items-center gap-1">
                        PSN <span class="text-base">△</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dot navigation -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            <button
                v-for="(_, i) in slides"
                :key="i"
                class="dot h-[3px] w-10 bg-white/40 overflow-hidden"
                :data-dot="i"
            >
                <span class="block h-full w-full bg-white origin-left scale-x-0"></span>
            </button>
        </div>

        <div class="absolute bottom-10 right-6 md:right-12 z-20 text-white/80 text-[11px] tracking-[0.3em] uppercase">
            Scroll ↓
        </div>
    </section>
</template>
