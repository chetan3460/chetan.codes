<template>
<section class="content-section" data-liquid-bg-section data-bg-color="#ffedd5">
    <div class="custom-container grid grid-cols-12 gap-4">
      <div class="grid__col--full">

        <div class="content-section__head">
          <h2 class="works__title content-section__title scroll-js-title" data-splitting data-fx="typewriter-scramble">
            My Tech Arsenal</h2>
          <span class="works__decorative content-section__decorative scroll-js-title" data-splitting
            data-fx="scale-words">Skills</span>
        </div>
        <div class="overflow-hidden relative">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 max-w-7xl mx-auto ">
            <div v-for="(icon, index) in skillIcons" :key="index"
              class="skill-card-wrapper flex flex-col items-center justify-center">
              <ParticleImage :image-src="icon.src" canvas-width="150" canvas-height="150" mouse-force="50"
                gravity="0.08" :noise="9" particle-size="2" particle-gap="1" />
            </div>
          </div>


        </div>
      </div>


    </div>
  </section>
</template>





<script setup>
import imageSrc from '/assets/Images/coding.png';
import { onMounted } from 'vue'
import ParticleImage from '@/components/ParticleImage.vue'
import { useAnimations } from "@/composables/useAnimations";

useAnimations();
const { $splitting } = useNuxtApp();

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
  $splitting();
})
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
