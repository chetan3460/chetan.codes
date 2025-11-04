# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a creative portfolio website for Chetan Dhargalkar built with Nuxt 4 and Tailwind CSS 4. The site features advanced scroll-based animations using GSAP, smooth scrolling with Lenis, and an interactive wave canvas background using simplex-noise. The architecture emphasizes visual storytelling with text-splitting effects and scroll-triggered animations.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Generate static site
npm generate

# Code quality
npm run lint           # Check for linting issues
npm run lint:fix       # Auto-fix linting issues
npm run format         # Check code formatting
npm run format:write   # Auto-format code
npm run analyze        # Analyze production bundle size
```

### Setting Up Development Tools (First Time)

If you haven't installed linting/formatting tools yet:

```bash
npm i -D eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier
```

## Architecture

### Directory Structure

- **`pages/`** - Route pages (index.vue is the main page)
- **`components/sections/Home/`** - Section components for homepage (Banner, About, Skills, Process, Contact)
- **`components/layout/`** - Layout components (Header, Footer, Cursor)
- **`layouts/`** - Application layouts (default.vue wraps all pages)
- **`composables/`** - Reusable composition functions for animations and interactions
- **`plugins/`** - Client-side plugins that initialize libraries (Lenis, GSAP, Splitting.js, Simplex-noise)
- **`assets/css/`** - Global styles and Tailwind configuration
- **`public/`** - Static assets (images, JSON data, favicon)

### Key Technical Patterns

**SSR is disabled** (`ssr: false` in nuxt.config.ts) - this is a client-side rendered portfolio site.

**Plugins Architecture**: All animation libraries are registered as client-only plugins (`.client.ts` suffix) to prevent SSR issues:
- `lenis.client.ts` - Smooth scroll initialization with HMR-safe singleton pattern (provides `$lenis`)
- `splitting.client.ts` - Text splitting for character/word animations (provides `$splitting`)
- `gsap.client.ts` - Centralized GSAP and ScrollTrigger registration

**Plugin Injection Keys**:
- `$lenis` - Lenis smooth scroll instance
- `$splitting` - Splitting.js function for text animations

**Animation Composables**: The codebase uses a composable-based pattern for animations:
- `useAnimations.js` - Main animation orchestration (heading, content, list, about image animations)
- `useHeroBanner.js` - Hero section specific animations
- `useHeaderAnimation.ts` - Header reveal and scroll animations
- `useWaveAnimation.js` - Canvas wave background with mouse/scroll interactivity

**ScrollTrigger Pattern**: Most animations use GSAP's ScrollTrigger with scrubbing:
```javascript
scrollTrigger: {
  trigger: element,
  start: 'top 80%',
  end: 'bottom 50%',
  scrub: true,
}
```

**Splitting.js Integration**: Text animations rely on Splitting.js applied via `data-splitting` attribute. The `$splitting()` plugin must be called before animating `.char` or `.word` elements.

**Canvas Wave System**: The hero banner uses a custom wave animation (`useWaveAnimation.js`) that:
- Uses simplex-noise for organic wave generation
- Responds to mouse position and scroll
- Rotates the canvas based on scroll position
- Supports theme-based color transitions

### CSS Architecture

The project uses Tailwind CSS 4 with custom CSS variables for theming:
- Theme variables are defined in `assets/css/main.css` using `@theme` directive
- Custom properties for colors, fonts, and easing functions
- `.theme-dark` and `.theme-green` classes switch color schemes
- Lenis smooth scroll classes are defined globally

### Component Communication

Components are autonomous - they initialize their own animations in `onMounted` hooks. There's minimal prop passing; most state is managed through composables and GSAP timelines.

## Important Development Notes

### Animation Development
- Always call `$splitting()` before accessing `.char` or `.word` elements in animations
- Use `ScrollTrigger.refresh()` after dynamically adding animated elements
- Test animations at different scroll speeds - scrub values control animation smoothness
- Canvas animations use `requestAnimationFrame` - always clean up in `onUnmounted`

### GSAP Best Practices
- GSAP and ScrollTrigger are registered centrally in `plugins/gsap.client.ts` - do NOT register again in composables
- Set `will-change` properties for animated elements to optimize performance
- Use `gsap.set()` for initial states before animating
- **Always clean up ScrollTrigger instances in `onUnmounted`** to prevent memory leaks:
  ```javascript
  const scrollTriggers = []
  // Store ScrollTrigger when creating animations
  const tween = gsap.to(element, { scrollTrigger: {...} })
  if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger)
  
  onUnmounted(() => {
    scrollTriggers.forEach(st => st.kill())
  })
  ```
- Use `gsap.utils.toArray()` for selecting multiple elements

### Font Loading
Google Fonts (Cormorant Garamond & Outfit) are configured in nuxt.config.ts with:
- `download: true` - fonts are preloaded
- `inject: true` - automatically injected into `<head>`
- Display strategy: `swap`

### Debugging Animations
- GSAP ScrollTrigger markers can be enabled for debugging: `markers: true` in ScrollTrigger config
- Check `console.warn()` messages in composables - they indicate missing elements
- Wave animation parameters can be exposed via dat.gui (simplex-noise dependency suggests this was used)

## File Naming Conventions

- Vue components: PascalCase (e.g., `Banner.vue`)
- Composables: camelCase with `use` prefix (e.g., `useAnimations.js`)
- Plugins: kebab-case with `.client.ts` suffix for client-only
- CSS: kebab-case

## Recent Improvements

- ✅ GSAP registration centralized in `plugins/gsap.client.ts`
- ✅ Lenis plugin is HMR-safe with singleton pattern and RAF cleanup
- ✅ Added lint, format, and analyze scripts to package.json
- ✅ ScrollTrigger cleanup implemented in all composables to prevent memory leaks
- ✅ ESLint and Prettier configurations added with ignore files

## Known Issues/Considerations

- No TypeScript in composables - mixing `.js` and `.ts` files
- Commented code in nuxt.config.ts suggests recent Tailwind 4 migration
- Header component has commented debug logs
- Development tooling (ESLint, Prettier) needs to be installed separately
