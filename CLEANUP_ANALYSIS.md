# Code Cleanup & Package Optimization Analysis

## 📦 Unused/Rarely-Used Packages to Remove

### High Priority (Not Used)
1. **`dat.gui`** - Only imported in `plugins/external-libs.client.ts` but never used in active components
   - Remove from: `package.json`, `plugins/external-libs.client.ts`
   - Impact: Saves ~50KB

2. **`lodash`** - No usage found anywhere in the codebase
   - Remove from: `package.json`
   - Impact: Saves ~70KB

3. **`motion-v`** - Only used in deprecated `SmoothCursor.vue` component (not active)
   - Remove from: `package.json`, `components/layout/SmoothCursor.vue`
   - Impact: Saves ~20KB

4. **`class-variance-authority`** - Not used in active components
   - Remove from: `package.json`
   - Impact: Saves ~15KB

### Medium Priority (Redundant)
5. **`@inspira-ui/plugins`** - Imported in `tailwind.config.ts` but not actually used
   - Remove from: `package.json`, `tailwind.config.ts`
   - Impact: Saves ~5KB

6. **`matter-js`** - Only used in `components/ui/FallingText.vue` (backup/unused component)
   - Keep if you plan to use FallingText component, otherwise remove
   - Impact: Saves ~200KB
   - Recommendation: **REMOVE** (not used in active sections)

7. **`three`** - Only used in `components/ui/ColorBends.vue` (unused component)
   - Keep if you plan to use ColorBends, otherwise remove
   - Impact: Saves ~500KB
   - Recommendation: **REMOVE** (not used in active sections)

8. **`ogl`** - Only used in `components/ui/Threads.vue` (unused component)
   - Keep if you plan to use Threads, otherwise remove
   - Impact: Saves ~50KB
   - Recommendation: **REMOVE** (not used in active sections)

## 🧹 Unused/Duplicate Composables to Remove

### Composables (Only 1 Active Needed)
- ❌ `useLiquidBackground.ts` - Older version, not used
- ❌ `useLiquidBackgroundHub.ts` - Older version, not used
- ❌ `useLiquidBg.ts` - Older version, not used
- ✅ `useLiquidBgColor.ts` - **KEEP** (active, in use)

### Other Unused Composables
- ✅ `useAnimations.js` - Used in Skills, About, Works sections
- ✅ `useHeroBanner.js` - Used in Banner component
- ✅ `useHeaderAnimation.ts` - Used in Header component
- ✅ `useWaveAnimation.js` - Used in WaveAnimation component

**Action:** Delete 3 liquid background composables

## 🔧 Code Cleanup Recommendations

### 1. Remove Unused Components
- `components/sections/Home/BannerBackup.vue` - Backup file, not used
- `components/ui/FallingText.vue` - Uses unused matter-js
- `components/ui/ColorBends.vue` - Uses unused three.js
- `components/ui/Threads.vue` - Uses unused ogl
- `components/layout/SmoothCursor.vue` - Uses unused motion-v (also SleekLineCursor is used instead)

### 2. Clean Up package.json
Current production bundle: **1.68 MB** → Can reduce to **~1.2 MB** after cleanup

### 3. Fix TypeScript Consistency
- Mix of `.js` and `.ts` files in composables
- Recommendation: Convert all to `.ts` or keep all as `.js`
- Current composables: 5 `.js` files, 4 `.ts` files

### 4. Remove Unused Plugins
- `plugins/external-libs.client.ts` - Loads dat.gui which is never used

### 5. ESLint Ignore Files
- `.eslintignore` and `.prettierignore` exist but dev dependencies aren't installed
- Run: `npm install -D eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier`

## 📋 Cleanup Steps

### Step 1: Remove Unused Packages
```bash
npm uninstall dat.gui lodash motion-v class-variance-authority matter-js three ogl @inspira-ui/plugins
```

### Step 2: Delete Unused Composables
```bash
rm composables/useLiquidBackground.ts
rm composables/useLiquidBackgroundHub.ts
rm composables/useLiquidBg.ts
```

### Step 3: Delete Unused Components
```bash
rm components/sections/Home/BannerBackup.vue
rm components/ui/FallingText.vue
rm components/ui/ColorBends.vue
rm components/ui/Threads.vue
rm components/layout/SmoothCursor.vue
```

### Step 4: Clean Up Plugins
Remove the unused import from `plugins/external-libs.client.ts` or delete it entirely.

### Step 5: Update tailwind.config.ts
Remove `@inspira-ui/plugins` setup call.

## ✨ Benefits
- **Bundle size reduction:** ~850KB (from 1.68 MB)
- **Cleaner codebase:** Easier to maintain
- **Fewer dependencies:** Less potential security vulnerabilities
- **Faster npm install:** Fewer packages to download
- **Better performance:** Unused code removed

## 🔍 Currently Used Packages (Keep)
- ✅ `nuxt`, `vue`, `vue-router` - Framework
- ✅ `gsap` - Animation library
- ✅ `tinycolor2` - Color manipulation
- ✅ `lenis` - Smooth scrolling
- ✅ `splitting` - Text splitting
- ✅ `simplex-noise` - Wave animation
- ✅ `@vueuse/core` - Vue utilities
- ✅ `clsx` + `tailwind-merge` - CSS utilities (used in `lib/utils.ts`)
- ✅ `@tailwindcss/vite` - Tailwind integration
- ✅ `@nuxtjs/google-fonts` - Font loading

## 📊 Summary
- **Packages to remove:** 8
- **Composables to remove:** 3
- **Components to remove:** 5
- **Expected size reduction:** 50% smaller node_modules, ~850KB bundle size reduction
