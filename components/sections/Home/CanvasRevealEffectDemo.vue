<script setup lang="ts">
import CanvasRevealEffect from '@/components/ui/CanvasRevealEffect.vue'
import CanvasRevealCard from '@/components/ui/CanvasRevealCard.vue'
import AceternityIcon from '@/components/ui/icons/AceternityIcon.vue'
</script>

<template>
  <div class="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
    <CanvasRevealCard title="Sheetal is Nisha">
      <template #icon>
        <AceternityIcon />
      </template>
      <CanvasRevealEffect :animation-speed="5.1" container-class-name="bg-emerald-900" />
    </CanvasRevealCard>

    <CanvasRevealCard title="Nisha is Munni">
      <template #icon>
        <AceternityIcon />
      </template>
      <div class="absolute inset-0">
        <CanvasRevealEffect
          :animation-speed="3"
          container-class-name="bg-black"
          :colors="[[236,72,153],[232,121,249]]"
          :dot-size="2"
        />
        <!-- Radial gradient for the cute fade -->
        <div class="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
      </div>
    </CanvasRevealCard>

    <CanvasRevealCard title="Munni is Aditi">
      <template #icon>
        <AceternityIcon />
      </template>
      <CanvasRevealEffect
        :animation-speed="3"
        container-class-name="bg-sky-600"
        :colors="[[125,211,252]]"
      />
    </CanvasRevealCard>
  </div>
</template>