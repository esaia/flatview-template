<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let pinST = null
let scaleTween = null

onMounted(() => {
    // Pin the image at the top of the viewport.
    // pinSpacing: false means no extra scroll distance is inserted, so the
    // next section starts from its natural position and slides UP over the image.
    pinST = ScrollTrigger.create({
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=100%',       // stay pinned for one full viewport-height of scrolling
        pin: true,
        pinSpacing: false,
    })

    // Subtle scale on the image as it gets covered — adds depth
    scaleTween = gsap.to(sectionRef.value.querySelector('img'), {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top top',
            end: '+=100%',
            scrub: true,
        },
    })
})

onUnmounted(() => {
    if (pinST) pinST.kill()
    if (scaleTween) scaleTween.kill()
})
</script>

<template>
    <section ref="sectionRef" class="relative h-screen overflow-hidden">
        <img
            src="https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2400&auto=format&fit=crop"
            alt="Prague"
            class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-black/20"></div>
    </section>
</template>
