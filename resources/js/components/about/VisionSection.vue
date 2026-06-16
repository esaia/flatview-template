<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let st = null

onMounted(() => {
    const el = sectionRef.value.querySelector('.letter-fill')
    if (!el) return

    // Split text into individual character spans
    const text = el.textContent.trim()
    el.textContent = ''
    const chars = [...text].map((ch) => {
        const span = document.createElement('span')
        span.textContent = ch
        span.style.opacity = '0.15'
        el.appendChild(span)
        return span
    })

    // Animate char opacity as you scroll through the pinned section.
    // Pass sectionRef.value as the trigger element directly — string selector '#vision'
    // would be scoped inside the context and fail to find itself.
    const tween = gsap.to(chars, {
        opacity: 1,
        ease: 'none',
        stagger: { each: 0.5, from: 'start' },
        scrollTrigger: {
            trigger: sectionRef.value,
            start: 'center center',
            end: '+=180%',
            scrub: 0.5,
            pin: true,
            onKill: () => { el.style.position = '' },
        },
    })

    st = tween.scrollTrigger
})

onUnmounted(() => {
    if (st) st.kill()
})
</script>

<template>
    <section id="vision" ref="sectionRef" class="px-6 md:px-12 py-28 md:py-40">
        <div class="grid md:grid-cols-12 gap-12">
            <p class="md:col-span-3 text-[13px] tracking-[0.2em] uppercase text-ink/50">01 — The vision</p>
            <div class="md:col-span-9 max-w-3xl">
                <p class="letter-fill display font-medium text-3xl md:text-5xl leading-[1.15]">
                    Vinohradská 8 is a new prestigious address where the historic heart of Prague meets the cultured spirit of Vinohrady — a place composed like music, in harmony of space, light and emotion.
                </p>
            </div>
        </div>
    </section>
</template>
