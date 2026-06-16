<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        // Scroll-scrubbed opacity reveal for the quote text
        gsap.utils.toArray('.reveal-big').forEach((el) => {
            gsap.fromTo(el, { opacity: 0.15 }, {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'top 45%',
                    scrub: true,
                },
            })
        })
        gsap.utils.toArray('.fade-up').forEach((el) => {
            gsap.fromTo(el, { y: 30, opacity: 0 }, {
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
    <section ref="sectionRef" class="relative z-10 bg-paper px-6 md:px-12 py-32 md:py-48">
        <blockquote class="max-w-5xl mx-auto text-center">
            <p class="display font-medium text-3xl md:text-6xl leading-[1.1] reveal-big">
                "Vinohradská 8 connects the energy of the metropolis with the intimacy of home."
            </p>
            <footer class="mt-10 text-[13px] tracking-[0.2em] uppercase text-ink/50 fade-up">
                Penta Real Estate &amp; PSN
            </footer>
        </blockquote>
    </section>
</template>
