<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        // Headline line reveals
        gsap.utils.toArray('.reveal-head').forEach((head) => {
            const lines = head.querySelectorAll('.mask-line > span')
            gsap.fromTo(lines, { yPercent: 115 }, {
                yPercent: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.1,
                scrollTrigger: { trigger: head, start: 'top 80%' },
            })
        })

        // Fade-up elements
        gsap.utils.toArray('.fade-up').forEach((el) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%' },
            })
        })

        // Count-up stats
        sectionRef.value.querySelectorAll('.num').forEach((num) => {
            const target = +num.dataset.target
            const obj = { v: 0 }
            ScrollTrigger.create({
                trigger: num,
                start: 'top 85%',
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
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="px-6 md:px-12 py-28 md:py-40">
        <div class="grid md:grid-cols-2 gap-16 md:gap-24">
            <!-- Left: text -->
            <div>
                <h2 class="display font-medium text-[clamp(2.5rem,5.5vw,6rem)] mb-12 reveal-head">
                    <span v-for="(line, i) in site.home.prestige.headline" :key="i" class="mask-line"><span>{{ line }}</span></span>
                </h2>
                <div class="max-w-xl space-y-6 text-[15px] md:text-base leading-relaxed text-ink/80 fade-up">
                    <p
                        v-for="(para, i) in site.home.prestige.body"
                        :key="i"
                        :class="{ 'text-ink': i === site.home.prestige.body.length - 1 }"
                    >{{ para }}</p>
                </div>
                <a
                    href="#rezidence"
                    class="inline-block mt-12 bg-ink text-paper px-9 py-4 text-sm tracking-[0.1em] font-medium hover:bg-ink/80 transition-colors fade-up"
                >{{ site.home.prestige.cta }}</a>
            </div>

            <!-- Right: stats — list on mobile/tablet, 2×2 grid on lg+ -->
            <div class="self-center fade-up">
                <div class="divide-y divide-ink/15 xl:divide-y-0 xl:grid xl:grid-cols-2 xl:gap-y-20 xl:gap-x-8 xl:pl-16">
                    <div
                        v-for="(stat, i) in site.stats"
                        :key="i"
                        class="stat flex items-center justify-between py-7 gap-6 xl:flex-col-reverse xl:items-start xl:py-0 xl:gap-0"
                    >
                        <span class="text-[11px] tracking-[0.25em] uppercase text-ink/50 shrink-0 xl:mt-3">{{ stat.label }}</span>
                        <span :class="['display font-medium text-[clamp(1.75rem,3.5vw,3.75rem)]', 'count' in stat ? 'xl:text-8xl' : 'xl:text-7xl']">
                            <span v-if="'count' in stat" class="num" :data-target="stat.count">0</span>
                            <template v-else>{{ stat.value }}</template>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
