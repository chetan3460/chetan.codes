<template>
  <div class="background-provider">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useLiquidBg } from '~/composables/useLiquidBg'

const { init, cleanup } = useLiquidBg()
</script>

<style scoped>
.background-provider {
  position: relative;
  z-index: 0;
}
</style>
