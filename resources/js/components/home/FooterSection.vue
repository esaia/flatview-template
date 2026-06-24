<script setup>
import site from '../../config/siteContent'
</script>

<template>
    <footer class="relative z-10 px-6 md:px-12 pt-24 md:pt-28 pb-10 bg-paper">
        <h3 class="display font-medium text-4xl sm:text-5xl md:text-7xl mb-12 md:mb-16">{{ site.footer.heading }}</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 max-w-3xl text-sm leading-relaxed">
            <div v-for="company in site.footer.companies" :key="company.name">
                <p class="font-bold mb-3">{{ company.name }}</p>
                <p class="text-ink/70">
                    <template v-for="(line, i) in company.addressLines" :key="i">
                        {{ line }}<br v-if="i < company.addressLines.length - 1" />
                    </template>
                </p>
                <a :href="`mailto:${company.email}`" class="link-underline mt-4 inline-block text-ink/70">
                    {{ company.email }}
                </a>
            </div>
        </div>

        <div class="mt-12 md:mt-16 flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-4 border-t border-ink/15 pt-8">
            <p class="text-xs text-ink/50 max-w-xs">{{ site.footer.legalLinks }}</p>
            <div class="display font-medium text-4xl sm:text-5xl md:text-6xl">{{ site.brand.name }}</div>
        </div>

        <div class="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-ink/15 pt-8 text-xs text-ink/50">
            <span>{{ site.footer.credit }}</span>
            <span class="sm:text-center">{{ site.footer.copyright }}</span>
            <div class="flex items-center gap-4">
                <a :href="site.social.facebook" class="hover:text-ink transition">FB</a>
                <a :href="site.social.instagram" class="hover:text-ink transition">IG</a>
            </div>
        </div>
    </footer>
</template>
