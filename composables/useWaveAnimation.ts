import { ref, onMounted, onUnmounted, type Ref } from "vue";
import gsap from "gsap";
import { createNoise3D } from "simplex-noise";
import { useReducedMotion } from "./useReducedMotion";

interface WaveColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface WaveParameters {
  factor: number;
  variation: number;
  amplitude: number;
  lines: number;
  lineDelay: number;
  lineRandomDelay: number;
  lineStroke: number;
  speed: number;
  progressDuration: number;
  progressEasing: string;
  waveColorDuration: number;
  waveColorAnimation: number;
  waveColor: WaveColor;
  waveColors: Record<string, WaveColor[]>;
}

interface WaveState {
  width: number;
  height: number;
  currentTheme: string;
  colorIndex: number;
  randomness: number[];
  lineDelays: number[];
  introProgress: number;
  isAnimating: boolean;
  isInViewport: boolean;
  lastFrameTime: number;
  lastElapsedTime: number;
  targetFPS: number;
}

interface Cursor {
  x: number;
  y: number;
}

/**
 * Wave Animation Manager - Singleton pattern for managing canvas-based wave animations
 * Handles: noise generation, parallax effects, theme-based colors, viewport detection
 */
class WaveAnimationManager {
  private static instance: WaveAnimationManager | null = null;

  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private noise3D: (x: number, y: number, z: number) => number;
  private parameters: WaveParameters;
  private state: WaveState;
  private cursor: Cursor;
  private animationFrameId: number | null = null;
  private eventListeners: Map<string, EventListener> = new Map();
  private prefersReducedMotion: Ref<boolean>;

  static getInstance(): WaveAnimationManager {
    if (!WaveAnimationManager.instance) {
      WaveAnimationManager.instance = new WaveAnimationManager();
    }
    return WaveAnimationManager.instance;
  }

  private constructor() {
    const { prefersReducedMotion } = useReducedMotion();
    this.prefersReducedMotion = prefersReducedMotion;
    
    this.noise3D = createNoise3D(Math.random);

    this.parameters = {
      factor: 0.071,
      variation: 6e-4,
      amplitude: 300,
      lines: 15,
      lineDelay: 0.005,
      lineRandomDelay: 0.15,
      lineStroke: 1,
      speed: 0.003,
      progressDuration: 2,
      progressEasing: "sine.inOut",
      waveColorDuration: 5,
      waveColorAnimation: 8,
      waveColor: { r: 255, g: 29, b: 72, a: 1 },
      waveColors: {
        "theme-dark": [
          { r: 255, g: 29, b: 72, a: 1 },
          { r: 81, g: 244, b: 94, a: 1 },
          { r: 242, g: 77, b: 7, a: 1 },
          { r: 15, g: 197, b: 250, a: 1 },
          { r: 232, g: 67, b: 215, a: 1 }
        ],
        "theme-green": [
          { r: 81, g: 244, b: 94, a: 1 },
          { r: 56, g: 242, b: 83, a: 1 },
          { r: 149, g: 245, b: 84, a: 1 },
          { r: 15, g: 239, b: 157, a: 1 }
        ],
        "theme-orange": [
          { r: 242, g: 137, b: 17, a: 1 },
          { r: 245, g: 231, b: 103, a: 1 },
          { r: 217, g: 255, b: 3, a: 1 },
          { r: 242, g: 77, b: 7, a: 1 }
        ],
        "theme-blue": [
          { r: 15, g: 197, b: 250, a: 1 },
          { r: 29, g: 224, b: 237, a: 1 },
          { r: 72, g: 119, b: 239, a: 1 },
          { r: 85, g: 150, b: 247, a: 1 }
        ],
        "theme-violet": [
          { r: 216, g: 133, b: 237, a: 1 },
          { r: 162, g: 43, b: 237, a: 1 },
          { r: 221, g: 50, b: 142, a: 1 },
          { r: 252, g: 0, b: 211, a: 1 }
        ],
        "theme-light": [
          { r: 255, g: 29, b: 72, a: 1 },
          { r: 148, g: 51, b: 194, a: 1 },
          { r: 50, g: 167, b: 193, a: 1 },
          { r: 79, g: 193, b: 50, a: 1 },
          { r: 239, g: 132, b: 131, a: 1 }
        ]
      }
    };

    this.state = {
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
      currentTheme: "theme-dark",
      colorIndex: 0,
      randomness: [],
      lineDelays: [],
      introProgress: 0,
      isAnimating: false,
      isInViewport: false,
      lastFrameTime: 0,
      lastElapsedTime: 0,
      targetFPS: 120
    };

    this.cursor = {
      x: 0,
      y: 0
    };
  }

  /**
   * Initialize the wave animation
   */
  init(): boolean {
    try {
      this.canvas = document.querySelector(".hero-header__canvas");
      if (!this.canvas) {
        return false;
      }

      this.context = this.canvas.getContext("2d");
      if (!this.context) {
        return false;
      }

      this.setSizes();
      this.setupCanvas();
      this.setupRandomness();
      this.attachEventListeners();

      return true;
    } catch (error) {
      console.error('Error initializing wave animation:', error);
      return false;
    }
  }

  private setSizes(): void {
    if (typeof window === 'undefined') return;
    
    this.state.width = window.innerWidth;
    this.state.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.state.width;
      this.canvas.height = this.state.height;
    }
  }

  private setupCanvas(): void {
    if (!this.canvas || !this.context) return;
    
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    this.canvas.width = this.state.width * pixelRatio;
    this.canvas.height = this.state.height * pixelRatio;
    this.context.scale(pixelRatio, pixelRatio);
  }

  private setupRandomness(): void {
    const { lines, factor, lineRandomDelay } = this.parameters;
    this.state.randomness = new Array(lines);
    this.state.lineDelays = new Array(lines);

    for (let i = 0; i < lines; i++) {
      this.state.randomness[i] = i * factor;
      this.state.lineDelays[i] = i * lineRandomDelay;
    }
  }

  /**
   * Attach event listeners (stored for cleanup)
   */
  private attachEventListeners(): void {
    const handleMouseMove = this.handleMouseMove.bind(this);
    const handleMouseLeave = this.handleMouseLeave.bind(this);
    const handleResize = this.handleResize.bind(this);

    this.eventListeners.set("mousemove", handleMouseMove);
    this.eventListeners.set("mouseleave", handleMouseLeave);
    this.eventListeners.set("resize", handleResize);

    if (this.canvas) {
      this.canvas.addEventListener("mousemove", handleMouseMove);
      this.canvas.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("resize", handleResize);
  }

  private handleMouseMove = (event: Event): void => {
    if (!this.canvas) return;
    const mouseEvent = event as MouseEvent;
    const rect = this.canvas.getBoundingClientRect();
    const nx = (mouseEvent.clientX - rect.left) / rect.width * 2 - 1;
    const ny = (mouseEvent.clientY - rect.top) / rect.height * 2 - 1;
    this.cursor.x = Math.max(-1, Math.min(1, nx));
    this.cursor.y = Math.max(-1, Math.min(1, ny));
  };

  private handleMouseLeave = (): void => {
    this.cursor.x = 0;
    this.cursor.y = 0;
  };

  private handleResize = (): void => {
    this.setSizes();
    this.setupCanvas();
  };

  /**
   * Calculate parallax effect based on cursor position and normalized value
   */
  private calculateParallaxEffect(t: number): { parallaxEffect: number; perspectiveY: number } {
    const parallaxEffect = this.cursor.x * t * this.parameters.amplitude * 0.5;
    const perspectiveY = this.cursor.y * t * this.parameters.amplitude * 0.5;
    return { parallaxEffect, perspectiveY };
  }

  /**
   * Draw wave paths using noise and parallax
   */
  private drawPaths(): void {
    if (!this.context) return;

    const {
      lineStroke,
      lines,
      amplitude,
      variation,
      speed,
      waveColor
    } = this.parameters;

    const { randomness, lineDelays, introProgress } = this.state;

    this.context.lineWidth = lineStroke;

    for (let i = 0; i <= lines; i++) {
      this.context.beginPath();
      this.context.moveTo(0, this.state.height / 2);

      const t = i / lines * 2 - 1;
      const { parallaxEffect, perspectiveY } = this.calculateParallaxEffect(t);

      let noiseValue = 0;
      const drawWidth = this.state.width * Math.max(introProgress - lineDelays[i], 0);
      const points: { x: number; y: number }[] = [];

      for (let x = 0; x <= drawWidth; x++) {
        noiseValue = this.noise3D(
          x * variation + randomness[i],
          x * variation,
          1
        );

        points.push({
          x,
          y: this.state.height / 2 + amplitude * noiseValue + perspectiveY + parallaxEffect
        });
      }

      points.forEach((point) => {
        this.context!.lineTo(point.x, point.y);
      });

      const alpha = Math.min(Math.abs(noiseValue) + 0.001, 0.3);
      this.context.strokeStyle = `rgba(${waveColor.r.toFixed(0)}, ${waveColor.g.toFixed(0)}, ${waveColor.b.toFixed(0)}, ${2 * alpha})`;
      this.context.stroke();
      this.context.closePath();

      randomness[i] += speed;
      if (lineDelays[i] > 0) {
        lineDelays[i] -= this.parameters.lineDelay;
      }
    }
  }

  /**
   * Update to next wave color
   */
  updateWaveColor(): void {
    const colorPalette = this.parameters.waveColors[this.state.currentTheme];
    if (!colorPalette) return;

    gsap.killTweensOf(this.parameters.waveColor);

    this.state.colorIndex = (this.state.colorIndex + 1) % colorPalette.length;
    const nextColor = colorPalette[this.state.colorIndex];

    gsap.to(this.parameters.waveColor, {
      r: nextColor.r,
      g: nextColor.g,
      b: nextColor.b,
      duration: this.parameters.waveColorDuration
    });
  }

  /**
   * Change theme and update colors
   */
  updateTheme(theme: string): void {
    if (this.state.currentTheme !== theme) {
      this.state.currentTheme = theme;
      this.state.colorIndex = -1;
      this.updateWaveColor();
    }
  }

  /**
   * Check if canvas is in viewport
   */
  private isInViewport(): boolean {
    if (!this.canvas) return false;
    const rect = this.canvas.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibility = visibleHeight / this.canvas.offsetHeight;
    return visibility >= 0.1;
  }

  /**
   * Animation loop with FPS throttling
   */
  private animate = (): void => {
    if (!this.state.isAnimating || !this.context) return;

    // Skip animations if user prefers reduced motion
    if (this.prefersReducedMotion.value) {
      return;
    }

    if (!this.isInViewport()) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    const now = performance.now();

    if (now - this.state.lastFrameTime < 1000 / this.state.targetFPS) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    this.state.lastFrameTime = now;
    const elapsed = now / 1000;
    const elapsedFloor = Math.floor(elapsed / this.parameters.waveColorAnimation);

    if (elapsedFloor > this.state.lastElapsedTime) {
      this.state.lastElapsedTime = elapsedFloor;
      this.updateWaveColor();
    }

    this.context.clearRect(0, 0, this.state.width, this.state.height);
    this.drawPaths();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  /**
   * Start the animation with intro progress
   */
  render(): void {
    if (this.state.isAnimating) return;

    // Skip animations if user prefers reduced motion
    if (this.prefersReducedMotion.value) {
      this.state.introProgress = 1;
      return;
    }

    gsap.to(this.state, {
      introProgress: 1,
      duration: this.parameters.progressDuration,
      ease: this.parameters.progressEasing
    });

    this.state.isAnimating = true;
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  /**
   * Stop the animation
   */
  stop(): void {
    this.state.isAnimating = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Complete cleanup
   */
  destroy(): void {
    this.stop();

    this.eventListeners.forEach((listener, event) => {
      if (this.canvas && (event === "mousemove" || event === "mouseleave")) {
        this.canvas.removeEventListener(event, listener);
      } else {
        window.removeEventListener(event, listener);
      }
    });
    this.eventListeners.clear();

    gsap.killTweensOf(this.state);
    gsap.killTweensOf(this.parameters.waveColor);

    this.context = null;
    this.canvas = null;
  }

  /**
   * Reset singleton instance
   */
  static reset(): void {
    if (WaveAnimationManager.instance) {
      WaveAnimationManager.instance.destroy();
      WaveAnimationManager.instance = null;
    }
  }
}

/**
 * Vue Composable for Wave Animation
 */
export function useWaveAnimation() {
  const manager = WaveAnimationManager.getInstance();
  const currentTheme = ref("theme-dark");

  const updateTheme = (newTheme: string): void => {
    currentTheme.value = newTheme;
    manager.updateTheme(newTheme);
  };

  const startAnimation = (): void => {
    manager.render();
  };

  const stopAnimation = (): void => {
    manager.stop();
  };

  onMounted(() => {
    const initialized = manager.init();
    if (initialized) {
      startAnimation();
    }
  });

  onUnmounted(() => {
    manager.destroy();
  });

  return {
    updateTheme,
    startAnimation,
    stopAnimation,
    manager
  };
}
