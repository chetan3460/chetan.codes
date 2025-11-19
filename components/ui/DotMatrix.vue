<script setup lang="ts">
import { computed } from 'vue'
import * as THREE from 'three'
import Shader from './Shader.vue'

const props = withDefaults(defineProps<{
  colors?: number[][]
  opacities?: number[]
  totalSize?: number
  dotSize?: number
  shader?: string
  center?: ('x' | 'y')[]
  maxFps?: number
}>(), {
  colors: () => [[0, 0, 0]],
  opacities: () => [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize: 4,
  dotSize: 2,
  shader: '',
  center: () => ['x', 'y'],
  maxFps: 60,
})

// Build the 6-color array like the React demo
const colorVectors = computed(() => {
  let arr: number[][] = [
    props.colors[0], props.colors[0], props.colors[0],
    props.colors[0], props.colors[0], props.colors[0],
  ]
  if (props.colors.length === 2) {
    arr = [props.colors[0], props.colors[0], props.colors[0], props.colors[1], props.colors[1], props.colors[1]]
  } else if (props.colors.length === 3) {
    arr = [props.colors[0], props.colors[0], props.colors[1], props.colors[1], props.colors[2], props.colors[2]]
  }
  return arr.map(c => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255))
})

const uniforms = computed(() => ({
  u_colors: { value: colorVectors.value },
  u_opacities: { value: props.opacities }, // expect length 10
  u_total_size: { value: props.totalSize },
  u_dot_size: { value: props.dotSize },
}))

const xCenterLine = computed(() =>
  props.center.includes('x')
    ? 'st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));'
    : ''
)
const yCenterLine = computed(() =>
  props.center.includes('y')
    ? 'st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));'
    : ''
)

const fragmentSource = computed(() => `
precision mediump float;
in vec2 fragCoord;

uniform float u_time;
uniform float u_opacities[10];
uniform vec3 u_colors[6];
uniform float u_total_size;
uniform float u_dot_size;
uniform vec2 u_resolution;

out vec4 fragColor;

float PHI = 1.61803398874989484820459;
float random(vec2 xy) {
  return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
}
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  vec2 st = fragCoord.xy;
  ${xCenterLine.value}
  ${yCenterLine.value}

  float opacity = step(0.0, st.x);
  opacity *= step(0.0, st.y);

  vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

  float frequency = 5.0;
  float show_offset = random(st2);
  float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
  opacity *= u_opacities[int(rand * 10.0)];
  opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
  opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

  vec3 color = u_colors[int(show_offset * 6.0)];

  ${props.shader}

  fragColor = vec4(color, opacity);
  fragColor.rgb *= fragColor.a;
}
`)
</script>

<template>
  <Shader :source="fragmentSource" :uniforms="uniforms" :max-fps="maxFps" />
</template>