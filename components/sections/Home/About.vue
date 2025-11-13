<template>
    <section class="about content-section" data-liquid-bg-section data-bg-color="#050a21">
        <div class="custom-container  grid grid-cols-12 gap-4">
            <div class="grid__col--full relative">

                <div class="content-section__head">
                    <h2 class="about__title content-section__title scroll-js-title" data-splitting
                        data-fx="typewriter-scramble">Behind the Scenes</h2>
                    <span class="about__decorative content-section__decorative scroll-js-title" data-splitting
                        data-fx="scale-words">About</span>
                </div>
                <div class="about__wrapper w-full mx-auto max-w-7xl content-section__wrapper">
                    <div class="about__description content-section__description scroll-js-content" data-splitting
                        data-fx="scroll-opacity">
                        <p>Creative Developer with 6 years of experience in web and e-commerce. I specialize in custom
                            WordPress theme development and WooCommerce, delivering fast, maintainable, and scalable
                            solutions.</p>
                        <p>Driven and resourceful, I thrive in deadline-oriented environments and ship high-quality work
                            that balances clean engineering with thoughtful UX. I stay current by exploring new
                            technologies and sharing tools and tutorials with the developer community.</p>
                        <p>Outside of client projects, I prototype modern front-end interactions, focusing on
                            performance, accessibility, and motion to continuously sharpen my craft.</p>
                        <p>Based in Goa, India.</p>
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

</script>
