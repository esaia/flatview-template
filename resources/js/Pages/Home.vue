<script setup>
import IreProject360 from "../irep/shortcodes/IreProject360.vue";

defineProps({
    appName: String,
    projectId: [String, Number],
});
</script>

<template>
    <div>
        <IreProject360 :project-id="projectId ?? 1" />
    </div>
</template>
