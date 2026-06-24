<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let tween = null

onMounted(() => {
    tween = gsap.to(sectionRef.value.querySelector('.ab-marquee'), {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
    })
})

onUnmounted(() => {
    if (tween) tween.kill()
})
</script>

<template>
    <section ref="sectionRef" class="relative z-10 py-20 md:py-28 overflow-x-clip bg-ink text-white">
        <div class="ab-marquee whitespace-nowrap display text-[13vw] font-medium leading-none">
            {{ site.about.marquee }}&nbsp;&nbsp;{{ site.about.marquee }}&nbsp;&nbsp;
        </div>
    </section>
</template>
