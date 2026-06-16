<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let ctx = null

onMounted(async () => {
    // Wait a tick so the pin spacer from AboutParallax is fully committed
    // before calculating positions for these scroll triggers
    await nextTick()

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

        sectionRef.value.querySelectorAll('.num').forEach((num) => {
            const target = +num.dataset.target
            const obj = { v: 0 }
            ScrollTrigger.create({
                trigger: num,
                start: 'top 90%',
                once: true,
                onEnter: () => gsap.to(obj, {
                    v: target,
                    duration: 1.6,
                    ease: 'power2.out',
                    onUpdate: () => { num.textContent = Math.round(obj.v) },
                }),
            })
        })
    }, sectionRef.value)

    // Refresh after all triggers are registered so the pin offset is included
    ScrollTrigger.refresh()
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="relative z-10 bg-paper px-6 md:px-12 py-28 md:py-36">
        <div class="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <h2 class="display font-medium text-5xl md:text-7xl reveal-head">
                <span class="mask-line"><span>By the</span></span>
                <span class="mask-line"><span>numbers</span></span>
            </h2>
            <div class="grid grid-cols-2 gap-y-16 gap-x-8">
                <div class="stat">
                    <div class="display text-7xl md:text-8xl font-medium"><span class="num" data-target="188">0</span></div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Apartments</div>
                </div>
                <div class="stat">
                    <div class="display text-7xl md:text-8xl font-medium"><span class="num" data-target="7">0</span></div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Penthouses</div>
                </div>
                <div class="stat">
                    <div class="display text-6xl md:text-7xl font-medium">1Q&nbsp;2026</div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Sales launch</div>
                </div>
                <div class="stat">
                    <div class="display text-6xl md:text-7xl font-medium">3Q&nbsp;2028</div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Completion</div>
                </div>
            </div>
        </div>
    </section>
</template>
