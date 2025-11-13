import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import tinycolor from 'tinycolor2'

gsap.registerPlugin(ScrollTrigger)

export const useLiquidBgColor = () => {
  let scrollTriggers: any[] = []

  const init = async () => {
    // Wait for DOM to be ready
    await new Promise(r => setTimeout(r, 100))

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

    // Get colors from each section (from data-bg-color attribute)
    const colors: any[] = []
    sections.forEach((section, idx) => {
      const bgColor = section.getAttribute('data-bg-color') || '#ffffff'
      const sectionClass = section.className
      console.log(`Section ${idx}: class="${sectionClass}" bg-color="${bgColor}"`)
      colors.push(bgColor)
    })

    // Set initial background color on main tag immediately
    if (colors.length > 0) {
      const initialColor = colors[0]
      // Force clear any existing styles
      mainContent.style.removeProperty('background-color')
      // Set new color with important flag
      mainContent.style.setProperty('background-color', initialColor, 'important')
      console.log('🎨 Initial background set to main:', initialColor, '(from first section)')
      console.log('🎨 Main tag current bg after setting:', window.getComputedStyle(mainContent).backgroundColor)
      applyColorToHeader(initialColor)
      
      // Check again after a tiny delay
      setTimeout(() => {
        console.log('🎨 Main tag bg after 10ms:', window.getComputedStyle(mainContent).backgroundColor)
        console.log('🎨 Main tag inline style:', mainContent.style.backgroundColor)
      }, 10)
    }

    // Setup GSAP animations for each section transition
    for (let idx = 0; idx < sections.length - 1; idx++) {
      const section = sections[idx]
      const fromColor = colors[idx]
      const toColor = colors[idx + 1]
      
      // Use a .to tween so nothing is applied on creation
      const tween = gsap.to(mainContent, {
        backgroundColor: toColor,
        duration: 1,
        immediateRender: false,
      })

      // Create ScrollTrigger
      const trigger = ScrollTrigger.create({
        trigger: section,
        animation: tween,
        start: 'top top',
        end: `+=${section.offsetHeight}`,
        scrub: 0.1,
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
      console.log('✅ Liquid bg color initialized with', sections.length, 'sections')
    }, 200)
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
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  return { init, cleanup }
}
