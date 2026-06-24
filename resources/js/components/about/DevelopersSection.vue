<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.utils.toArray('.reveal-head').forEach((head) => {
            const lines = head.querySelectorAll('.mask-line > span')
            gsap.fromTo(lines, { yPercent: 115 }, {
                yPercent: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.1,
                scrollTrigger: { trigger: head, start: 'top 82%' },
            })
        })
        gsap.utils.toArray('.fade-up').forEach((el) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
            })
        })
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="relative z-10 px-6 md:px-12 py-28 md:py-36 bg-ink text-white">
        <h2 class="display font-medium text-5xl md:text-7xl mb-16 reveal-head">
            <span class="mask-line"><span>{{ site.about.developers.headline }}</span></span>
        </h2>
        <div class="grid md:grid-cols-2 gap-12 md:gap-20">
            <div
                v-for="(maker, i) in site.about.developers.items"
                :key="maker.name"
                class="border-t border-white/15 pt-8 fade-up"
            >
                <div class="flex items-baseline justify-between mb-6">
                    <h3 class="text-3xl font-bold tracking-tight">{{ maker.name }}</h3>
                    <span class="text-white/40 font-mono text-sm">{{ String(i + 1).padStart(2, '0') }}</span>
                </div>
                <p class="text-white/70 leading-relaxed max-w-md">
                    {{ maker.description }}
                </p>
            </div>
        </div>
    </section>
</template>
