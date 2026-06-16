<script setup>
import { onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavHeader from '../components/home/NavHeader.vue'
import ProjectsHeader from '../components/projects/ProjectsHeader.vue'
import ProjectList from '../components/projects/ProjectList.vue'
import FeaturedGrid from '../components/projects/FeaturedGrid.vue'
import CtaSection from '../components/shared/CtaSection.vue'
import FooterSection from '../components/home/FooterSection.vue'

function onLoad() { ScrollTrigger.refresh() }
onMounted(() => window.addEventListener('load', onLoad))
onUnmounted(() => window.removeEventListener('load', onLoad))
</script>

<template>
    <div class="grain antialiased">
        <NavHeader
            :start-dark="true"
            :show-scrim="false"
            :scroll-threshold="80"
            :top-links="[
                { label: 'Residences', href: '/' },
                { label: 'Projects', href: '/projects' },
            ]"
        />
        <ProjectsHeader />
        <ProjectList />
        <FeaturedGrid />
        <CtaSection
            headline="Start a conversation"
            link-text="Contact sales"
            link-href="mailto:prodej@pentarealestate.com"
        />
        <FooterSection />
    </div>
</template>
