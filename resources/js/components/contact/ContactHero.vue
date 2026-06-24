<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.to('.contact-parallax-wrap img', {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
                trigger: '#contact-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })

        gsap.timeline({ delay: 0.2 })
            .fromTo('.contact-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
            .fromTo('.h-word', { yPercent: 120 }, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.12 }, 0.1)
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section id="contact-hero" ref="sectionRef" class="relative min-h-[80vh] flex flex-col justify-end px-6 md:px-12 pt-32 pb-12 bg-ink text-white overflow-hidden">
        <div class="contact-parallax-wrap absolute inset-0 -top-[10%] h-[120%]">
            <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop"
                alt=""
                class="h-full w-full object-cover opacity-60"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40"></div>
        </div>
        <div class="relative">
            <p class="contact-label text-[13px] tracking-[0.3em] uppercase text-white/70 mb-6">{{ site.contact_page.hero.label }}</p>
            <h1 class="display font-medium text-[16vw] md:text-[11vw] leading-[0.9]">
                <span v-for="(line, i) in site.contact_page.hero.title" :key="i" class="mask-line"><span class="h-word">{{ line }}</span></span>
            </h1>
        </div>
    </section>
</template>
