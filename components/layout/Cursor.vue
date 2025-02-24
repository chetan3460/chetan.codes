<template>
  <div>
    <div class="cursor">
      <div class="cursor__circle cursor__circle--small">
        <span class="cursor__text"></span>
      </div>
      <div class="cursor__circle cursor__circle--large"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.cursor {
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  z-index: 98
}

.cursor--hide {
  display: none
}

.cursor__circle {
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%)
}

.cursor__circle--small {
  background-color: var(--cursor-small);
  height: 10px;
  width: 10px
}

.cursor__circle--large {
  border: 1px solid var(--cursor-large);
  height: 40px;
  width: 40px
}

.cursor__text {
  color: var(--cursor-text);
  opacity: 0;
  text-transform: uppercase;
  transform: scale(.11);
  transition: opacity .2s var(--ease-in-sine);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  white-space: nowrap
}

.cursor.is--hover .cursor__circle--small span {
  opacity: 1
}
</style>