<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavHeader from '../components/home/NavHeader.vue'
import AboutHero from '../components/about/AboutHero.vue'
import VisionSection from '../components/about/VisionSection.vue'
import AboutParallax from '../components/about/AboutParallax.vue'
import AboutStats from '../components/about/AboutStats.vue'
import AboutMarquee from '../components/about/AboutMarquee.vue'
import SplitSection from '../components/home/SplitSection.vue'
import DevelopersSection from '../components/about/DevelopersSection.vue'
import QuoteSection from '../components/about/QuoteSection.vue'
import CtaSection from '../components/shared/CtaSection.vue'
import FooterSection from '../components/home/FooterSection.vue'
import site from '../config/siteContent'

// This page stacks several pinned ScrollTriggers (AboutParallax, VisionSection).
// When the large hero images finish loading, ScrollTrigger refreshes and would
// otherwise restore a stale scroll position — landing the page mid-content.
// We clear that memory and force the top after each refresh.
function resetToTop() {
    ScrollTrigger.clearScrollMemory('manual')
    window.scrollTo(0, 0)
}

function onLoad() {
    ScrollTrigger.refresh()
    resetToTop()
}

onMounted(async () => {
    window.addEventListener('load', onLoad)
    // Wait for child sections to register their pins, then settle at the top.
    // Covers Inertia SPA navigations, where `window load` never fires again.
    await nextTick()
    resetToTop()
    ScrollTrigger.refresh()
    resetToTop()
})

onUnmounted(() => window.removeEventListener('load', onLoad))
</script>

<template>
    <div class="grain antialiased">
        <NavHeader
            trigger-selector="#about-hero"
            :top-links="[
                { label: 'Residences', href: '/' },
                { label: 'About', href: '/about' },
            ]"
        />
        <AboutHero />
        <VisionSection />
        <AboutParallax />
        <AboutStats />
        <AboutMarquee />
        <SplitSection
            image-url="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1800&auto=format&fit=crop"
            image-alt="Architecture detail"
            :image-left="true"
            :label="site.about.split.label"
            :title="site.about.split.title"
            :body="site.about.split.body"
        />
        <DevelopersSection />
        <QuoteSection />
        <CtaSection
            :headline="site.about.cta.headline"
            :link-text="site.about.cta.linkText"
            :link-href="site.about.cta.linkHref"
        />
        <FooterSection />
    </div>
</template>
