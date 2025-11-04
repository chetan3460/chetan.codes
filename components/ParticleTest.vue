<template>
  <div class="particle-test-container">
    <h2 class="text-white text-2xl font-bold text-center mb-8">Particle Image Test</h2>
    
    <!-- Simple Inspira UI Example -->
    <div class="demo-section">
      <h3 class="text-white text-lg mb-4">Simple Example (image.png)</h3>
      <div class="flex flex-col items-center justify-center min-h-[500px]">
        <ParticleImage
          image-src="/assets/Images/skills/image.png"
          :responsive-width="true"
          mouse-force="50"
          gravity="0.08"
          :noise="5"
        />
      </div>
    </div>

    <!-- Exact Inspira UI Demo with Background Particles -->
    <div class="demo-section">
      <h3 class="text-white text-lg mb-4">Demo 1: Vue.js Logo (With Background Particles)</h3>
      <div class="demo-card-with-bg">
        <!-- Background particles layer - using white square image -->
        <div class="background-particles-layer">
          <ParticleImage
            image-src="/assets/Images/skills/white-square.png"
            canvas-width="800"
            canvas-height="500"
            color="#ffffff"
            particle-size="1"
            particle-gap="10"
            gravity="0.02"
            mouse-force="30"
            :noise="2"
            init-position="random"
            init-direction="none"
            renderer="default"
            class="bg-particles"
          />
        </div>
        
        <!-- Logo particles layer -->
        <div class="logo-particles">
          <ParticleImage
            image-src="/assets/Images/skills/icons8-vue.js-100.png"
            canvas-width="400"
            canvas-height="400"
            color="#ffffff"
            particle-size="2"
            particle-gap="2"
            gravity="0.08"
            mouse-force="50"
            :noise="5"
            init-position="random"
            init-direction="random"
            renderer="default"
          />
        </div>
      </div>
    </div>

    <!-- Test with different settings -->
    <div class="demo-section">
      <h3 class="text-white text-lg mb-4">Demo 2: Nuxt Logo (different settings)</h3>
      <div class="demo-card">
        <ParticleImage
          image-src="/assets/Images/skills/icons8-nuxt-js-100.png"
          canvas-width="400"
          canvas-height="400"
          color="#ffffff"
          particle-size="3"
          particle-gap="3"
          gravity="0.1"
          mouse-force="80"
          :noise="8"
          init-position="misplaced"
          init-direction="random"
          renderer="default"
        />
      </div>
    </div>

    <!-- Test with WebGL renderer -->
    <div class="demo-section">
      <h3 class="text-white text-lg mb-4">Demo 3: JavaScript Logo (WebGL)</h3>
      <div class="demo-card">
        <ParticleImage
          image-src="/assets/Images/skills/icons8-javascript-100.png"
          canvas-width="400"
          canvas-height="400"
          color="#ffffff"
          particle-size="2"
          particle-gap="2"
          gravity="0.08"
          mouse-force="50"
          :noise="5"
          init-position="random"
          init-direction="random"
          renderer="webgl"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ParticleImage from '@/components/ParticleImage.vue'
</script>

<style>
.particle-test-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #1a1a1a) !important;
  padding: 4rem 2rem;
}

.demo-section {
  margin-bottom: 4rem;
}

.demo-card {
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 450px;
}

.demo-card-with-bg {
  position: relative;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  overflow: hidden;
}

.background-particles-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.3;
}

.bg-particles {
  width: 100% !important;
  height: 100% !important;
}

.logo-particles {
  position: relative;
  z-index: 2;
}
</style>
