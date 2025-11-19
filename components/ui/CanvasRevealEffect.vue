<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import DotMatrix from './DotMatrix.vue'

const props = withDefaults(defineProps<{
  animationSpeed?: number
  opacities?: number[]
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
}>(), {
  animationSpeed: 0.4,
  opacities: () => [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors: () => [[0, 255, 255]],
  dotSize: 3,
  showGradient: true,
})

const shaderSnippet = computed(() => `
  float animation_speed_factor = ${props.animationSpeed.toFixed(1)};
  float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
  opacity *= step(intro_offset, u_time * animation_speed_factor);
  opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
`)
</script>

<template>
  <div :class="cn('h-full relative bg-white w-full', containerClassName)">
    <div class="h-full w-full">
      <DotMatrix
        :colors="colors"
        :dot-size="dotSize"
        :opacities="opacities"
        :shader="shaderSnippet"
        :center="['x', 'y']"
      />
    </div>
    <div v-if="showGradient" class="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
  </div>
</template>