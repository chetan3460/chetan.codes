import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import tinycolor from 'tinycolor2'

gsap.registerPlugin(ScrollTrigger)

export const useLiquidBackgroundHub = () => {
  const scrollTriggers: ScrollTrigger[] = []

  const init = async () => {
    if (typeof window === 'undefined') return

    // Wait for DOM and Vue render
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get main content element
    const mainEl = document.querySelector('main') as HTMLElement
    if (!mainEl) return

    // Get all sections
    const sections = Array.from(document.querySelectorAll('[data-liquid-bg-section]')) as HTMLElement[]
    if (sections.length === 0) return

    // Extract colors from sections
    const colors: string[] = []
    sections.forEach((section) => {
      const color = getComputedStyle(section).backgroundColor
      const hexColor = tinycolor(color).toHexString()
      colors.push(hexColor)
    })

    // Create animations
    sections.forEach((section, index) => {
      const fromColor = index === 0 ? colors[0] : colors[index - 1]
      const toColor = colors[index]

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
          markers: false,
        },
      })

      tl.fromTo(
        mainEl,
        { backgroundColor: fromColor },
        { backgroundColor: toColor },
        0
      )

      if (tl.scrollTrigger) {
        scrollTriggers.push(tl.scrollTrigger)
      }
    })

    // Refresh triggers
    ScrollTrigger.refresh()
  }

  const cleanup = () => {
    scrollTriggers.forEach((trigger) => trigger.kill())
    scrollTriggers.length = 0
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  return { init, cleanup }
}
