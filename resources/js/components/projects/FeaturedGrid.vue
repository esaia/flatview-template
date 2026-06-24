<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@inertiajs/vue3'
import site from '../../config/siteContent'

const sectionRef = ref(null)
let ctx = null

function addCardHover(card) {
    const img = card.querySelector('img')
    if (!img) return
    card.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.06, duration: 0.7, ease: 'power2.out' }))
    card.addEventListener('mouseleave', () => gsap.to(img, { scale: 1, duration: 0.7, ease: 'power2.out' }))
}

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

        gsap.utils.toArray('.img-reveal').forEach((img) => {
            gsap.fromTo(img, { clipPath: 'inset(0 0 100% 0)' }, {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.3,
                ease: 'power3.out',
                scrollTrigger: { trigger: img, start: 'top 85%' },
            })
        })
    }, sectionRef.value)

    sectionRef.value.querySelectorAll('.feat-card').forEach(addCardHover)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="px-6 md:px-12 py-28 md:py-40">
        <h2 class="display font-medium text-5xl md:text-7xl mb-16 reveal-head">
            <span class="mask-line"><span>{{ site.projects.featured.headline }}</span></span>
        </h2>
        <div class="grid md:grid-cols-2 gap-6 md:gap-10">
            <component
                :is="item.href === '/' ? Link : 'a'"
                v-for="(item, i) in site.projects.featured.items"
                :key="item.name"
                :href="item.href"
                :class="['feat-card block', i === 0 ? 'cursor-pointer' : 'md:mt-24']"
            >
                <div class="overflow-hidden mb-5">
                    <img
                        :src="item.img"
                        :alt="item.name"
                        class="img-reveal w-full h-[55vh] object-cover"
                    />
                </div>
                <div class="flex items-center justify-between">
                    <h3 class="display text-2xl md:text-3xl font-medium">{{ item.name }}</h3>
                    <span class="text-sm text-ink/50">{{ item.meta }}</span>
                </div>
            </component>
        </div>
    </section>
</template>
