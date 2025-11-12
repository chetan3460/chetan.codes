<template>
  <canvas class="wave-animation__canvas absolute inset-0 w-full h-full -left-1"
    :class="{ 'opacity-0': !isVisible }"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useWaveAnimation } from '@/composables/useWaveAnimation'

const props = defineProps({
  // Animation parameters
  amplitude: {
    type: Number,
    default: 300
  },
  speed: {
    type: Number,
    default: 0.003
  },
  lines: {
    type: Number,
    default: 15
  },
  lineStroke: {
    type: Number,
    default: 1
  },

  // Color control
  color: {
    type: Object,
    default: () => ({ r: 255, g: 29, b: 72 })
  },
  theme: {
    type: String,
    default: 'theme-dark'
  },

  // Animation control
  autoPlay: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['initialized', 'colorUpdated', 'themeChanged'])

const { manager, updateTheme, startAnimation, stopAnimation } = useWaveAnimation()
const isReady = ref(false)

// Watch for prop changes and update manager
watch(() => props.amplitude, (newVal) => {
  if (manager && manager.parameters) {
    manager.parameters.amplitude = newVal
  }
})

watch(() => props.speed, (newVal) => {
  if (manager && manager.parameters) {
    manager.parameters.speed = newVal
  }
})

watch(() => props.lines, (newVal) => {
  if (manager && manager.parameters) {
    manager.parameters.lines = newVal
    manager.setupRandomness()
  }
})

watch(() => props.lineStroke, (newVal) => {
  if (manager && manager.parameters) {
    manager.parameters.lineStroke = newVal
  }
})

watch(() => props.color, (newVal) => {
  if (manager && manager.parameters) {
    Object.assign(manager.parameters.waveColor, newVal)
  }
})

watch(() => props.theme, (newVal) => {
  updateTheme(newVal)
  emit('themeChanged', newVal)
})

watch(() => props.autoPlay, (newVal) => {
  if (newVal && isReady.value) {
    startAnimation()
  } else {
    stopAnimation()
  }
})

onMounted(() => {
  // Wait a tick for DOM to be ready
  nextTick(() => {
    const canvas = document.querySelector('.wave-animation__canvas')
    if (canvas && manager) {
      // Reset canvas if it was already set to prevent duplicates
      if (manager.canvas && manager.canvas !== canvas) {
        manager.stop()
        manager.canvas = null
        manager.context = null
      }
      
      manager.canvas = canvas
      manager.context = canvas.getContext('2d')
      manager.setSizes()
      manager.setupCanvas()
      manager.setupRandomness()
      manager.attachEventListeners()
      
      isReady.value = true
      emit('initialized', manager)
      
      if (props.autoPlay) {
        startAnimation()
      }
    }
  })
})

onUnmounted(() => {
  // Only destroy if this is the last instance
  if (manager && manager.canvas) {
    manager.stop()
  }
})

// Expose methods
defineExpose({
  startAnimation,
  stopAnimation,
  updateTheme,
  getManager: () => manager
})
</script>

<style scoped>
.wave-animation__canvas {
  transition: opacity 0.3s ease;
}
</style>
