<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        const scrub = {
            trigger: '#genius',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        }

        gsap.fromTo('.gl-down', { yPercent: 90 }, { yPercent: -34, ease: 'none', scrollTrigger: scrub })
        gsap.fromTo('.gl-up', { yPercent: -42 }, { yPercent: 42, ease: 'none', scrollTrigger: scrub })
        gsap.fromTo('.gl-text', { xPercent: 3 }, { xPercent: -15, ease: 'none', scrollTrigger: scrub })
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section id="genius" ref="sectionRef" class="bg-ink text-white py-[16vh]">
        <!-- Horizontal scrolling headline -->
        <div class="gl-marquee w-full overflow-x-clip">
            <div class="gl-text inline-block whitespace-nowrap display font-medium text-[14vw] leading-none">
                Stories&nbsp;&nbsp;·&nbsp;&nbsp;Genius loci&nbsp;&nbsp;·&nbsp;&nbsp;Stories&nbsp;&nbsp;·&nbsp;&nbsp;Genius loci&nbsp;&nbsp;·&nbsp;&nbsp;Stories&nbsp;&nbsp;·&nbsp;&nbsp;Genius loci&nbsp;&nbsp;·&nbsp;&nbsp;
            </div>
        </div>

        <!-- 3-column parallax image grid -->
        <div class="grid grid-cols-3 gap-[3vw] px-[3vw] items-center mt-[22vh] mb-[8vh]">
            <div class="gl-down">
                <img
                    src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    class="w-full h-[58vh] object-cover"
                />
            </div>
            <div class="gl-up">
                <img
                    src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    class="w-full h-[58vh] object-cover"
                />
            </div>
            <div class="gl-down">
                <img
                    src="https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    class="w-full h-[58vh] object-cover"
                />
            </div>
        </div>
    </section>
</template>
