<script setup>
defineProps({
    appName: String,
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ appName }}</h1>
            <p class="text-gray-500">Laravel + Inertia + Vue + Tailwind + Vite</p>
        </div>
    </div>
</template>
