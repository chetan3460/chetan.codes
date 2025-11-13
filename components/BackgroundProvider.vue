<template>
  <div class="background-provider">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useLiquidBgColor } from '~/composables/useLiquidBgColor'

const { init, cleanup } = useLiquidBgColor()
</script>

<style scoped>
.background-provider {
  position: relative;
  z-index: 0;
}
</style>
