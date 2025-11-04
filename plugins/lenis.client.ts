import Lenis from 'lenis'

let lenisInstance: Lenis | null = null
let rafId: number | null = null

export default defineNuxtPlugin(() => {
  // Prevent duplicate instances during HMR
  if (lenisInstance) {
    return {
      provide: {
        lenis: lenisInstance,
      },
    }
  }

  const lenis = new Lenis({
    lerp: 0.1, // Adjust smoothness (lower = smoother)
    smooth: true,
    infinite: false,
  })

  function raf(time: number) {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)
  lenis.start()

  lenisInstance = lenis

  // Cleanup on hot module replacement
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      lenis.destroy()
      lenisInstance = null
    })
  }

  return {
    provide: {
      lenis,
    },
  }
})
