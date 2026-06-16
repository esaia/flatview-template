<script setup>
import IreProject from "../irep/shortcodes/IreProject.vue";
import NavHeader from "../components/home/NavHeader.vue";
import FooterSection from "../components/home/FooterSection.vue";

defineProps({
    projectId: [String, Number],
});
</script>

<template>
    <div class="grain antialiased">
        <NavHeader :start-dark="true" :show-scrim="false" />
        <div class="pt-24">
            <IreProject :project-id="projectId" />
        </div>
        <FooterSection />
    </div>
</template>
