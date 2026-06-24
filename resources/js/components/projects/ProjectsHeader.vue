<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.timeline({ delay: 0.15 })
            .fromTo('.proj-h-word', { yPercent: 120 }, { yPercent: 0, duration: 1.1, ease: 'power4.out' })
            .fromTo('.proj-h-fade', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.2)
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="px-6 md:px-12 pt-40 md:pt-52 pb-16 md:pb-24">
        <p class="text-[13px] tracking-[0.3em] uppercase text-ink/50 mb-8 proj-h-fade">{{ site.projects.header.label }}</p>
        <h1 class="display font-medium text-[18vw] md:text-[13vw] leading-[0.85]">
            <span class="mask-line"><span class="proj-h-word">{{ site.projects.header.title }}</span></span>
        </h1>
        <div class="mt-10 flex flex-wrap gap-3 proj-h-fade">
            <slot name="filters" />
        </div>
    </section>
</template>
