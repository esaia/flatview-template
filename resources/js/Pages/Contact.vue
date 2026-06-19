<script setup>
import { onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavHeader from '../components/home/NavHeader.vue'
import ContactHero from '../components/contact/ContactHero.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import FooterSection from '../components/home/FooterSection.vue'

function onLoad() { ScrollTrigger.refresh() }
onMounted(() => window.addEventListener('load', onLoad))
onUnmounted(() => window.removeEventListener('load', onLoad))
</script>

<template>
    <div class="grain antialiased">
        <NavHeader
            trigger-selector="#contact-hero"
            :top-links="[
                { label: 'Residences', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
            ]"
        />
        <ContactHero />
        <ContactForm />
        <FooterSection />
    </div>
</template>
