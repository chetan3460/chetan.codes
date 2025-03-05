import { SimplexNoise } from 'simplex-noise'; // ✅ Use named import
import gsap from 'gsap';

export function useWaveAnimation() {
    const container = ref(null);
    const marquee = ref(null);
    const noise3D = new SimplexNoise();
    const parameters = reactive({
        factor: 0.071,
        variation: 0.0006,
        amplitude: 300,
        lines: 15,
        waveColor: { r: 255, g: 29, b: 72, a: 1 },
        waveColors: {
            "theme-dark": [{ r: 255, g: 29, b: 72, a: 1 }, { r: 81, g: 244, b: 94, a: 1 }],
            "theme-light": [{ r: 50, g: 167, b: 193, a: 1 }, { r: 79, g: 193, b: 50, a: 1 }]
        },
        waveColorDuration: 5,
        speed: 0.003,
    });

    let context = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isAnimating = false;
    let colorIndex = 0;
    let lastFrameTime = 0;

    const setupCanvas = () => {
        context = container.value.getContext("2d");
        const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
        container.value.width = width * pixelRatio;
        container.value.height = height * pixelRatio;
        context.scale(pixelRatio, pixelRatio);
    };

    const drawPaths = () => {
        context.clearRect(0, 0, width, height);
        context.lineWidth = 1;

        for (let i = 0; i < parameters.lines; i++) {
            context.beginPath();
            context.moveTo(0, height / 2);

            for (let x = 0; x <= width; x++) {
                const y = height / 2 + parameters.amplitude * noise3D.noise3D(x * parameters.variation, 0, 1);
                context.lineTo(x, y);
            }

            const color = parameters.waveColor;
            context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
            context.stroke();
        }
    };

    const updateWaveColor = () => {
        const themeColors = parameters.waveColors["theme-dark"];
        gsap.to(parameters.waveColor, {
            r: themeColors[colorIndex].r,
            g: themeColors[colorIndex].g,
            b: themeColors[colorIndex].b,
            duration: parameters.waveColorDuration,
        });
        colorIndex = (colorIndex + 1) % themeColors.length;
    };

    const animate = () => {
        if (!isAnimating) return;
        const now = performance.now();
        if (now - lastFrameTime < 1000 / 60) {
            requestAnimationFrame(animate);
            return;
        }
        lastFrameTime = now;
        drawPaths();
        requestAnimationFrame(animate);
    };

    onMounted(() => {
        setupCanvas();
        isAnimating = true;
        animate();
    });

    onUnmounted(() => {
        isAnimating = false;
    });

    return { container, marquee };
}
