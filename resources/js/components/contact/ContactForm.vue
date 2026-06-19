<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let ctx = null

const form = reactive({
    name: '',
    email: '',
    phone: '',
    message: '',
})
const submitted = ref(false)

function onSubmit() {
    // No backend endpoint yet — surface a confirmation state.
    submitted.value = true
}

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.utils.toArray('.reveal-head').forEach((head) => {
            const lines = head.querySelectorAll('.mask-line > span')
            gsap.fromTo(lines, { yPercent: 115 }, {
                yPercent: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.1,
                scrollTrigger: { trigger: head, start: 'top 82%' },
            })
        })
        gsap.utils.toArray('.fade-up').forEach((el) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
            })
        })
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx) ctx.revert()
})
</script>

<template>
    <section ref="sectionRef" class="relative z-10 bg-paper px-6 md:px-12 py-24 md:py-36">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <!-- Details -->
            <div class="lg:col-span-5">
                <p class="text-[13px] tracking-[0.3em] uppercase text-ink/50 mb-6 fade-up">01 — Sales office</p>
                <h2 class="display font-medium text-4xl md:text-6xl mb-10 reveal-head">
                    <span class="mask-line"><span>Visit us</span></span>
                </h2>

                <div class="space-y-8 text-sm leading-relaxed max-w-md">
                    <div class="fade-up">
                        <p class="font-bold mb-2">Address</p>
                        <p class="text-ink/70">Vinohradská 8<br />120 00 Praha 2<br />Czech Republic</p>
                    </div>
                    <div class="fade-up">
                        <p class="font-bold mb-2">Email</p>
                        <a href="mailto:prodej@pentarealestate.com" class="link-underline inline-block text-ink/70">
                            prodej@pentarealestate.com
                        </a>
                    </div>
                    <div class="fade-up">
                        <p class="font-bold mb-2">Phone</p>
                        <a href="tel:+420000000000" class="link-underline inline-block text-ink/70">
                            +420 000 000 000
                        </a>
                    </div>
                    <div class="fade-up">
                        <p class="font-bold mb-2">Opening hours</p>
                        <p class="text-ink/70">Mon — Fri · 9:00 — 18:00<br />Sat · by appointment</p>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <div class="lg:col-span-7">
                <p class="text-[13px] tracking-[0.3em] uppercase text-ink/50 mb-6 fade-up">02 — Send a message</p>

                <form v-if="!submitted" class="space-y-8" @submit.prevent="onSubmit">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div class="field fade-up">
                            <label for="name" class="block text-xs tracking-[0.15em] uppercase text-ink/50 mb-3">Name</label>
                            <input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                                placeholder="Your full name"
                                class="field-input"
                            />
                        </div>
                        <div class="field fade-up">
                            <label for="email" class="block text-xs tracking-[0.15em] uppercase text-ink/50 mb-3">Email</label>
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                class="field-input"
                            />
                        </div>
                    </div>

                    <div class="field fade-up">
                        <label for="phone" class="block text-xs tracking-[0.15em] uppercase text-ink/50 mb-3">Phone <span class="normal-case tracking-normal">(optional)</span></label>
                        <input
                            id="phone"
                            v-model="form.phone"
                            type="tel"
                            placeholder="+420 000 000 000"
                            class="field-input"
                        />
                    </div>

                    <div class="field fade-up">
                        <label for="message" class="block text-xs tracking-[0.15em] uppercase text-ink/50 mb-3">Message</label>
                        <textarea
                            id="message"
                            v-model="form.message"
                            rows="5"
                            required
                            placeholder="Tell us a little about what you're looking for…"
                            class="field-input resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        class="fade-up bg-ink text-paper px-10 py-4 text-sm tracking-[0.1em] font-medium hover:bg-ink/85 transition-colors"
                    >
                        Send message
                    </button>
                </form>

                <div v-else class="fade-up border border-ink/15 px-8 py-16 text-center">
                    <h3 class="display font-medium text-3xl md:text-4xl mb-4">Thank you</h3>
                    <p class="text-ink/70 max-w-sm mx-auto">Your message has been received. Our sales team will be in touch with you shortly.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.field {
    position: relative;
}

.field-input {
    width: 100%;
    background: transparent;
    border: 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-ink) 35%, transparent);
    padding: 0 0 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--color-ink);
    transition: border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.field-input::placeholder {
    color: color-mix(in srgb, var(--color-ink) 32%, transparent);
}

.field-input:hover {
    border-bottom-color: color-mix(in srgb, var(--color-ink) 55%, transparent);
}

.field-input:focus {
    outline: none;
    border-bottom-color: var(--color-ink);
}
</style>
