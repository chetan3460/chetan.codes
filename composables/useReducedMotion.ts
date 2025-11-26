import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable to detect user's motion preferences
 * Respects prefers-reduced-motion media query for accessibility
 * 
 * @returns {Object} - Object containing prefersReducedMotion ref
 * 
 * @example
 * const { prefersReducedMotion } = useReducedMotion()
 * 
 * if (!prefersReducedMotion.value) {
 *   // Run animations
 * } else {
 *   // Show static content or simplified animations
 * }
 */
export const useReducedMotion = () => {
  const prefersReducedMotion = ref(false)
  let mediaQuery: MediaQueryList | null = null

  const updateMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
    prefersReducedMotion.value = e.matches
  }

  onMounted(() => {
    // Check if window is available (client-side only)
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      
      // Set initial value
      prefersReducedMotion.value = mediaQuery.matches

      // Listen for changes
      mediaQuery.addEventListener('change', updateMotionPreference)
    }
  })

  onUnmounted(() => {
    // Clean up event listener
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  })

  return {
    prefersReducedMotion,
  }
}
