<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.to('.parallax-wrap img', {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-wrap',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        })

        gsap.fromTo('.parallax-title', { y: 40, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.parallax-title', start: 'top 85%' },
        })
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="relative h-[85vh] overflow-hidden">
        <div class="parallax-wrap absolute inset-0 -top-[15%] h-[130%]">
            <img
                src="https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2400&auto=format&fit=crop"
                :alt="site.home.parallax.imageAlt"
                class="h-full w-full object-cover"
            />
        </div>
        <div class="absolute inset-0 bg-black/10"></div>
        <h3 class="absolute top-12 left-6 md:left-12 right-12 display font-medium text-white text-4xl md:text-6xl max-w-3xl parallax-title">
            {{ site.home.parallax.title[0] }}<br />{{ site.home.parallax.title[1] }}
        </h3>
    </section>
</template>
