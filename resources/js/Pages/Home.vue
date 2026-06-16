<script setup>
import { onMounted, onUnmounted } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavHeader from "../components/home/NavHeader.vue";
import HeroSlider from "../components/home/HeroSlider.vue";
import PrestigeSection from "../components/home/PrestigeSection.vue";
import ParallaxSection from "../components/home/ParallaxSection.vue";
import MarqueeSection from "../components/home/MarqueeSection.vue";
import SplitSection from "../components/home/SplitSection.vue";
import GeniusLoci from "../components/home/GeniusLoci.vue";
import FooterSection from "../components/home/FooterSection.vue";

defineProps({
    appName: String,
});

function onLoad() {
    ScrollTrigger.refresh();
}

onMounted(() => window.addEventListener("load", onLoad));
onUnmounted(() => window.removeEventListener("load", onLoad));
</script>

<template>
    <div class="grain antialiased">
        <NavHeader />
        <HeroSlider />
<PrestigeSection />
        <ParallaxSection />
        <MarqueeSection />
        <SplitSection
            image-url="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1800&auto=format&fit=crop"
            image-alt="Penthouse terrace"
            :image-left="true"
            title="Your image of Prague"
            subtitle="Panoramic views"
            body="The penthouses at Vinohradská 8 are a definition of the exceptional. Generous layouts, large-format windows and spacious terraces open up unrepeatable views — from Prague's rooftops and towers all the way to the iconic panorama of Hradčany. Every detail is composed like a harmony of space, light and emotion that transforms everyday moments into an aesthetic experience."
        />
        <SplitSection
            section-id="rezidence"
            image-url="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1800&auto=format&fit=crop"
            image-alt="Residence interior"
            :image-left="false"
            image-height-class="h-[60vh] md:h-[85vh]"
            title="Residences"
            subtitle="Harmony in every form"
            body="The residences at Vinohradská 8 offer a varied collection of options to suit different lifestyles. From modern apartments with room for a large family to elegant units with investment potential — every home is designed in the spirit of Standard Platinum, with an emphasis on detail, security and comfort. Thanks to its exceptional location in the centre of Prague and a quiet inner courtyard with mature trees, Vinohradská 8 takes on the character of a true home."
            link-text="Choose your apartment"
            link-href="#"
        />
        <GeniusLoci />
        <FooterSection />
    </div>
</template>
