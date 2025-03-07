import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { debounce } from "lodash";
import { createNoise3D } from "simplex-noise";

let canvas, context;
let noise3D = createNoise3D();
let animationFrameId = null;
let mouseX = 0, mouseY = 0;
let scrollY = 0; // Scroll rotation factor

const parameters = {
    factor: 0.071,
    variation: 6e-4,
    amplitude: 300,
    lines: 15,
    waveColor: { r: 255, g: 29, b: 72, a: 1 },
    speed: 0.5,
    mouseEffect: 0.5,
    scrollEffect: 50, // Rotation strength
    waveColors: {
        "theme-dark": [
            { r: 255, g: 29, b: 72, a: 1 },
            { r: 81, g: 244, b: 94, a: 1 },
            { r: 242, g: 77, b: 7, a: 1 },
            { r: 15, g: 197, b: 250, a: 1 },
            { r: 232, g: 67, b: 215, a: 1 }
        ]
    },
    waveColorDuration: 2
};

const currentTheme = ref("theme-dark");
const randomness = Array(parameters.lines).fill(0).map((_, i) => i * parameters.factor);

function initCanvas() {
    canvas = document.querySelector(".hero-header__canvas");
    if (!canvas) return;

    context = canvas.getContext("2d");
    handleResize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    animate();
}

function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = (event.clientX - rect.left) / canvas.width - 0.5;
    mouseY = (event.clientY - rect.top) / canvas.height - 0.5;
}

function handleScroll() {
    scrollY = window.scrollY / parameters.scrollEffect;
    gsap.to(canvas, { rotate: `${scrollY}deg`, duration: 1, ease: "power2.out" });
}

function drawWave(time) {
    if (!context) return;

    const { lines, waveColor, amplitude, variation, speed, mouseEffect } = parameters;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;

    for (let i = 0; i < lines; i++) {
        context.beginPath();
        for (let x = 0; x <= canvas.width; x++) {
            const noiseY = noise3D(
                x * variation + randomness[i] + mouseX * mouseEffect,
                x * variation,
                time * speed
            );

            const y = canvas.height / 2 + amplitude * noiseY + mouseY * amplitude * 0.3;

            if (x === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, 0.5)`;
        context.stroke();
        context.closePath();

        randomness[i] += speed * 0.002;
    }
}

function animate() {
    drawWave(performance.now() / 1000);
    animationFrameId = requestAnimationFrame(animate);
}

function handleResize() {
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    context.scale(pixelRatio, pixelRatio);
}

// ✅ Theme Update Function
function updateTheme(newTheme) {
    if (!parameters.waveColors[newTheme]) return;
    currentTheme.value = newTheme;
    gsap.to(parameters.waveColor, {
        r: parameters.waveColors[newTheme][0].r,
        g: parameters.waveColors[newTheme][0].g,
        b: parameters.waveColors[newTheme][0].b,
        duration: parameters.waveColorDuration
    });
}

export function useWaveAnimation() {
    onMounted(() => {
        initCanvas();
        window.addEventListener("resize", debounce(handleResize, 200));
    });

    onUnmounted(() => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
    });

    return { updateTheme }; // ✅ Now returning updateTheme
}
