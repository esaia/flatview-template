<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
    sectionId: { type: String, default: undefined },
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, default: '' },
    imageLeft: { type: Boolean, default: false },
    imageHeightClass: { type: String, default: 'h-[60vh] md:h-[80vh]' },
    label: { type: String, default: '' },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    body: { type: String, required: true },
    linkText: { type: String, default: '' },
    linkHref: { type: String, default: '#' },
})

const sectionRef = ref(null)
let ctx = null

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.utils.toArray('.fade-up').forEach((el) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 65%' },
            })
        })

        const img = sectionRef.value.querySelector('.img-reveal')
        if (img) {
            gsap.fromTo(img,
                { clipPath: 'inset(0 0 100% 0)', scale: 1.25 },
                {
                    clipPath: 'inset(0 0 0% 0)',
                    scale: 1,
                    duration: 1.4,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: img, start: 'top 60%' },
                }
            )
        }
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section :id="sectionId" ref="sectionRef" class="relative z-10 bg-paper px-6 md:px-12 py-28 md:py-40">
        <div class="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <!-- Image column -->
            <div :class="['overflow-hidden', imageLeft ? 'order-1' : 'order-1 md:order-2']">
                <img
                    :src="imageUrl"
                    :alt="imageAlt"
                    :class="['img-reveal w-full object-cover', imageHeightClass]"
                />
            </div>

            <!-- Text column -->
            <div :class="imageLeft ? 'order-2' : 'order-2 md:order-1'">
                <p v-if="label" class="text-[13px] tracking-[0.2em] uppercase text-ink/50 mb-6 fade-up">{{ label }}</p>
                <h3 class="display font-medium text-5xl md:text-7xl mb-4 fade-up">{{ title }}</h3>
                <p v-if="subtitle" class="text-xl md:text-2xl text-ink/80 mb-10 fade-up">{{ subtitle }}</p>
                <p class="max-w-lg text-[15px] md:text-base leading-relaxed text-ink/70 fade-up">{{ body }}</p>
                <a
                    v-if="linkText"
                    :href="linkHref"
                    class="link-underline inline-block mt-10 text-sm tracking-[0.1em] font-semibold uppercase fade-up"
                >{{ linkText }}</a>
            </div>
        </div>
    </section>
</template>
