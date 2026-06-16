<script setup>
import { onMounted, onUnmounted } from 'vue'
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

function onLoad() { ScrollTrigger.refresh() }
onMounted(() => window.addEventListener('load', onLoad))
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
            label="02 — Architecture"
            title="Composed in detail"
            body="Under the renowned studio Jakub Cigler Architekti, every layout is conceived as a movement in a larger composition. Generous dispositions, large-format windows and spacious terraces open onto unrepeatable views — from Prague's rooftops and towers to the iconic panorama of Hradčany. Each home is designed in the spirit of Standard Platinum, with an emphasis on detail, security and comfort."
        />
        <DevelopersSection />
        <QuoteSection />
        <CtaSection
            headline="Find your home"
            link-text="Choose your apartment"
            link-href="/#rezidence"
        />
        <FooterSection />
    </div>
</template>
