<template>
  <div class="cursor">
    <div class="cursor__circle cursor__circle--small">
      <span class="cursor__text"></span>
    </div>
    <div class="cursor__circle cursor__circle--large"></div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const La = (t, e, r) => t + (e - t) * r;

let cursorArea, cursorSmall, cursorLarge, cursorText;
let smallPos = { x: window.innerWidth / 2, y: window.innerHeight + 50 };
let largePos = { x: window.innerWidth / 2, y: window.innerHeight + 50 };
let mousePos = { x: window.innerWidth / 2, y: window.innerHeight + 50 };
let prevMousePos = { x: window.innerWidth / 2, y: window.innerHeight + 50 };
let rotation = 0;
let targetRotation = 0;

function updateCursor() {
  if (!cursorSmall || !cursorLarge) return;
  
  // Calculate velocity for rotation
  const deltaX = mousePos.x - prevMousePos.x;
  const deltaY = mousePos.y - prevMousePos.y;
  const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // Calculate angle based on movement direction
  if (velocity > 0.5) {
    targetRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }
  
  // Smooth rotation interpolation
  rotation = La(rotation, targetRotation, 0.1);
  
  // Update positions
  smallPos.x = La(smallPos.x, mousePos.x, 0.2);
  smallPos.y = La(smallPos.y, mousePos.y, 0.2);
  largePos.x = La(largePos.x, mousePos.x, 0.1);
  largePos.y = La(largePos.y, mousePos.y, 0.1);

  // Apply transforms with rotation
  gsap.set(cursorSmall, { 
    x: smallPos.x, 
    y: smallPos.y,
    rotation: rotation
  });
  gsap.set(cursorLarge, { 
    x: largePos.x, 
    y: largePos.y,
    rotation: rotation * 0.5  // Half rotation for subtle effect
  });
  
  // Store previous position
  prevMousePos.x = mousePos.x;
  prevMousePos.y = mousePos.y;
}

function handleMouseMove(event) {
  mousePos.x = event.clientX;
  mousePos.y = event.clientY;
}

function handlePointerEnter(event) {
  if (!cursorArea || !cursorText) return;

  const pointerType = event.target.getAttribute("data-pointer");
  const pointerText = event.target.getAttribute("data-pointer-text");

  cursorArea.classList.add("is--hover");

  if (pointerType === "simple") {
    gsap.to(cursorLarge, { scale: 2, opacity: 1, duration: 0.3 });
    gsap.to(cursorSmall, { scale: 0, opacity: 0, duration: 0.3 });
  } else if (pointerType === "link") {
    cursorText.innerText = pointerText;
    gsap.to(cursorLarge, { scale: 2, opacity: 1, duration: 0.3 });
    gsap.to(cursorSmall, { scale: 7, opacity: 1, duration: 0.3 });
  }
}

function handlePointerLeave() {
  if (!cursorArea || !cursorText) return;

  cursorText.innerText = "";
  cursorArea.classList.remove("is--hover");

  gsap.to(cursorLarge, { scale: 1, opacity: 1, duration: 0.3 });
  gsap.to(cursorSmall, { scale: 1, opacity: 1, duration: 0.3 });
}

function addPointerEvents() {
  document.querySelectorAll("[data-pointer]").forEach((element) => {
    element.addEventListener("mouseenter", handlePointerEnter);
    element.addEventListener("mouseleave", handlePointerLeave);
  });
}

function removePointerEvents() {
  document.querySelectorAll("[data-pointer]").forEach((element) => {
    element.removeEventListener("mouseenter", handlePointerEnter);
    element.removeEventListener("mouseleave", handlePointerLeave);
  });
}

function initCursor() {
  cursorArea = document.querySelector(".cursor");
  cursorSmall = document.querySelector(".cursor__circle--small");
  cursorLarge = document.querySelector(".cursor__circle--large");
  cursorText = document.querySelector(".cursor__text");

  if (cursorArea) {
    gsap.set(cursorArea, { opacity: 1 });
    window.addEventListener("mousemove", handleMouseMove);
    addPointerEvents();
    gsap.ticker.add(updateCursor);
  } else {
    console.error("Cursor elements not found in the DOM.");
  }
}

function destroyCursor() {
  if (cursorArea) {
    window.removeEventListener("mousemove", handleMouseMove);
    removePointerEvents();
    gsap.ticker.remove(updateCursor);
  }
}

function disableCursor() {
  destroyCursor();
  if (cursorArea) cursorArea.classList.add("cursor--hide");
}

onMounted(() => {
  initCursor();
});

onUnmounted(() => {
  destroyCursor();
});
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
  width: 10px;
  transition: transform 0.1s ease-out
}

.cursor__circle--large {
  border: 1px solid var(--cursor-large);
  height: 40px;
  width: 40px;
  transition: transform 0.1s ease-out
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