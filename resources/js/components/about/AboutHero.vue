<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        // Hero parallax
        gsap.to('.about-parallax-wrap img', {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
                trigger: '#about-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })

        // Intro animation
        gsap.timeline({ delay: 0.2 })
            .fromTo('.about-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
            .fromTo('.h-word', { yPercent: 120 }, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.12 }, 0.1)
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section id="about-hero" ref="sectionRef" class="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pt-32 pb-12 bg-ink text-white overflow-hidden">
        <div class="about-parallax-wrap absolute inset-0 -top-[10%] h-[120%]">
            <img
                src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=2400&auto=format&fit=crop"
                alt=""
                class="h-full w-full object-cover opacity-70"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
        </div>
        <div class="relative">
            <p class="about-label text-[13px] tracking-[0.3em] uppercase text-white/70 mb-6">About the project</p>
            <h1 class="display font-medium text-[16vw] md:text-[11vw] leading-[0.9]">
                <span class="mask-line"><span class="h-word">A symphony</span></span>
                <span class="mask-line"><span class="h-word">of living</span></span>
            </h1>
        </div>
    </section>
</template>
