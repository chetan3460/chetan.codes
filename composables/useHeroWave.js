import { ref, onMounted, onUnmounted } from 'vue';
import { createNoise3D } from 'simplex-noise';

export function useWaveAnimation() {
    console.log("[useWaveAnimation] Initializing...");

    const cursor = ref(null);
    const container = ref(null);
    const marquee = ref(null);
    const scrollState = ref(null);
    const width = ref(0);
    const height = ref(0);
    const context = ref(null);
    const isAnimating = ref(false);
    const isInViewport = ref(false);
    const noise3D = createNoise3D();
    console.log("[useWaveAnimation] Noise function initialized:", noise3D);

    const parameters = {
        factor: 0.071,
        variation: 0.0006,
        amplitude: 300,
        lines: 15,
        lineDelay: 0.005,
        lineRandomDelay: 0.15,
        waveColor: { r: 255, g: 29, b: 72, a: 1 },
        lineStroke: 1,
        speed: 0.003,
    };
    console.log("[useWaveAnimation] Parameters set:", parameters);

    function resize() {
        if (typeof window !== 'undefined') {
            width.value = window.innerWidth;
            height.value = window.innerHeight;
            console.log("[useWaveAnimation] Resizing:", { width: width.value, height: height.value });

            if (container.value) {
                container.value.width = width.value;
                container.value.height = height.value;
                context.value = container.value.getContext("2d");
                context.value.scale(window.devicePixelRatio, window.devicePixelRatio);
                console.log("[useWaveAnimation] Canvas resized.");
            }
        }
    }

    function animate() {
        if (!isAnimating.value) return;
        console.log("[useWaveAnimation] Animation frame triggered.");

        if (context.value) {
            context.value.clearRect(0, 0, width.value, height.value);
        }
        requestAnimationFrame(animate);
    }

    onMounted(() => {
        console.log("[useWaveAnimation] Mounted.");
        container.value = document.querySelector(".hero-header__canvas");
        marquee.value = document.querySelector(".hero-header__slogan");
        scrollState.value = window.Ra?.getInstance();
        cursor.value = window.za?.getInstance();
        console.log("[useWaveAnimation] Elements selected:", { container: container.value, marquee: marquee.value });

        if (typeof window !== 'undefined') {
            window.addEventListener("resize", resize);
        }

        resize();
        isAnimating.value = true;
        animate();
    });

    onUnmounted(() => {
        console.log("[useWaveAnimation] Unmounted.");
        if (typeof window !== 'undefined') {
            window.removeEventListener("resize", resize);
        }
        isAnimating.value = false;
    });

    return {
        container,
        isAnimating,
    };
}
