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
                <h2 class="display font-medium text-6xl md:text-8xl mb-12 reveal-head">
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

            <!-- Right: stats -->
            <div class="grid grid-cols-2 gap-y-20 gap-x-8 md:pl-16 self-center">
                <div class="stat">
                    <div class="display text-7xl md:text-8xl font-medium">
                        <span class="num" data-target="188">0</span>
                    </div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Apartments</div>
                </div>
                <div class="stat">
                    <div class="display text-7xl md:text-8xl font-medium">
                        <span class="num" data-target="7">0</span>
                    </div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Penthouses</div>
                </div>
                <div class="stat">
                    <div class="display text-6xl md:text-7xl font-medium">1Q&nbsp;2026</div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Sales launch</div>
                </div>
                <div class="stat">
                    <div class="display text-6xl md:text-7xl font-medium">3Q&nbsp;2028</div>
                    <div class="mt-3 text-[13px] tracking-[0.2em] uppercase text-ink/60">Project completion</div>
                </div>
            </div>
        </div>
    </section>
</template>
