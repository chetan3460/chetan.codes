# Data-Effect6 Animation - Implementation Guide

This document contains all the code needed to implement the `data-effect6` typography animation from the OnScrollTypographyAnimations project.

## Overview
The effect creates a 3D rotation animation on text characters that appear to flip in from below as you scroll.

## Dependencies Required

### NPM Packages
```bash
npm install gsap @studio-freight/lenis splitting
```

Or add to your package.json:
```json
{
  "dependencies": {
    "@studio-freight/lenis": "^1.0.0",
    "gsap": "^3.12.0",
    "splitting": "^1.0.6"
  }
}
```

## HTML Structure

```html
<h2 
  class="content__title content__title--small" 
  data-splitting 
  data-effect6
>
  <span class="font-3">About Me</span>
  <span class="font-6">flowers</span>
</h2>
```

## CSS

### Base Styles
```css
/* Required for splitting.js */
.splitting .word {
  white-space: nowrap;
}

/* Title base styles */
.content__title {
  font-size: 12vw;
  line-height: 0.8;
  text-align: center;
  display: grid;
  gap: 2rem;
}

.content__title--small {
  /* Add any size variations if needed */
}

/* Font styles used in the example */
.font-3 {
  font-family: area-normal, sans-serif;
  font-weight: 600;
}

.font-6 {
  font-family: afronaut, sans-serif;
  font-weight: 400;
}
```

## JavaScript Implementation

### Complete Implementation
```javascript
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

// Initialize Splitting.js
Splitting();

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
  const lenis = new Lenis({
    lerp: 0.2,
    smooth: true
  });

  lenis.on('scroll', () => ScrollTrigger.update());

  const scrollFn = (time) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };
  
  requestAnimationFrame(scrollFn);
};

// Effect 6 Animation
const initEffect6 = () => {
  const fx6Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect6]')];
  
  fx6Titles.forEach(title => {
    const words = title.querySelectorAll('.word');
    
    for (const word of words) {
      const chars = word.querySelectorAll('.char');

      // Set perspective on parent elements
      chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 

      // Animate characters
      gsap.fromTo(chars, { 
        'will-change': 'opacity, transform', 
        opacity: 0, 
        rotationX: -90,
        yPercent: 50
      },
      {
        ease: 'power1.inOut',
        opacity: 1,
        rotationX: 0,
        yPercent: 0,
        stagger: {
          each: 0.03,
          from: 0
        },
        scrollTrigger: {
          trigger: word,
          start: 'center bottom+=40%',
          end: 'bottom center-=30%',
          scrub: 0.9
        }
      });
    }
  });
};

// Initialize everything
const init = () => {
  initSmoothScrolling();
  initEffect6();
};

// Call init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

### Simplified Version (Without Lenis)
If you don't want smooth scrolling:

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

// Initialize Splitting.js
Splitting();

// Effect 6 Animation
const fx6Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect6]')];

fx6Titles.forEach(title => {
  const words = title.querySelectorAll('.word');
  
  for (const word of words) {
    const chars = word.querySelectorAll('.char');

    chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 

    gsap.fromTo(chars, { 
      'will-change': 'opacity, transform', 
      opacity: 0, 
      rotationX: -90,
      yPercent: 50
    },
    {
      ease: 'power1.inOut',
      opacity: 1,
      rotationX: 0,
      yPercent: 0,
      stagger: {
        each: 0.03,
        from: 0
      },
      scrollTrigger: {
        trigger: word,
        start: 'center bottom+=40%',
        end: 'bottom center-=30%',
        scrub: 0.9
      }
    });
  }
});
```

## Nuxt 3 Implementation

For your Nuxt project, create the following files:

### 1. Plugin: `plugins/splitting.client.ts`
```typescript
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      splitting: Splitting
    }
  };
});
```

### 2. Composable: `composables/useEffect6Animation.ts`
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useEffect6Animation = () => {
  const initEffect6 = () => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const fx6Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect6]')];
    
    fx6Titles.forEach(title => {
      const words = title.querySelectorAll('.word');
      
      for (const word of words) {
        const chars = word.querySelectorAll('.char');

        chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 

        gsap.fromTo(chars, { 
          'will-change': 'opacity, transform', 
          opacity: 0, 
          rotationX: -90,
          yPercent: 50
        },
        {
          ease: 'power1.inOut',
          opacity: 1,
          rotationX: 0,
          yPercent: 0,
          stagger: {
            each: 0.03,
            from: 0
          },
          scrollTrigger: {
            trigger: word,
            start: 'center bottom+=40%',
            end: 'bottom center-=30%',
            scrub: 0.9
          }
        });
      }
    });
  };

  return {
    initEffect6
  };
};
```

### 3. Component Usage: `components/AnimatedTitle.vue`
```vue
<template>
  <h2 
    ref="titleRef"
    class="content__title content__title--small" 
    data-splitting 
    data-effect6
  >
    <span class="font-3"><slot name="text1">About Me</slot></span>
    <span class="font-6"><slot name="text2">flowers</slot></span>
  </h2>
</template>

<script setup lang="ts">
const titleRef = ref<HTMLElement | null>(null);
const { $splitting } = useNuxtApp();
const { initEffect6 } = useEffect6Animation();

onMounted(() => {
  // Initialize Splitting.js
  if ($splitting) {
    $splitting();
  }
  
  // Initialize animation after a short delay to ensure Splitting has processed
  setTimeout(() => {
    initEffect6();
  }, 100);
});

onUnmounted(() => {
  // Clean up ScrollTrigger instances
  import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
});
</script>

<style scoped>
.content__title {
  font-size: 12vw;
  line-height: 0.8;
  text-align: center;
  display: grid;
  gap: 2rem;
}

.font-3 {
  font-family: system-ui, sans-serif;
  font-weight: 600;
}

.font-6 {
  font-family: system-ui, sans-serif;
  font-weight: 400;
}
</style>
```

### 4. Page Usage Example
```vue
<template>
  <div class="page">
    <div class="spacer" style="height: 100vh;"></div>
    
    <AnimatedTitle>
      <template #text1>Hello</template>
      <template #text2>World</template>
    </AnimatedTitle>
    
    <div class="content">
      <p>Your content here...</p>
    </div>
    
    <div class="spacer" style="height: 100vh;"></div>
  </div>
</template>

<script setup lang="ts">
// Component will auto-import in Nuxt
</script>
```

## Animation Parameters Explained

- **opacity: 0 → 1**: Characters fade in
- **rotationX: -90 → 0**: Characters rotate from 90° below to normal position
- **yPercent: 50 → 0**: Characters move up from 50% below
- **perspective: 2000**: Adds 3D depth to the rotation
- **ease: 'power1.inOut'**: Smooth easing function
- **stagger.each: 0.03**: 0.03s delay between each character
- **scrub: 0.9**: Animation tied to scroll with smoothing

## Customization Options

### Adjust Animation Speed
Change the `stagger.each` value:
```javascript
stagger: {
  each: 0.05, // Slower: more delay between characters
  from: 0
}
```

### Change Rotation Direction
Modify `rotationX` value:
```javascript
rotationX: 90, // Rotate from above instead of below
```

### Adjust Scroll Trigger Points
```javascript
scrollTrigger: {
  trigger: word,
  start: 'top bottom',      // When animation starts
  end: 'center center',     // When animation completes
  scrub: 0.9
}
```

### Different Stagger Patterns
```javascript
stagger: {
  each: 0.03,
  from: 'center'  // Options: 'start', 'center', 'end', 'edges', 'random', 0 (number index)
}
```

## Notes

1. Make sure to import the Splitting CSS files for proper text splitting
2. The `perspective` value creates the 3D effect - higher values = less pronounced perspective
3. The `scrub` value ties the animation to scroll - higher values = smoother/slower
4. Each word animates independently, creating a cascading effect
5. The animation uses `will-change` for better performance

## Browser Support

- Modern browsers with ES6+ support
- CSS transforms and perspective support required
- Intersection Observer API (for ScrollTrigger)
