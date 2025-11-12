import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionDetails {
  el: Element
  color: string
  index: number
}

interface LiquidBgOptions {
  interactWithHeader?: boolean
}

export const useLiquidBackground = (options: LiquidBgOptions = {}) => {
  const sections = ref<SectionDetails[]>([])
  const bgElement = ref<HTMLElement | null>(null)
  const scrollTriggers = ref<ScrollTrigger[]>([])

  const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g)
    if (!result || result.length < 3) return '#000000'
    const r = parseInt(result[0], 10)
    const g = parseInt(result[1], 10)
    const b = parseInt(result[2], 10)
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  }

  const initSections = () => {
    const sectionElements = document.querySelectorAll('[data-liquid-bg-section]')
    console.log('Found sections:', sectionElements.length)
    
    sectionElements.forEach((el, index) => {
      const style = getComputedStyle(el)
      let bgColor = style.backgroundColor
      
      // Convert rgb to hex for consistency
      if (bgColor.includes('rgb')) {
        bgColor = rgbToHex(bgColor)
      }

      console.log(`Section ${index}:`, bgColor, el)
      sections.value.push({
        el,
        color: bgColor,
        index,
      })
    })
  }

  const createBgElement = () => {
    const wrapper = document.createElement('div')
    wrapper.id = 'lqd-liquid-bg-wrapper'
    wrapper.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `

    const bg = document.createElement('div')
    bg.id = 'lqd-liquid-bg-element'
    bg.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
    `

    wrapper.appendChild(bg)
    document.body.appendChild(wrapper)
    bgElement.value = bg
    console.log('Background element created')

    return bg
  }

  const setupScrollTriggers = () => {
    if (sections.value.length === 0) {
      console.warn('No sections found')
      return
    }

    const bg = bgElement.value
    if (!bg) {
      console.warn('Background element not found')
      return
    }

    sections.value.forEach((section, i) => {
      const timeline = gsap.timeline()
      
      const fromColor = i === 0 
        ? section.color 
        : sections.value[i - 1].color

      const toColor = section.color

      console.log(`Setting up animation ${i}:`, fromColor, '->', toColor)

      timeline.fromTo(
        bg,
        { backgroundColor: fromColor },
        {
          backgroundColor: toColor,
          duration: 1,
        },
        0
      )

      const trigger = ScrollTrigger.create({
        trigger: section.el as Element,
        animation: timeline,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        markers: false,
        onUpdate: (self) => {
          console.log(`Animation ${i} progress:`, self.progress.toFixed(2))
        },
      })

      scrollTriggers.value.push(trigger)
    })
    
    console.log('ScrollTriggers set up:', scrollTriggers.value.length)
  }

  const init = async () => {
    console.log('Initializing liquid background...')
    
    if (typeof window === 'undefined') return

    // Wait a bit for DOM to settle
    await new Promise(resolve => setTimeout(resolve, 500))

    initSections()
    createBgElement()
    setupScrollTriggers()
    
    console.log('Liquid background initialized')
  }

  const cleanup = () => {
    scrollTriggers.value.forEach(trigger => trigger.kill())
    scrollTriggers.value = []
    
    if (bgElement.value?.parentElement) {
      bgElement.value.parentElement.remove()
    }
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    sections,
    bgElement,
    init,
    cleanup,
  }
}
