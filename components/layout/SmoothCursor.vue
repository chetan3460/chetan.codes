<template>
  <ClientOnly>
    <Motion
      as="div"
      :style="{
        position: 'fixed',
        left: `${cursorX}px`,
        top: `${cursorY}px`,
        translateX: '-50%',
        translateY: '-50%',
        rotate: `${rotation}deg`,
        scale: scale,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
      }"
      :initial="{ scale: 0 }"
      :animate="{ scale: 1 }"
      :transition="{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }"
    >
      <component :is="props.cursor" />
    </Motion>
  </ClientOnly>
</template>

<script lang="ts">
import type { Component } from "vue";

interface Position {
  x: number;
  y: number;
}

const defaultSpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

interface SmoothCursorProps {
  cursor?: Component;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}
</script>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useEventListener, useTimeout } from "@vueuse/core";
import DefaultCursor from "./DefaultCursor.vue";
import { Motion } from "motion-v";

const props = withDefaults(defineProps<SmoothCursorProps>(), {
  cursor: () => DefaultCursor,
  springConfig: () => defaultSpringConfig,
});

const isMoving = ref(false);
const lastMousePos = ref<Position>({ x: 0, y: 0 });
const velocity = ref<Position>({ x: 0, y: 0 });
const lastUpdateTime = ref(Date.now());
const previousAngle = ref(0);
const accumulatedRotation = ref(0);

// Target positions for smooth interpolation
const targetX = ref(0);
const targetY = ref(0);

// Animated positions
const cursorX = ref(0);
const cursorY = ref(0);
const rotation = ref(0);
const scale = ref(1);

const damping = props.springConfig?.damping ?? 45;
const stiffness = props.springConfig?.stiffness ?? 400;

function updateVelocity(currentPos: Position) {
  const currentTime = Date.now();
  const deltaTime = currentTime - lastUpdateTime.value;

  if (deltaTime > 0) {
    velocity.value = {
      x: (currentPos.x - lastMousePos.value.x) / deltaTime,
      y: (currentPos.y - lastMousePos.value.y) / deltaTime,
    };
  }

  lastUpdateTime.value = currentTime;
  lastMousePos.value = currentPos;
}

function smoothMouseMove(e: MouseEvent) {
  const currentPos = { x: e.clientX, y: e.clientY };
  updateVelocity(currentPos);

  const speed = Math.sqrt(Math.pow(velocity.value.x, 2) + Math.pow(velocity.value.y, 2));

  targetX.value = currentPos.x;
  targetY.value = currentPos.y;

  if (speed > 0.1) {
    const currentAngle = Math.atan2(velocity.value.y, velocity.value.x) * (180 / Math.PI) + 90;

    let angleDiff = currentAngle - previousAngle.value;
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    accumulatedRotation.value += angleDiff;
    previousAngle.value = currentAngle;

    scale.value = 0.95;
    isMoving.value = true;

    useTimeout(150, {
      callback: () => {
        scale.value = 1;
        isMoving.value = false;
      },
    });
  }
}

// Smooth animation loop with spring physics
function animate() {
  const damping = 0.08; // Lower = smoother (0.05-0.15 range)
  
  // Spring interpolation for smooth follow
  cursorX.value += (targetX.value - cursorX.value) * damping;
  cursorY.value += (targetY.value - cursorY.value) * damping;
  
  // Smooth rotation transition
  if (isMoving.value) {
    rotation.value += (accumulatedRotation.value - rotation.value) * 0.12;
  }
  
  animationId = requestAnimationFrame(animate);
}

let animationId: number;

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('cursor-none');
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";
  }
  useEventListener(window, "mousemove", smoothMouseMove);
  animationId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('cursor-none');
    document.documentElement.style.cursor = "auto";
    document.body.style.cursor = "auto";
  }
});
</script>
<style>
.cursor-none * {
  cursor: none !important;
}
</style>
