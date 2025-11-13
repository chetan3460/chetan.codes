<template>
    <section class="h-svh w-screen relative" data-liquid-bg-section data-bg-color="#0a0521">
        <!-- Threads Background -->
        <!-- <Threads :color="threadColor" :amplitude="threadParams.amplitude" :distance="threadParams.distance"
            :enableMouseInteraction="true" /> -->

        <!-- Wave Animation -->
        <WaveAnimation :amplitude="waveParams.amplitude" :speed="waveParams.speed" :lines="waveParams.lines"
            :color="waveParams.color" :theme="waveParams.theme" :auto-play="true" />

        <!-- Text Pressure -->
        <div
            class="absolute bottom-0 left-0 right-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
            <TextPressure text="CREATIVE DEVELOPER" :flex="true" :alpha="false" :stroke="false" :width="false"
                :weight="true" :italic="true" text-color="#ffffff" stroke-color="#27FF64" :min-font-size="40" />
        </div>
        <div class="hero-header__wrapper items-end size-full relative custom-container custom-gird pb-12 z-10">
            <div class="hero-header__bottom col-start-1 col-span-12">
                <h2 class="hero-header__description font-normal text-center !font-OutfitPortfolio  text-base md:text-2xl lg:text-4xl leading-5 md:leading-relaxed text-white"
                    data-splitting>
                    Turning pixels into experiences. Code into emotion. <br />
                    Ideas into reality. Creative Developer specializing <br />in immersive web storytelling.
                </h2>
            </div>
        </div>
    </section>
</template>

<script setup>
import Threads from '~/components/ui/Threads.vue'
import TextPressure from '~/components/ui/TextPressure.vue'
import WaveAnimation from '~/components/ui/WaveAnimation.vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useHeroAnimations } from "@/composables/useHeroBanner";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHeroAnimations();

// Wave animation parameters
const waveParams = reactive({
    amplitude: 300,
    speed: 0.003,
    lines: 15,
    color: { r: 255, g: 29, b: 72 },
    theme: 'theme-dark'
})

// Threads animation parameters - use reactive for GSAP
const threadParams = reactive({
    amplitude: 0,
    distance: 0
})

const threadColor = [1, 1, 1]

// Responsive canvas sizing
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920)
const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 1080)

const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
}

const scrollTriggers = []

onMounted(() => {
    window.addEventListener('resize', handleResize)

    // Smooth entrance animation to wave state
    gsap.to(threadParams, {
        amplitude: 2.5,
        distance: 0.4,
        duration: 2,
        ease: 'power2.out'
    })

    // Wave-like motion - Subtle amplitude variation
    gsap.to(threadParams, {
        amplitude: 3.2,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    })

    // Wave-like motion - Distance flow
    gsap.to(threadParams, {
        distance: 0.7,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5  // Slight offset for flowing wave effect
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    // Cleanup ScrollTrigger instances
    scrollTriggers.forEach(st => st.kill())
})

// Example: Change wave params dynamically
const changeWaveColor = (r, g, b) => {
    waveParams.color = { r, g, b }
}

const changeWaveTheme = (theme) => {
    waveParams.theme = theme
}

defineExpose({
    changeWaveColor,
    changeWaveTheme,
    waveParams
})
</script>
