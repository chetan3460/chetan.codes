# Liquid Background Color Implementation

This document explains the liquid background color feature that has been added to chetan.codes.

## Overview

The liquid background color feature provides smooth, scroll-triggered background color transitions between sections. As you scroll through the page, the background color smoothly transitions from one section's color to the next, creating a fluid visual effect.

## Files Created/Modified

### New Files

1. **`composables/useLiquidBackground.ts`**
   - Vue 3 composable that handles all the scroll-triggered background color logic
   - Uses GSAP and ScrollTrigger for smooth animations
   - Automatically detects sections with `data-liquid-bg-section` attribute
   - Extracts background colors and calculates luminosity

2. **`components/BackgroundProvider.vue`**
   - Wrapper component that initializes the liquid background effect
   - Should wrap your main content
   - Creates the fixed background element behind content

### Modified Files

1. **`layouts/default.vue`**
   - Wrapped main content with `<BackgroundProvider>`
   - Imported the BackgroundProvider component

2. **Section Components** (all updated with background colors)
   - `components/sections/Home/Banner.vue` → `bg-black`
   - `components/sections/Home/About.vue` → `bg-slate-950`
   - `components/sections/Home/Quote.vue` → `bg-slate-900`
   - `components/sections/Home/Skills.vue` → `bg-slate-950`
   - `components/sections/Home/Process.vue` → `bg-black`
   - `components/sections/Home/Contact.vue` → `bg-slate-950`

3. **`package.json`**
   - Added `tinycolor2` dependency for color manipulation

## How It Works

1. **Initialization**: When the layout mounts, `BackgroundProvider` initializes the liquid background system
2. **Section Detection**: The composable finds all elements with `data-liquid-bg-section` attribute
3. **Color Extraction**: Extracts the computed background color from each section
4. **ScrollTrigger Setup**: Creates GSAP ScrollTrigger instances for each section
5. **Animation**: As you scroll:
   - When a section enters the viewport, its color is extracted
   - The fixed background smoothly transitions to that color
   - The animation is tied to scroll position with `scrub: 0.1` for smooth feel

## Color Scheme

Current colors used (customizable):
- **Banner**: `bg-black` (#000000)
- **About**: `bg-slate-950` (#030712)
- **Quote**: `bg-slate-900` (#111827)
- **Skills**: `bg-slate-950` (#030712)
- **Process**: `bg-black` (#000000)
- **Contact**: `bg-slate-950` (#030712)

## Customization

### Change Section Colors

1. Update the Tailwind class on any section component:
   ```vue
   <section class="content-section bg-your-color" data-liquid-bg-section>
   ```

2. Available Tailwind colors from your project (or define custom colors in your Tailwind config)

### Adjust Animation Speed

Edit `composables/useLiquidBackground.ts`, line 119:
```ts
scrub: 0.1,  // Increase for slower, decrease for faster transitions
```

### Add Luminosity Indicator

The composable calculates whether each section is "dark" or "light" for potential header text color changes. Future enhancement: use this to automatically adjust header text color based on background.

## Installation

Before running the dev server, install the new dependency:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Running

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then scroll through the page to see the liquid background color transitions!

## Technical Details

### Dependencies
- `gsap`: ^3.12.7 (already in project)
- `gsap/ScrollTrigger`: Included with GSAP
- `tinycolor2`: ^1.6.0 (newly added) - for color manipulation

### Browser Compatibility
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support
- No polyfills needed

### Performance Notes
- Uses fixed positioning for the background element (GPU accelerated)
- ScrollTrigger is optimized for performance
- Minimal DOM manipulation

## Troubleshooting

If you don't see the background color transitions:

1. **Clear cache**: `rm -rf .nuxt && npm run dev`
2. **Check sections have the attribute**: Verify all sections have `data-liquid-bg-section`
3. **Check background colors**: Sections must have explicit background colors (not transparent)
4. **Browser console**: Look for any errors in the browser console
5. **ScrollTrigger**: Make sure GSAP ScrollTrigger is properly registered

## Future Enhancements

1. Header text color changes based on section luminosity
2. Color manipulation (darken/brighten) options per section
3. Gradient background support
4. Animation easing customization
5. Mobile optimization (different speeds for mobile)

## Support

For issues or questions, refer to the composable implementation in `composables/useLiquidBackground.ts`
