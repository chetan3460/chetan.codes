<template>
  <section class="content-section">
    <div class="custom-container grid grid-cols-12 gap-4">
      <div class="grid__col--full">
        <div class="about__media">
          <img :src="imageSrc" class="media__image" alt="">
        </div>
        <div class="content-section__head">
          <h2 class="works__title content-section__title scroll-js-title" data-splitting data-fx="perspective-opacity">
            My Tech Arsenal</h2>
          <span class="works__decorative content-section__decorative scroll-js-title" data-splitting
            data-fx="scale-words">Skills</span>
        </div>
        <div class="min-h-[600px] overflow-hidden relative py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-8">
            <div v-for="(icon, index) in skillIcons" :key="index"
              class="skill-card-wrapper flex flex-col items-center justify-center">
              <ParticleImage :image-src="icon.src" canvas-width="300" canvas-height="300" mouse-force="50"
                gravity="0.08" :noise="5" />
            </div>
          </div>


        </div>
      </div>


    </div>
  </section>
</template>



<style>
.medias {

  .media:nth-child(2),
  .media:nth-child(4),
  .media:nth-child(5),
  .media:nth-child(7),
  .media:nth-child(10),
  .media:nth-child(12) {
    background-color: transparent;
  }
}
</style>

<script setup>
import imageSrc from '/assets/Images/coding.png';
import { onMounted } from 'vue'
import ParticleImage from '@/components/ParticleImage.vue'
import { useAnimations } from "@/composables/useAnimations";

useAnimations();
const { $splitting } = useNuxtApp();

const skillIcons = [
  { src: '/assets/Images/skills/icons8-wordpress-2-100.png', name: 'WordPress' },
  { src: '/assets/Images/skills/icons8-vue.js-100.png', name: 'Vue.js' },
  { src: '/assets/Images/skills/icons8-nuxt-js-100.png', name: 'Nuxt.js' },
  { src: '/assets/Images/skills/icons8-javascript-100.png', name: 'JavaScript' },
  { src: '/assets/Images/skills/image.png', name: 'Image' },
  { src: '/assets/Images/skills/icons8-vite-100.png', name: 'Vite' },
]

onMounted(() => {
  $splitting();
})
</script>
<style>
.skill-card-wrapper {
  position: relative;
  max-width: 300px;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
