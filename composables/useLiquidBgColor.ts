import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import tinycolor from 'tinycolor2'

gsap.registerPlugin(ScrollTrigger)

export const useLiquidBgColor = () => {
  let scrollTriggers: any[] = []
  let bgElement: HTMLElement | null = null

  const createBgElement = () => {
    if (bgElement) return bgElement

    bgElement = document.createElement('div')
    bgElement.className = 'lqd-liquid-bg-el-wrap lqd-overlay pointer-events-none z-index--1'
    bgElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      pointer-events: none;
      z-index: -1;
    `

    const innerBg = document.createElement('div')
    innerBg.className = 'lqd-liquid-bg-el'
    innerBg.style.cssText = `
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      pointer-events: none;
    `

    bgElement.appendChild(innerBg)
    document.body.appendChild(bgElement)

    return bgElement
  }

  const init = async () => {
    // Wait for DOM to be ready
    await new Promise(r => setTimeout(r, 1000))

    const mainContent = document.querySelector('main') as HTMLElement
    if (!mainContent) {
      console.error('Main content not found')
      return
    }

    const sections = Array.from(document.querySelectorAll('[data-liquid-bg-section]')) as HTMLElement[]
    if (sections.length === 0) {
      console.error('No sections with data-liquid-bg-section found')
      return
    }

    // Create background element
    createBgElement()
    const bgInner = bgElement?.querySelector('.lqd-liquid-bg-el') as HTMLElement

    if (!bgInner) {
      console.error('Background element not created')
      return
    }

    // Set main content and sections to transparent so liquid bg shows through
    mainContent.style.backgroundColor = 'transparent'
    sections.forEach(section => {
      section.style.backgroundColor = 'transparent'
    })

    // Get colors from each section (from data-bg-color attribute)
    const colors: any[] = []
    sections.forEach((section, idx) => {
      const bgColor = section.getAttribute('data-bg-color') || '#ffffff'
      console.log(`Section ${idx} bg color:`, bgColor)
      colors.push(bgColor)
    })

    // Set initial background
    if (colors.length > 0) {
      bgInner.style.backgroundColor = colors[0]
      applyColorToHeader(colors[0])
    }

    // Setup GSAP animations for each section
    sections.forEach((section, idx) => {
      const fromColor = idx === 0 ? colors[0] : colors[idx - 1]
      const toColor = colors[idx]

      const timeline = gsap.timeline()

      // Animate background color
      timeline.fromTo(
        bgInner,
        { backgroundColor: fromColor },
        { backgroundColor: toColor },
        0
      )

      // Create ScrollTrigger
      const trigger = ScrollTrigger.create({
        trigger: section,
        animation: timeline,
        start: idx === 0 ? 'top top' : 'top top',
        end: idx === 0 ? `+=${window.innerHeight}` : `+=${section.offsetHeight}`,
        scrub: 0.1,
        onUpdate: (self) => {
          // Get current interpolated color
          const progress = self.progress
          const from = tinycolor(fromColor)
          const to = tinycolor(toColor)
          const interpolated = tinycolor.mix(from, to, progress * 100)
          const currentColor = interpolated.toRgbString()
          
          // Update header color based on current background
          applyColorToHeader(currentColor)
          console.log(`Section ${idx} progress:`, self.progress.toFixed(2))
        }
      })

      scrollTriggers.push(trigger)
    })

    ScrollTrigger.refresh()
    console.log('✅ Liquid bg color initialized with', sections.length, 'sections')
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
            const key = Object.keys(operation)[0]
            const value = Object.values(operation)[0]
            if ((color as any)[key]) {
              color = (color as any)[key](value)
            }
          })
        }

        const finalColor = color.toRgbString()
        
        // For SVG elements - use dark contrasting color
        if (el.tagName && el.tagName.toLowerCase() === 'svg') {
          // Create dark contrasting color for visibility against pinwheel background
          const svgColor = tinycolor(finalColor).darken(30).toRgbString()
          const paths = el.querySelectorAll('path')
          paths.forEach((path: any) => {
            path.style.fill = svgColor
          })
          console.log('🎨 Applied SVG color:', svgColor)
        }
        // For div elements (like header__pinwheel)
        else if (el.tagName && el.tagName.toLowerCase() === 'div') {
          // Apply color same as calculated - fill with final color
          ;(el as HTMLElement).style.color = finalColor
          ;(el as HTMLElement).style.backgroundColor = finalColor
          ;(el as HTMLElement).style.borderColor = finalColor
          ;(el as HTMLElement).style.boxShadow = `0 0 20px ${finalColor}40, inset 0 0 10px ${finalColor}20`
          console.log('🎨 Applied pinwheel color:', finalColor)
        }
        // For text elements
        else {
          ;(el as HTMLElement).style.color = finalColor
        }
      })
    } catch (e) {
      console.error('Error parsing header options:', e)
    }
  }

  const cleanup = () => {
    scrollTriggers.forEach(trigger => trigger.kill())
    scrollTriggers = []
    if (bgElement && bgElement.parentNode) {
      bgElement.parentNode.removeChild(bgElement)
      bgElement = null
    }
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  return { init, cleanup }
}
