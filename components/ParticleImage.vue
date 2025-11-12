<template>
  <img ref="imageParticleRef" :src="imageSrc" :class="cn('hidden ', $props.class)" :data-particle-gap="particleGap"
    :data-width="canvasWidth" :data-height="canvasHeight" :data-gravity="gravity" :data-particle-size="particleSize"
    :data-mouse-force="mouseForce" :data-renderer="renderer" :data-color="color" :data-color-arr="colorArr"
    :data-init-position="initPosition" :data-init-direction="initDirection" :data-fade-position="fadePosition"
    :data-fade-direction="fadeDirection" :data-noise="noise" :data-responsive-width="responsiveWidth" />
</template>

<script setup>
import { cn } from "@/lib/utils";
import { inspiraImageParticles } from "./inspiraImageParticles";
import { ref, onMounted } from "vue";

defineProps({
  imageSrc: String,
  class: String,
  canvasWidth: String,
  canvasHeight: String,
  gravity: String,
  particleSize: String,
  particleGap: String,
  mouseForce: String,
  renderer: String,
  color: String,
  colorArr: Array,
  initPosition: String,
  initDirection: String,
  fadePosition: String,
  fadeDirection: String,
  noise: Number,
  responsiveWidth: Boolean
});

let particles;
const imageParticleRef = ref();

onMounted(() => {
  const { InspiraImageParticle } = inspiraImageParticles();
  particles = new InspiraImageParticle(imageParticleRef.value);
});
</script>
