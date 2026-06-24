<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.to('.marquee-track', {
            xPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.marquee-track',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        })
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="py-24 md:py-32 overflow-hidden bg-paper">
        <div class="marquee-track whitespace-nowrap display text-[16vw] font-medium leading-none">
            {{ site.home.marquee }}&nbsp;{{ site.home.marquee }}&nbsp;
        </div>
    </section>
</template>
