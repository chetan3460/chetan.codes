<template>

    <section class="hero-header">
        <canvas ref="container" class="hero-header__canvas"></canvas>
        <div class="hero-header__wrapper container grid">
            <div class="hero-header__slogan">
                <span class="hero-header__marquee">Creative Developer</span>
                <span class="hero-header__marquee">Creative Developer</span>
            </div>
            <div class="hero-header__bottom">
                <h1 class="hero-header__description" data-splitting>
                    Hey there, I’m Chetan Dhargalkar, Creative Developer <br />
                    based in Goa - India, dedicated to crafting <br />unforgettable experiences.
                </h1>
                <button class="hero-header__scroll" data-pointer="link" data-pointer-text="Scroll" title="Scroll Down"
                    aria-label="Scroll Down">
                    <span class="svg-data">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#000000" fill-rule="nonzero"
                                d="M8.5623 31.8141 22.021 45.2745c1.254 1.2496 3.2815 1.2496 4.5312 0L40.0125 31.814c1.2541-1.254 1.2541-3.2815 0-4.5312-1.254-1.2497-3.2815-1.2497-4.5312 0l-7.99 7.99V5.4156c0-1.7681-1.4357-3.2039-3.2039-3.2039s-3.204 1.4358-3.204 3.204v29.8527l-7.99-7.99a3.196 3.196 0 0 0-2.2666-.9395 3.2 3.2 0 0 0-2.2667.9395c-1.2541 1.254-1.2541 3.2815 0 4.5312l.0022.0045Z">
                            </path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </section>

</template>
<script setup>
// import { useWaveAnimation } from "@/composables/useHeroWave";
import { useHeroAnimations } from "@/composables/useHeroBanner";

useHeroAnimations();
onMounted(() => {
    $splitting();
});
// const { container, isAnimating } = useWaveAnimation();
// console.log("[WaveAnimation] Composable loaded:", { container, isAnimating });
</script>
