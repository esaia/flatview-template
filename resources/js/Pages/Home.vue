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
import site from "../config/siteContent";

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
            :title="site.home.split1.title"
            :subtitle="site.home.split1.subtitle"
            :body="site.home.split1.body"
        />
        <SplitSection
            section-id="rezidence"
            image-url="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1800&auto=format&fit=crop"
            image-alt="Residence interior"
            :image-left="false"
            image-height-class="h-[60vh] md:h-[85vh]"
            :title="site.home.split2.title"
            :subtitle="site.home.split2.subtitle"
            :body="site.home.split2.body"
            :link-text="site.home.split2.linkText"
            link-href="#"
        />
        <GeniusLoci />
        <FooterSection />
    </div>
</template>
