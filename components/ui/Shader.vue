<script setup lang="ts">
import { ref, shallowRef, computed, watchEffect, onBeforeUnmount } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useElementSize } from '@vueuse/core'

const props = withDefaults(defineProps<{
  source: string
  uniforms: Record<string, any>
  maxFps?: number
}>(), {
  maxFps: 60,
})

const container = ref<HTMLElement | null>(null)
const material = shallowRef<THREE.ShaderMaterial | null>(null)

const vertexShader = `
precision mediump float;
in vec2 coordinates;
uniform vec2 u_resolution;
out vec2 fragCoord;
void main(){
  float x = position.x;
  float y = position.y;
  gl_Position = vec4(x, y, 0.0, 1.0);
  fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
  fragCoord.y = u_resolution.y - fragCoord.y;
}
`

// Ensure u_time/u_resolution always exist, merge user uniforms
const mergedUniforms = computed(() => {
  const u = {
    ...props.uniforms,
    u_time: props.uniforms?.u_time ?? { value: 0 },
    u_resolution: props.uniforms?.u_resolution ?? { value: new THREE.Vector2(2, 2) },
  }
  return u
})

const { onLoop } = useRenderLoop()
const lastTime = { value: 0 }
onLoop(({ elapsed }) => {
  if (!material.value) return
  const now = elapsed
  if (now - lastTime.value < 1 / (props.maxFps ?? 60)) return
  lastTime.value = now
  material.value.uniforms.u_time.value = now
})

const { width, height } = useElementSize(container)
watchEffect(() => {
  if (!material.value) return
  const w = width.value || 0
  const h = height.value || 0
  // Match the React demo's *2 resolution behavior
  material.value.uniforms.u_resolution.value.set(w * 2, h * 2)
})

onBeforeUnmount(() => {
  if (material.value) material.value.dispose()
})
</script>

<template>
  <div ref="container" class="absolute inset-0 h-full w-full">
    <TresCanvas alpha antialias class="absolute inset-0 h-full w-full">
      <TresMesh>
        <TresPlaneGeometry :args="[2, 2]" />
        <TresShaderMaterial
          ref="material"
          :vertex-shader="vertexShader"
          :fragment-shader="source"
          :uniforms="mergedUniforms"
          :glslVersion="THREE.GLSL3"
          transparent
          :blending="THREE.CustomBlending"
          :blendSrc="THREE.SrcAlphaFactor"
          :blendDst="THREE.OneFactor"
        />
      </TresMesh>
    </TresCanvas>
  </div>
</template>