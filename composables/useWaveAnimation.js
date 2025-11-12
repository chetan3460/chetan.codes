import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { createNoise3D } from "simplex-noise";

/**
 * Wave Animation Manager - Singleton pattern for managing canvas-based wave animations
 * Handles: noise generation, parallax effects, theme-based colors, viewport detection
 */
class WaveAnimationManager {
  static instance = null;

  static getInstance() {
    if (!WaveAnimationManager.instance) {
      WaveAnimationManager.instance = new WaveAnimationManager();
    }
    return WaveAnimationManager.instance;
  }

  constructor() {
    this.canvas = null;
    this.context = null;
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

    // State management
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
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

    // Cursor position for parallax
    this.cursor = {
      x: 0,
      y: 0
    };

    // Cleanup tracking
    this.animationFrameId = null;
    this.eventListeners = new Map();
  }

  /**
   * Initialize the wave animation
   */
  init() {
    console.log("[Wave Animation] Initializing...");
    this.canvas = document.querySelector(".hero-header__canvas");
    console.log("[Wave Animation] Canvas found:", this.canvas);
    if (!this.canvas) {
      console.warn("Canvas element '.hero-header__canvas' not found");
      return false;
    }

    this.context = this.canvas.getContext("2d");
    console.log("[Wave Animation] Context created:", !!this.context);
    this.setSizes();
    this.setupCanvas();
    this.setupRandomness();
    this.attachEventListeners();

    return true;
  }

  setSizes() {
    this.state.width = window.innerWidth;
    this.state.height = window.innerHeight;
    this.canvas.width = this.state.width;
    this.canvas.height = this.state.height;
  }

  setupCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    this.canvas.width = this.state.width * pixelRatio;
    this.canvas.height = this.state.height * pixelRatio;
    this.context.scale(pixelRatio, pixelRatio);
  }

  setupRandomness() {
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
  attachEventListeners() {
    const handleMouseMove = this.handleMouseMove.bind(this);
    const handleResize = this.handleResize.bind(this);

    this.eventListeners.set("mousemove", handleMouseMove);
    this.eventListeners.set("resize", handleResize);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
  }

  handleMouseMove = (event) => {
    const rect = this.canvas.getBoundingClientRect();
    this.cursor.x = (event.clientX - rect.left) / this.state.width * 2 - 1;
    this.cursor.y = (event.clientY - rect.top) / this.state.height * 2 - 1;
  };

  handleResize = () => {
    this.setSizes();
    this.setupCanvas();
  };

  /**
   * Calculate parallax effect based on cursor position and normalized value
   */
  calculateParallaxEffect(t) {
    const parallaxEffect =
      this.cursor.x * t * this.parameters.amplitude * 0.5;
    const perspectiveY =
      this.cursor.y * t * this.parameters.amplitude * 0.5;

    return { parallaxEffect, perspectiveY };
  }

  /**
   * Draw wave paths using noise and parallax
   */
  drawPaths() {
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
      const { parallaxEffect, perspectiveY } =
        this.calculateParallaxEffect(t);

      let noiseValue = 0;
      const drawWidth =
        this.state.width * Math.max(introProgress - lineDelays[i], 0);
      const points = [];

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
        this.context.lineTo(point.x, point.y);
      });

      const alpha = Math.min(Math.abs(noiseValue) + 0.001, 0.3);
      this.context.strokeStyle = `rgba(${waveColor.r.toFixed(0)}, ${waveColor.g.toFixed(
        0
      )}, ${waveColor.b.toFixed(0)}, ${2 * alpha})`;
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
  updateWaveColor() {
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
  updateTheme(theme) {
    if (this.state.currentTheme !== theme) {
      this.state.currentTheme = theme;
      this.state.colorIndex = -1;
      this.updateWaveColor();
    }
  }

  /**
   * Check if canvas is in viewport
   */
  isInViewport() {
    if (!this.canvas) return false;
    const rect = this.canvas.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibility = visibleHeight / this.canvas.offsetHeight;
    return visibility >= 0.1; // Stop if less than 10% visible
  }

  /**
   * Animation loop with FPS throttling
   */
  animate = () => {
    if (!this.state.isAnimating) return;

    // Check viewport and stop if out of view
    if (!this.isInViewport()) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    const now = performance.now();

    // FPS throttling
    if (now - this.state.lastFrameTime < 1000 / this.state.targetFPS) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    this.state.lastFrameTime = now;
    const elapsed = now / 1000;
    const elapsedFloor = Math.floor(elapsed / this.parameters.waveColorAnimation);

    // Update wave color every N seconds
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
  render() {
    if (this.state.isAnimating) return;

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
  stop() {
    this.state.isAnimating = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Complete cleanup
   */
  destroy() {
    this.stop();

    // Remove event listeners
    this.eventListeners.forEach((listener, event) => {
      window.removeEventListener(event, listener);
    });
    this.eventListeners.clear();

    // Kill all GSAP tweens related to this instance
    gsap.killTweensOf(this.state);
    gsap.killTweensOf(this.parameters.waveColor);

    this.context = null;
    this.canvas = null;
  }

  /**
   * Reset singleton instance
   */
  static reset() {
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

  const updateTheme = (newTheme) => {
    currentTheme.value = newTheme;
    manager.updateTheme(newTheme);
  };

  const startAnimation = () => {
    manager.render();
  };

  const stopAnimation = () => {
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
