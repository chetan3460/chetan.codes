<template>
  <div :class="cn('relative z-[3]', className)" :style="gridStyle">
    <div v-for="(idx) in cells" :key="idx" :class="cn(
      'cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 ',
      clickedCell && 'animate-cell-ripple [animation-fill-mode:none]',
      !interactive && 'pointer-events-none'
    )" :style="{
      backgroundColor: fillColor,
      borderColor: borderColor,
      ...cellStyle(idx)
    }" @click="interactive ? handleClick(idx) : undefined" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 7
  },
  cols: {
    type: Number,
    default: 30
  },
  cellSize: {
    type: Number,
    default: 56
  },
  borderColor: {
    type: String,
    default: '#3f3f46'
  },
  fillColor: {
    type: String,
    default: 'rgba(14,165,233,0.3)'
  },
  clickedCell: {
    type: Object,
    default: null
  },
  interactive: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['cellClick'])

const cells = computed(() => Array.from({ length: props.rows * props.cols }, (_, idx) => idx))

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.cols}, ${props.cellSize}px)`,
  gridTemplateRows: `repeat(${props.rows}, ${props.cellSize}px)`,
  width: props.cols * props.cellSize,
  height: props.rows * props.cellSize,
  marginInline: 'auto'
}))

const rowIdx = (idx) => Math.floor(idx / props.cols)
const colIdx = (idx) => idx % props.cols

const distance = (idx) => {
  if (!props.clickedCell) return 0
  const row = rowIdx(idx)
  const col = colIdx(idx)
  return Math.hypot(props.clickedCell.row - row, props.clickedCell.col - col)
}

const cellStyle = (idx) => {
  if (!props.clickedCell) return {}

  const dist = distance(idx)
  const delay = Math.max(0, dist * 55) // ms
  const duration = 200 + dist * 80 // ms

  return {
    '--delay': `${delay}ms`,
    '--duration': `${duration}ms`
  }
}

const handleClick = (idx) => {
  if (!props.interactive) return
  const row = rowIdx(idx)
  const col = colIdx(idx)
  emit('cellClick', row, col)
}
</script>

<style scoped>
@keyframes cell-ripple {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}

.animate-cell-ripple {
  animation: cell-ripple var(--duration, 200ms) ease-out;
  animation-delay: var(--delay, 0ms);
}
</style>