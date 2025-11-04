export interface ImageParticlesOptions {
  image: string
  width?: number
  height?: number
  particleGap?: number
  particleSize?: number
  gravity?: number
  mouseForce?: number
  color?: string
  colorArr?: number[]
  initPosition?: 'random' | 'top' | 'left' | 'bottom' | 'right' | 'misplaced' | 'none'
  initDirection?: 'random' | 'top' | 'left' | 'bottom' | 'right' | 'none'
  fadePosition?: 'explode' | 'top' | 'left' | 'bottom' | 'right' | 'random' | 'none'
  renderer?: 'default' | 'webgl'
}

export class ImageParticles {
  constructor(canvas: HTMLCanvasElement, options?: ImageParticlesOptions)
  init(): void
  loadImage(): void
  drawImageToCanvas(img: HTMLImageElement): void
  createParticles(): void
  hexToRgb(hex: string): { r: number; g: number; b: number } | null
  getColorFromArray(arr: number[]): { r: number; g: number; b: number } | null
  setupEventListeners(): void
  animate(): void
  destroy(): void
}
