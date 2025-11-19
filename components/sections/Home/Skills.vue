<template>
  <section class="content-section" data-liquid-bg-section data-bg-color="#013330">
    <div class="custom-container grid grid-cols-12 gap-4">
      <div class="grid__col--full">

        <div class="content-section__head">
          <h2 class="works__title content-section__title scroll-js-title " data-splitting data-fx="typewriter-scramble">
            Areas of Mastery</h2>
          <span class="works__decorative content-section__decorative scroll-js-title" data-splitting
            data-fx="scale-words">Skills</span>
        </div>
        <div class="about__wrapper w-full mx-auto max-w-7xl content-section__wrapper mb-10 md:mb-18 text-center">
          <div class="about__description content-section__description scroll-js-content !text-[#fff]" data-splitting
            data-fx="scroll-opacity">
            <p>
              I approach development with clarity, intention, and precision — crafting
              systems that scale, interfaces that feel alive, and experiences that balance
              performance with creativity. Every component, every animation, every line of
              code is a step toward something purposeful.
            </p>
          </div>
        </div>

        <ClientOnly>
          <div class="w-full flex flex-col items-center justify-center">
            <div class="relative w-full max-w-7xl 
                grid grid-cols-1 md:grid-cols-4 gap-5 
                items-stretch"> <!-- ⭐ Force equal height columns -->

              <div v-for="(item, index) in skills" :key="index" class="relative flex flex-col h-full">
                <!-- Card container with hover-reveal background -->
                <div
                  class="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem]">
                  <!-- Corner icons -->
                  <PlusIcon class="absolute h-6 w-6 -top-3 -left-3 dark:text-[var(--col-accent)] text-black" />
                  <PlusIcon class="absolute h-6 w-6 -bottom-3 -left-3 dark:text-[var(--col-accent)] text-black" />
                  <PlusIcon class="absolute h-6 w-6 -top-3 -right-3 dark:text-[var(--col-accent)] text-black" />
                  <PlusIcon class="absolute h-6 w-6 -bottom-3 -right-3 dark:text-[var(--col-accent)] text-black" />

                  <!-- Hover reveal overlay -->
                  <div
                    class="absolute inset-0 opacity-0 group-hover/canvas-card:opacity-100 transition-opacity duration-200">
                    <CanvasRevealEffect :animation-speed="3" container-class-name="bg-black" />
                    <!-- Radial gradient for the fade -->
                    <div
                      class="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/80" />
                  </div>

                  <!-- Card content -->
                  <div class="relative z-10 flex flex-col w-full h-full p-6 gap-6 justify-between">
                    <!-- Top section -->
                    <div class="flex flex-col gap-6">
                      <!-- Icon -->
                      <component :is="iconMap[item.icon]" class="w-10 h-10 text-white opacity-90" stroke-width="1.5" />
                      <!-- Number + Title -->
                      <div class="flex flex-col gap-1">
                        <span class="text-white font-mono tracking-widest text-sm">[{{ item.id }}]</span>
                        <h2 class="text-white font-semibold text-2xl md:text-3xl leading-tight">{{ item.title }}</h2>
                      </div>
                      <!-- Description -->
                      <p class="text-white text-base leading-relaxed">{{ item.description }}</p>
                    </div>
                    <!-- Bottom section (Tags) -->
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(tag, tIndex) in item.tags" :key="tIndex"
                        class="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-slate-200">{{ tag
                        }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ClientOnly>
      </div>


    </div>
  </section>
</template>





<script setup>
import { onMounted } from 'vue'
import { useAnimations } from "@/composables/useAnimations"
import CanvasRevealEffect from '@/components/ui/CanvasRevealEffect.vue'
import PlusIcon from '@/components/ui/icons/PlusIcon.vue'
import { Wrench, Layout, Bot, Rocket } from 'lucide-vue-next'

const { $splitting } = useNuxtApp()
const { data: aboutSkills } = await useFetch('/json/aboutSkills.json')
const skills = computed(() => aboutSkills.value || [])

const iconMap = {
  Wrench,
  Layout,
  Bot,
  Rocket
}

const skillIcons = [
  { src: '/assets/Images/skills/icons8-wordpress-150.png', name: 'WordPress' },
  { src: '/assets/Images/skills/icons8-vue-js-150.png', name: 'Vue.js' },
  { src: '/assets/Images/skills/icons8-nuxt-js-150.png', name: 'Nuxt.js' },
  { src: '/assets/Images/skills/icons8-js-150.png', name: 'JavaScript' },
  { src: '/assets/Images/skills/icons8-tailwind-css-150.png', name: 'Tailwind CSS' },
  { src: '/assets/Images/skills/icons8-vite-150.png', name: 'Vite' },
  { src: '/assets/Images/skills/icons8-webpack-150.png', name: 'Webpack' },
  { src: '/assets/Images/skills/icons8-git-150.png', name: 'Git' },
  { src: '/assets/Images/skills/icons8-npm-150.png', name: 'NPM' },
]

onMounted(() => {
  $splitting()
})

useAnimations()
</script>
<style>
.skill-card-wrapper {
  position: relative;
  width: 100%;
  max-width: 150px;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
}

.skill-card-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
