<template>
    <section class="about content-section">
        <div class="custom-container  grid grid-cols-12 gap-4">
            <div class="grid__col--full">
                <div class="about__media">
                    <ParticleImage :image-src="imageSrc" canvas-width="200" canvas-height="200" mouse-force="50"
                        gravity="0.08" :noise="2" />
                </div>
                <div class="content-section__head">
                    <h2 class="about__title content-section__title scroll-js-title" data-splitting
                        data-fx="perspective-opacity">Behind the Scenes</h2>
                    <span class="about__decorative content-section__decorative scroll-js-title" data-splitting
                        data-fx="scale-words">About</span>
                </div>
                <div class="about__wrapper content-section__wrapper">
                    <div class="about__description content-section__description scroll-js-content" data-splitting
                        data-fx="scroll-opacity">
                        <p>Creative Designer and Developer with 10+ years of experience in web, mobile, and e-commerce
                            development. Specializing in custom theme and plugin development for WordPress and
                            WooCommerce, I bring a versatile skill set and deep expertise to every project.</p>
                        <p>Driven and resourceful, I thrive in deadline-oriented environments, consistently delivering
                            high-quality solutions that blend design excellence with technical precision. Passionate
                            about innovation, I stay ahead of trends by exploring new technologies and creating tools,
                            tutorials, and resources for fellow designers and developers.</p>
                        <p>In my free time, I work on personal projects, focusing on the development of Shopify themes
                            and the exploration of WebGL, constantly expanding my skills in web design and development.
                        </p>
                        <p>
                            Currently working at <a href="https://www.secretkey.it/" target="_blank"
                                rel="noopener noopener noreferrer nofollow" data-pointer="link"
                                data-pointer-text="Visit">Secret Key Web Agency</a>
                            &#8211;based in Rome, Italy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import imageSrc from '/assets/Images/me.jpeg'; // Importing from assets
import ParticleImage from '@/components/ParticleImage.vue'

import { useAnimations } from "@/composables/useAnimations";
// useAnimations();
// const { $splitting } = useNuxtApp();
// onMounted(() => {
//     $splitting();
// });
</script>




<style>
.about__media {
    border-radius: 0.9375rem;
    height: 12.5rem;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transform: translate(-50%, -50%);
    width: 12.5rem;
    z-index: 0;
}

.about__media:before {
    background-color: var(--overlay-about);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
}

.about__media img {
    filter: grayscale(1);
}

@media (max-width: 767px) {
    .about__media {
        height: 3.75rem;
        width: 3.75rem;
    }
}
</style>