<template>
    <section class="h-svh w-screen  relative  ">
        <!-- Threads Background -->
        <Threads :color="[1, 1, 1]" :amplitude="2" :distance="0.2" :enableMouseInteraction="true" />

        <!-- Text Pressure -->
        <div
            class="absolute bottom-0 left-0 right-0 w-full h-full flex items-center justify-center pointer-events-none">
            <TextPressure text="CREATIVE DEVELOPER" :flex="true" :alpha="false" :stroke="false" :width="false"
                :weight="true" :italic="true" text-color="#ffffff" stroke-color="#27FF64" :min-font-size="40" />
        </div>
        <div class="hero-header__wrapper items-end size-full relative custom-container custom-gird ">
            <div class="hero-header__bottom col-start-1 col-span-12">
                <h2 class="hero-header__description font-normal text-center !font-OutfitPortfolio text-[20px] md:text-4xl leading-tight md:leading-relaxed text-white"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useHeroAnimations } from "@/composables/useHeroBanner";

useHeroAnimations();

// Responsive canvas sizing
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920)
const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 1080)

const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>
