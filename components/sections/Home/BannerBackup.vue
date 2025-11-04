<!-- <template>
    <section class="hero-header">
        <div class="hero-header__particle-bg">
            <ParticleImage
                image-src="/assets/Images/me.jpeg"
                :canvas-width="String(windowWidth)"
                :canvas-height="String(windowHeight)"
                color="#ffffff"
                particle-size="2"
                particle-gap="3"
                gravity="0.05"
                mouse-force="50"
                init-position="none"
                init-direction="none"
            />
        </div>

        <div class="hero-header__wrapper custom-container grid grid-cols-12 gap-[3.125rem] ">
            <div class="hero-header__slogan">
                <span class="hero-header__marquee">Creative Developer</span>
                <span class="hero-header__marquee">Creative Developer</span>
            </div>
            <div class="hero-header__bottom">
                <h1 class="hero-header__description" data-splitting>
                    Hey there, I'm Chetan Dhargalkar, Creative Developer <br />
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
</template> -->

<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ParticleImage from '@/components/ParticleImage.vue'
import { useHeroAnimations } from "@/composables/useHeroBanner";

useHeroAnimations();

// Responsive canvas sizing
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920)
const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 1080)

const handleResize = () => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script> -->

<!-- 
<style>
.header__wrapper {

    background: #000;
}

/* Hero Section */

.hero-header {
    height: 100vh;
    height: 100svh;
    position: relative;
    width: 100vw;
}

.hero-header__particle-bg {
    background-color: var(--canvas-bg);
    height: 100%;
    left: 0;
    outline: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
    overflow: hidden;
}

.hero-header__particle-bg canvas {
    pointer-events: auto;
}

.hero-header__wrapper {
    align-items: flex-end;
    height: 100%;
    padding-bottom: 2.5rem;
    position: relative;
    width: 100%;
}

.hero-header__slogan {
    left: 50%;
    mix-blend-mode: color-dodge;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    white-space: nowrap;
    width: 100%;
    z-index: 1;
}

.hero-header__slogan.is--paused span {
    animation-play-state: paused;
}

.hero-header__slogan span {
    animation: a 50s linear infinite;
    color: var(--canvas-text);
    display: inline-block;
    font-size: 18vw;
    font-weight: 900;
    letter-spacing: 5vw;
    line-height: 1;
    opacity: 0.15;
    text-transform: uppercase;
}

@keyframes a {
    0% {
        transform: translate(0);
    }

    to {
        transform: translate(-100%);
    }
}

.hero-header__bottom {
    grid-column: 1 / span 12;
    position: relative;
    z-index: 3;
}

.hero-header__description {
    font-family: OutfitPortfolio, sans-serif;
    font-weight: 400;
    line-height: 1.4;
    text-align: center;
    font-size: 2.25rem;
}

.hero-header__scroll {
    bottom: 0;
    cursor: pointer;
    height: 3rem;
    position: absolute;
    right: -0.625rem;
    width: 3rem;
    z-index: 10;
}

.hero-header__scroll .svg-data {
    height: 1.5rem;
    width: 1.5rem;
}

.hero-header__scroll .svg-data svg {
    animation: b 1.4s infinite var(--ease-out-cubic);
}

@keyframes b {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    50% {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(100%);
    }
}

.hero-header__scroll .svg-data svg path {
    fill: var(--col-text);
}

@media (max-width: 1024px) {
    .hero-header__wrapper {
        padding-bottom: 1.5625rem;
    }

    .hero-header__description {
        font-size: 1.5rem;
    }

    .hero-header__slogan span {
        animation-duration: 30s;
        font-size: 35vw;
    }
}

@media (max-width: 767px) {
    .hero-header {
        min-height: 18.75rem;
    }

    .hero-header__wrapper {
        padding-bottom: 0.9375rem;
    }

    .hero-header__description {
        font-size: 1.125rem;
    }

    .hero-header__description br {
        display: none;
    }

    .hero-header__scroll {
        bottom: auto;
        left: 50%;
        margin-left: -1.5rem;
        right: auto;
        top: -4.375rem;
    }
}
</style> -->