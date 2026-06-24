<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../../config/siteContent'

const heroRef   = ref(null)
const counterEl = ref(null)
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
        alt: 'City skyline',
    },
]

function pad(n) { return String(n + 1).padStart(2, '0') }

onMounted(() => {
    const el       = heroRef.value
    const slideEls = el.querySelectorAll('.hero-slide')
    const dotInners = el.querySelectorAll('.dot span')

    gsap.set(slideEls[0], { opacity: 1 })

    function goTo(next) {
        if (next === current) return
        gsap.to(slideEls[current], { opacity: 0, duration: 1.1, ease: 'power2.inOut' })
        gsap.to(slideEls[next],    { opacity: 1, duration: 1.1, ease: 'power2.inOut' })
        current = next
        if (counterEl.value) {
            gsap.to(counterEl.value, {
                opacity: 0, y: -8, duration: 0.25, ease: 'power2.in',
                onComplete: () => {
                    counterEl.value.textContent = pad(current)
                    gsap.fromTo(counterEl.value,
                        { opacity: 0, y: 8 },
                        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
                    )
                }
            })
        }
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
        gsap.timeline({ delay: 0.2 })
            .fromTo('.hero-title', { yPercent: 120 }, { yPercent: 0, duration: 1.2, ease: 'power4.out' })
            .fromTo('.hero-sub',   { yPercent: 120 }, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, '-=0.8')
            .fromTo('.hero-meta',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, '-=0.6')
            .add(runDots, '-=0.5')

        // Parallax — desktop only
        gsap.matchMedia().add('(min-width: 768px)', () => {
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
})

onUnmounted(() => {
    if (ctx) ctx.revert()
    if (dotTween) dotTween.kill()
})
</script>

<template>
    <section id="hero" ref="heroRef" class="relative w-full overflow-hidden bg-ink" style="height: 100svh; min-height: 560px">

        <!-- Slides -->
        <div class="hero-slides absolute inset-0">
            <div
                v-for="(slide, i) in slides"
                :key="i"
                class="hero-slide absolute inset-0 opacity-0"
            >
                <img
                    :src="slide.img"
                    :alt="slide.alt"
                    class="h-full w-full object-cover"
                    style="animation: drift 14s ease-in-out infinite alternate"
                />
                <!-- Stronger gradient on mobile so text is always legible -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 md:from-black/55 md:via-black/10 md:to-black/30"></div>
            </div>
        </div>

        <!-- Content -->
        <div class="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 pt-28 md:pt-32 pb-24 md:pb-10 text-white pointer-events-none">

            <!-- Title -->
            <h1 class="display font-medium leading-[0.93] tracking-tight" style="font-size: clamp(2rem, 10vw, 9.5rem)">
                <span class="mask-line"><span class="hero-title">{{ site.brand.name }}</span></span>
            </h1>

            <!-- Bottom row -->
            <div class="flex items-end justify-between gap-4">

                <!-- Tagline -->
                <h2 class="display font-medium leading-[0.92]" style="font-size: clamp(2rem, 9vw, 5.5rem)">
                    <span class="mask-line"><span class="hero-sub">{{ site.brand.tagline1 }}</span></span>
                    <span class="mask-line"><span class="hero-sub">{{ site.brand.tagline2 }}</span></span>
                </h2>

                <!-- Desktop: partner logos -->
                <div class="hero-meta hidden md:flex items-center gap-6 text-white/90 opacity-0 shrink-0">
                    <template v-for="(partner, i) in site.partners" :key="partner.name">
                        <div v-if="i > 0" class="h-10 w-px bg-white/40"></div>
                        <div class="text-right leading-tight">
                            <div class="text-lg font-bold tracking-tight">{{ partner.name }}</div>
                            <div v-if="partner.sub" class="text-[10px] tracking-[0.25em]">{{ partner.sub }}</div>
                        </div>
                    </template>
                </div>

                <!-- Mobile: slide counter -->
                <div class="hero-meta md:hidden opacity-0 shrink-0 text-right">
                    <div class="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-0.5">Slide</div>
                    <div class="text-2xl font-light tabular-nums leading-none">
                        <span ref="counterEl">01</span
                        ><span class="text-white/30 text-base"> / {{ String(slides.length).padStart(2,'0') }}</span>
                    </div>
                </div>

            </div>
        </div>

        <!-- Dot navigation: bottom-left on mobile, centred on desktop -->
        <div class="absolute bottom-10 left-6 md:left-1/2 md:-translate-x-1/2 z-20 flex items-center gap-3 pointer-events-auto">
            <button
                v-for="(_, i) in slides"
                :key="i"
                class="dot h-[2px] w-8 md:w-10 bg-white/35 overflow-hidden"
            >
                <span class="block h-full w-full bg-white origin-left scale-x-0"></span>
            </button>
        </div>

    </section>
</template>
