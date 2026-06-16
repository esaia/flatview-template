<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineProps({
    headline: { type: String, required: true },
    linkText: { type: String, required: true },
    linkHref: { type: String, required: true },
})

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
    <section ref="sectionRef" class="relative z-10 bg-paper px-6 md:px-12 pb-28 md:pb-40">
        <div class="bg-ink text-white px-8 md:px-16 py-20 md:py-28 flex flex-col items-center text-center">
            <h2 class="display font-medium text-5xl md:text-8xl mb-10 reveal-head">
                <span class="mask-line"><span>{{ headline }}</span></span>
            </h2>
            <a
                :href="linkHref"
                class="bg-paper text-ink px-10 py-4 text-sm tracking-[0.1em] font-medium hover:bg-white/80 transition-colors fade-up"
            >{{ linkText }}</a>
        </div>
    </section>
</template>
