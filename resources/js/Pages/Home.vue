<script setup>
import IreProject360 from "../irep/shortcodes/IreProject360.vue";
import IreProject from "../irep/shortcodes/IreProject.vue";

defineProps({
    appName: String,
    projectId: [String, Number],
});
</script>

<template>
    <div>
        <IreProject360 :project-id="projectId ?? 1" />
        <IreProject :project-id="projectId ?? 4" />
    </div>
</template>
