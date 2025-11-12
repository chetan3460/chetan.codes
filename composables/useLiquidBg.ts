import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import tinycolor from 'tinycolor2'

gsap.registerPlugin(ScrollTrigger)

const updateHeaderColor = (luminosity: string) => {
  console.log('[updateHeaderColor] Called with luminosity:', luminosity)
  
  const header = document.querySelector('header') as HTMLElement
  if (!header) {
    console.warn('[useLiquidBg] Header not found')
    return
  }
  console.log('[updateHeaderColor] Header found')

  // Try different selectors to find all paths
  let allPaths = header.querySelectorAll('path[logo-fill]') as NodeListOf<SVGPathElement>
  console.log('[updateHeaderColor] Paths with logo-fill attr:', allPaths.length)
  
  if (allPaths.length === 0) {
    allPaths = header.querySelectorAll('path') as NodeListOf<SVGPathElement>
    console.log('[updateHeaderColor] Fallback - all paths found:', allPaths.length)
  }
  
  console.log('[updateHeaderColor] Total paths to update:', allPaths.length)

  if (luminosity === 'dark') {
    console.log('[updateHeaderColor] Setting DARK mode colors')
    if (allPaths.length > 0) {
      allPaths.forEach((path: any, idx: number) => {
        const dataType = path.getAttribute('data-type')
        const newColor = dataType === 'accent' ? '#60a5fa' : '#ffffff'
        path.setAttribute('style', `fill: ${newColor} !important`)
        console.log(`[updateHeaderColor] Dark - Path ${idx} (${dataType}) -> ${newColor}, style now:`, path.getAttribute('style'))
      })
    }
  } else {
    console.log('[updateHeaderColor] Setting LIGHT mode colors')
    if (allPaths.length > 0) {
      allPaths.forEach((path: any, idx: number) => {
        const dataType = path.getAttribute('data-type')
        const newColor = dataType === 'accent' ? '#3b82f6' : '#d1d5db'
        path.setAttribute('style', `fill: ${newColor} !important`)
        console.log(`[updateHeaderColor] Light - Path ${idx} (${dataType}) -> ${newColor}, style now:`, path.getAttribute('style'))
      })
    }
  }
}

export const useLiquidBg = () => {
  let scrollTriggers: any[] = []
  let colors: any[] = []
  let rowsRect: any[] = []
  let bgEl: HTMLElement | null = null

  const init = async () => {
    console.log('\n\n================================')
    console.log('🚀 useLiquidBg INITIALIZATION STARTED')
    console.log('================================\n')
    
    // Wait for everything to render
    await new Promise(r => setTimeout(r, 2000))

    const mainContent = document.querySelector('main') as HTMLElement
    if (!mainContent) {
      console.error('Main not found')
      return
    }
    console.log('✅ Main found:', mainContent)

    const sections = Array.from(document.querySelectorAll('[data-liquid-bg-section]'))
    console.log('\n📊 Sections found:', sections.length)
    sections.forEach((sec: any, idx: number) => {
      const color = sec.getAttribute('data-bg-color')
      const name = sec.getAttribute('class') || 'unknown'
      console.log(`  Section ${idx}: color=${color}, class=${name}`)
    })
    if (!sections.length) return

    // STEP 1: Get colors from data-bg-color attribute
    colors = []
    sections.forEach((sec: any) => {
      // Get color from data attribute
      let color = sec.getAttribute('data-bg-color') || '#000000'
      
      const luminosity = tinycolor(color).getLuminance() <= 0.4 ? 'dark' : 'light'
      
      colors.push({ color, luminosity })
      console.log('Section color:', color, '-> luminosity:', luminosity)
    })

    // Set initial background on the main container
    if (colors.length > 0) {
      (mainContent as HTMLElement).style.backgroundColor = colors[0].color
      updateHeaderColor(colors[0].luminosity)
      
    }

    // STEP 2: Get rects immediately (not via observer)
    rowsRect = sections.map((sec: any) => sec.getBoundingClientRect())
    console.log('Rects:', rowsRect)

    // STEP 3: Setup ScrollTriggers
    sections.forEach((section: any, loopIndex: number) => {
      const timeline = gsap.timeline()
      
      const fromColor = loopIndex === 0 
        ? colors[loopIndex].color 
        : colors[loopIndex - 1].color
      const toColor = colors[loopIndex].color

      console.log(`Animation ${loopIndex}: ${fromColor} -> ${toColor}`)

      // Animate main element background color
      timeline.fromTo(
        mainContent,
        { backgroundColor: fromColor },
        { backgroundColor: toColor },
        0
      )

      const trigger = ScrollTrigger.create({
        trigger: section,
        animation: timeline,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          const from = loopIndex === 0 ? tinycolor(colors[loopIndex].color) : tinycolor(colors[loopIndex - 1].color)
          const to = tinycolor(colors[loopIndex].color)
          const interpolated = tinycolor.mix(from, to, progress * 100)
          const luminance = interpolated.getLuminance()
          const luminosity = luminance <= 0.4 ? 'dark' : 'light'
          console.log(`[onUpdate] Section ${loopIndex}: progress=${progress.toFixed(2)}, luminance=${luminance.toFixed(3)}, luminosity=${luminosity}, color=${interpolated.toRgbString()}`)
          updateHeaderColor(luminosity)
        },
      })

      scrollTriggers.push(trigger)
    })

    ScrollTrigger.refresh()
    console.log('Triggers created:', scrollTriggers.length)
  }

  const cleanup = () => {
    scrollTriggers.forEach((t: any) => t.kill())
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
