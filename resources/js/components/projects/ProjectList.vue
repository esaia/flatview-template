<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@inertiajs/vue3'

const listRef = ref(null)
const previewRef = ref(null)
const activeFilter = ref('all')
let ctx = null

const projects = [
    { id: 1, num: '01', name: 'Vinohradská 8', location: 'Prague 2 — Vinohrady', year: '2028', cat: 'residential', href: '/', img: 0 },
    { id: 2, num: '02', name: 'Symphony Residences', location: 'Prague 1 — New Town', year: '2027', cat: 'residential', href: '#', img: 1 },
    { id: 3, num: '03', name: 'Atrium Vinohrady', location: 'Prague 3 — Žižkov', year: '2026', cat: 'residential', href: '#', img: 2 },
    { id: 4, num: '04', name: 'Florenc Offices', location: 'Prague 1 — Florenc', year: '2025', cat: 'commercial', href: '#', img: 3 },
    { id: 5, num: '05', name: 'Seifertova Retail', location: 'Prague 3 — Vinohrady', year: '2025', cat: 'commercial', href: '#', img: 4 },
]

const previewImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
]

const activeImgIndex = ref(-1)
let xTo = null
let yTo = null

function filterProjects(cat) {
    activeFilter.value = cat
    const rows = listRef.value.querySelectorAll('.proj-row')
    rows.forEach((row) => {
        const show = cat === 'all' || row.dataset.cat === cat
        gsap.to(row, {
            height: show ? 'auto' : 0,
            opacity: show ? 1 : 0,
            paddingTop: show ? undefined : 0,
            paddingBottom: show ? undefined : 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onStart: () => { if (show) row.style.display = 'block' },
            onComplete: () => {
                if (!show) row.style.display = 'none'
                else gsap.set(row, { clearProps: 'height,padding' })
            },
        })
    })
}

function onRowEnter(imgIndex) {
    activeImgIndex.value = imgIndex
    gsap.to(previewRef.value, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
}

function onRowLeave() {
    activeImgIndex.value = -1
    gsap.to(previewRef.value, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
}

onMounted(() => {
    // Cursor-following preview
    gsap.set(previewRef.value, { xPercent: -50, yPercent: -50, scale: 0.8 })

    xTo = gsap.quickTo(previewRef.value, 'x', { duration: 0.4, ease: 'power3' })
    yTo = gsap.quickTo(previewRef.value, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = (e) => { xTo(e.clientX); yTo(e.clientY) }
    window.addEventListener('mousemove', onMove)

    ctx = gsap.context(() => {
        // Staggered row reveal
        gsap.utils.toArray('.proj-row').forEach((row) => {
            gsap.fromTo(row, { y: 30, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: row, start: 'top 92%' },
            })
        })
    }, listRef.value)

    // Store move handler for cleanup
    listRef.value._moveHandler = onMove
})

onUnmounted(() => {
    if (ctx) ctx.revert()
    if (listRef.value?._moveHandler) {
        window.removeEventListener('mousemove', listRef.value._moveHandler)
    }
})
</script>

<template>
    <!-- Cursor-following image preview (fixed, pointer-events-none) -->
    <div
        ref="previewRef"
        class="fixed top-0 left-0 w-[19vw] h-[25vw] max-w-[320px] max-h-[420px] pointer-events-none z-40 overflow-hidden opacity-0"
        style="will-change: transform;"
    >
        <img
            v-for="(src, i) in previewImages"
            :key="i"
            :src="src"
            alt=""
            :class="['w-full h-full object-cover absolute inset-0 transition-opacity duration-300', activeImgIndex === i ? 'opacity-100' : 'opacity-0']"
        />
    </div>

    <!-- Filter pills -->
    <div class="flex flex-wrap gap-3 px-6 md:px-12 mb-0">
        <button
            v-for="pill in [{ label: 'All', value: 'all' }, { label: 'Residential', value: 'residential' }, { label: 'Office & Retail', value: 'commercial' }]"
            :key="pill.value"
            :class="[
                'text-[12px] tracking-[0.15em] uppercase rounded-full px-5 py-2 transition-colors',
                activeFilter === pill.value
                    ? 'border border-ink'
                    : 'border border-ink/25 hover:border-ink'
            ]"
            @click="filterProjects(pill.value)"
        >{{ pill.label }}</button>
    </div>

    <!-- Project rows -->
    <section ref="listRef" class="border-t border-ink/15 mt-10">
        <component
            :is="project.href === '/' ? Link : 'a'"
            v-for="project in projects"
            :key="project.id"
            :href="project.href"
            :class="['proj-row group block border-b border-ink/15 px-6 md:px-12 py-10 md:py-14']"
            :data-cat="project.cat"
            @mouseenter="onRowEnter(project.img)"
            @mouseleave="onRowLeave"
        >
            <div class="flex items-center justify-between gap-6">
                <div class="flex items-baseline gap-6 md:gap-12 min-w-0">
                    <span class="text-xs md:text-sm font-mono text-ink/40 shrink-0">{{ project.num }}</span>
                    <h2 class="proj-name display font-medium text-5xl md:text-8xl transition-all duration-500 opacity-90 group-hover:translate-x-7">
                        {{ project.name }}
                    </h2>
                </div>
                <div class="hidden md:flex items-center gap-12 shrink-0">
                    <span class="text-sm text-ink/50 w-40">{{ project.location }}</span>
                    <span class="text-sm text-ink/50 w-20">{{ project.year }}</span>
                    <span class="proj-arrow text-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">↗</span>
                </div>
            </div>
        </component>
    </section>
</template>
