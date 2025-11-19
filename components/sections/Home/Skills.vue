<template>
  <section class="content-section" data-liquid-bg-section data-bg-color="#013330">
    <div class="custom-container grid grid-cols-12 gap-4">
      <div class="grid__col--full">

        <div class="content-section__head">
          <h2 class="works__title content-section__title scroll-js-title " data-splitting data-fx="typewriter-scramble">
            Areas of Mastery</h2>
          <span class="works__decorative content-section__decorative scroll-js-title !text-[#e5ffc3]/50" data-splitting
            data-fx="scale-words">Skills</span>
        </div>

        <ClientOnly>
          <div class="w-full flex flex-col items-center justify-center">
            <div class="relative w-full max-w-7xl 
                grid grid-cols-2 md:grid-cols-4 gap-5 
                items-stretch"> <!-- ⭐ Force equal height columns -->

              <div v-for="(item, index) in skills" :key="index" class="relative flex flex-col h-full">
                <!-- ⭐ Each card takes full height -->

                <ElectricBorder :color="item.color" :speed="1" :chaos="0.4" :thickness="2"
                  :style="{ borderRadius: '20px' }" class="h-full flex">
                  <!-- ⭐ ElectricBorder also full height -->

                  <div class="flex flex-col w-full h-full p-6 gap-6 
                      justify-between"> <!-- ⭐ Space out content vertically -->

                    <!-- Top section -->
                    <div class="flex flex-col gap-6">

                      <!-- Icon -->
                      <component :is="iconMap[item.icon]" class="w-10 h-10 text-white opacity-90" stroke-width="1.5" />

                      <!-- Number + Title -->
                      <div class="flex flex-col gap-1">
                        <span class="text-white/40 font-mono tracking-widest text-sm">
                          [{{ item.id }}]
                        </span>
                        <h2 class="text-white font-semibold text-2xl md:text-3xl leading-tight">
                          {{ item.title }}
                        </h2>
                      </div>

                      <!-- Description -->
                      <p class="text-slate-300 text-base leading-relaxed">
                        {{ item.description }}
                      </p>
                    </div>

                    <!-- Bottom section (Tags) -->
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(tag, tIndex) in item.tags" :key="tIndex"
                        class="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-slate-200">
                        {{ tag }}
                      </span>
                    </div>

                  </div>
                </ElectricBorder>
              </div>

            </div>
          </div>
        </ClientOnly>


        <!-- <div class="overflow-hidden relative">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 max-w-7xl mx-auto ">
            <div v-for="(icon, index) in skillIcons" :key="index"
              class="skill-card-wrapper flex flex-col items-center justify-center">
              <ParticleImage :image-src="icon.src" canvas-width="150" canvas-height="150" mouse-force="50"
                gravity="0.08" :noise="9" particle-size="2" particle-gap="1" />
            </div>
          </div>


        </div> -->
      </div>


    </div>
  </section>
</template>





<script setup>
import { onMounted } from 'vue'
import { useAnimations } from "@/composables/useAnimations"
import ParticleImage from '@/components/ParticleImage.vue'
import ElectricBorder from '@/components/ui/ElectricBorder.vue'
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
