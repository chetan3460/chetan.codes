import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import tinycolor from 'tinycolor2'

gsap.registerPlugin(ScrollTrigger)

// Toggle to visualize where each section transition starts/ends
const SHOW_MARKERS = false

export const useLiquidBgColor = () => {
  let scrollTriggers: any[] = []

  const init = async () => {
    try {
      // Wait for DOM to be ready
      await new Promise(r => setTimeout(r, 100))

      const mainContent = document.querySelector('main') as HTMLElement
      if (!mainContent) {
        return
      }

      const sections = Array.from(document.querySelectorAll('[data-liquid-bg-section]')) as HTMLElement[]
      if (sections.length === 0) {
        return
      }

    // Get colors from each section (from data-bg-color attribute)
    const colors: any[] = []
    sections.forEach((section) => {
      const bgColor = section.getAttribute('data-bg-color') || '#ffffff'
      colors.push(bgColor)
    })

    // Set initial background color on main tag immediately
    if (colors.length > 0) {
      const initialColor = colors[0]
      // Force clear any existing styles
      mainContent.style.removeProperty('background-color')
      // Set new color with important flag
      mainContent.style.setProperty('background-color', initialColor, 'important')
      applyColorToHeader(initialColor)
    }

    // Setup GSAP animations for each section transition (match Hub HTML behavior)
    for (let idx = 0; idx < sections.length - 1; idx++) {
      const currSection = sections[idx]
      const nextSection = sections[idx + 1]
      const fromColor = colors[idx]
      const toColor = colors[idx + 1]
      
      // Use a .to tween so nothing is applied on creation
      const tween = gsap.to(mainContent, {
        backgroundColor: toColor,
        duration: 1,
        ease: 'none',
        immediateRender: false,
      })

      // Create ScrollTrigger that starts when NEXT section hits bottom of viewport
      const trigger = ScrollTrigger.create({
        id: `bg-${idx}`,
        trigger: nextSection,             // next section controls transition
        animation: tween,
        start: 'top bottom',              // start when next section top reaches viewport bottom
        end: 'bottom bottom',             // end over next section height
        scrub: 0.1,
        markers: SHOW_MARKERS ? { startColor: 'cyan', endColor: 'magenta', indent: 20, fontSize: '12px' } : false,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: () => {
          // Read the actual current background color from the element
          const currentColor = (gsap.getProperty(mainContent, 'backgroundColor') as string) || toColor
          applyColorToHeader(currentColor)
        }
      })

      scrollTriggers.push(trigger)
    }

      // Delay refresh to ensure initial color stays set
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    } catch (error) {
      // Silently handle initialization errors
      console.error('Error initializing liquid background:', error)
    }
  }

  
  const applyColorToHeader = (bgColor: string) => {
    const header = document.querySelector('[data-liquid-bg="true"]') as HTMLElement
    if (!header) return

    const options = header.getAttribute('data-liquid-bg-options')
    if (!options) return

    try {
      const config = JSON.parse(options)
      if (!config.setBgTo || !config.manipulateColor) return

      // Get elements to apply color to
      const elements = document.querySelectorAll(config.setBgTo)
      
      elements.forEach((el: any) => {
        let color = tinycolor(bgColor)

        // Apply color manipulations
        if (config.manipulateColor && Array.isArray(config.manipulateColor)) {
          config.manipulateColor.forEach((operation: any) => {
            const keys = Object.keys(operation)
            const values = Object.values(operation)
            if (keys.length > 0 && values.length > 0) {
              const key = keys[0]
              const value = values[0]
              if ((color as any)[key]) {
                color = (color as any)[key](value)
              }
            }
          })
        }

        // Ensure the pinwheel background stays light
        const ensureLightColor = (c: string) => {
          let tc = tinycolor(c)
          if (!tc.isLight()) {
            tc = tc.lighten(40)
            if (!tc.isLight()) {
              tc = tinycolor('#f3f4f6') // fallback to a known light gray
            }
          }
          return tc.toRgbString()
        }

        const lightBg = ensureLightColor(color.toRgbString())
        
        // For SVG elements - use dark contrasting color relative to light background
        if (el.tagName && el.tagName.toLowerCase() === 'svg') {
          const svgColor = tinycolor(lightBg).darken(40).desaturate(20).toRgbString()
          const paths = el.querySelectorAll('path')
          paths.forEach((path: any) => {
            path.style.fill = svgColor
          })
        }
        // For div elements (like header__pinwheel)
        else if (el.tagName && el.tagName.toLowerCase() === 'div') {
          ;(el as HTMLElement).style.color = lightBg
          ;(el as HTMLElement).style.backgroundColor = lightBg
          ;(el as HTMLElement).style.borderColor = lightBg
          ;(el as HTMLElement).style.boxShadow = `0 0 20px ${lightBg}40, inset 0 0 10px ${lightBg}20`
        }
        // For text elements
        else {
          ;(el as HTMLElement).style.color = lightBg
        }
      })
    } catch (e) {
      // Error parsing header options - silent fail
    }
  }

  const cleanup = () => {
    scrollTriggers.forEach(trigger => trigger.kill())
    scrollTriggers = []
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  return { init, cleanup }
}
