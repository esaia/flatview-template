<script setup>
import IreProject360 from "../irep/shortcodes/IreProject360.vue";
import NavHeader from "../components/home/NavHeader.vue";
import FooterSection from "../components/home/FooterSection.vue";

defineProps({
    projectId: [String, Number],
});
</script>

<template>
    <div class="grain antialiased">
        <NavHeader :start-dark="true" :show-scrim="false" :scroll-threshold="0" />
        <div class="pt-24">
            <IreProject360 :project-id="projectId" />
        </div>
        <FooterSection />
    </div>
</template>
