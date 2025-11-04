<template>
  <div class="particle-demo-container">
    <h2 class="demo-title">Particle Image Effect</h2>
    
    <!-- Basic Example -->
    <div class="demo-section">
      <h3>Basic Usage</h3>
      <ParticleImage
        image-src="/path/to/your/image.jpg"
        :canvas-width="500"
        :canvas-height="500"
        color="#FFF"
      />
    </div>

    <!-- With Custom Colors -->
    <div class="demo-section">
      <h3>Custom Color</h3>
      <ParticleImage
        image-src="/path/to/your/image.jpg"
        :canvas-width="500"
        :canvas-height="500"
        color="#00ff88"
        :particle-size="3"
        :particle-gap="4"
      />
    </div>

    <!-- With Initial Animation -->
    <div class="demo-section">
      <h3>Animated Entry</h3>
      <ParticleImage
        image-src="/path/to/your/image.jpg"
        :canvas-width="500"
        :canvas-height="500"
        init-position="top"
        init-direction="bottom"
        :gravity="0.1"
        :mouse-force="150"
      />
    </div>

    <!-- With RGB Color Array -->
    <div class="demo-section">
      <h3>RGB Color Array</h3>
      <ParticleImage
        image-src="/path/to/your/image.jpg"
        :canvas-width="500"
        :canvas-height="500"
        :color-arr="[255, 100, 200]"
        :particle-size="2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ParticleImage from './ParticleImage.vue'
</script>

<style scoped>
.particle-demo-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.demo-section {
  margin-bottom: 3rem;
}

.demo-section h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
</style>
