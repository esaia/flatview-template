<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
                    <span class="mask-line"><span>A new</span></span>
                    <span class="mask-line"><span>prestigious</span></span>
                    <span class="mask-line"><span>address</span></span>
                </h2>
                <div class="max-w-xl space-y-6 text-[15px] md:text-base leading-relaxed text-ink/80 fade-up">
                    <p>
                        Vinohradská 8 represents a new prestigious address at the meeting point of Prague's
                        historic centre and the famous Vinohrady district. In a place where the artistic spirit
                        of the quarter naturally blends with a modern vision of luxury living, a unique project
                        is taking shape under the renowned studio Jakub Cigler Architekti. The residential
                        collection comprises 188 elegant apartments of every layout and 7 unique penthouses,
                        which open up panoramic views over Prague's towers and rooftops.
                    </p>
                    <p>
                        Behind the project stand Penta Real Estate and PSN — a union of experience and ambition
                        that gives rise to one of the most exceptional addresses in Prague.
                    </p>
                    <p class="text-ink">Vinohradská 8 — A Symphony of Life.</p>
                </div>
                <a
                    href="#rezidence"
                    class="inline-block mt-12 bg-ink text-paper px-9 py-4 text-sm tracking-[0.1em] font-medium hover:bg-ink/80 transition-colors fade-up"
                >Choose your apartment</a>
            </div>

            <!-- Right: stats — list on mobile/tablet, 2×2 grid on lg+ -->
            <div class="self-center fade-up">
                <div class="divide-y divide-ink/15 xl:divide-y-0 xl:grid xl:grid-cols-2 xl:gap-y-20 xl:gap-x-8 xl:pl-16">
                    <div class="stat flex items-center justify-between py-7 gap-6 xl:flex-col-reverse xl:items-start xl:py-0 xl:gap-0">
                        <span class="text-[11px] tracking-[0.25em] uppercase text-ink/50 shrink-0 xl:mt-3">Apartments</span>
                        <span class="display font-medium text-[clamp(1.75rem,3.5vw,3.75rem)] xl:text-8xl"><span class="num" data-target="188">0</span></span>
                    </div>
                    <div class="stat flex items-center justify-between py-7 gap-6 xl:flex-col-reverse xl:items-start xl:py-0 xl:gap-0">
                        <span class="text-[11px] tracking-[0.25em] uppercase text-ink/50 shrink-0 xl:mt-3">Penthouses</span>
                        <span class="display font-medium text-[clamp(1.75rem,3.5vw,3.75rem)] xl:text-8xl"><span class="num" data-target="7">0</span></span>
                    </div>
                    <div class="stat flex items-center justify-between py-7 gap-6 xl:flex-col-reverse xl:items-start xl:py-0 xl:gap-0">
                        <span class="text-[11px] tracking-[0.25em] uppercase text-ink/50 shrink-0 xl:mt-3">Sales launch</span>
                        <span class="display font-medium text-[clamp(1.75rem,3.5vw,3.75rem)] xl:text-7xl">1Q&nbsp;2026</span>
                    </div>
                    <div class="stat flex items-center justify-between py-7 gap-6 xl:flex-col-reverse xl:items-start xl:py-0 xl:gap-0">
                        <span class="text-[11px] tracking-[0.25em] uppercase text-ink/50 shrink-0 xl:mt-3">Project completion</span>
                        <span class="display font-medium text-[clamp(1.75rem,3.5vw,3.75rem)] xl:text-7xl">3Q&nbsp;2028</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
