<template>
    <section class="about content-section">
        <div class="container grid grid grid-cols-12 gap-4">
            <div class="grid__col--full">
                <div class="about__media">
                    <!-- <img src="http://www.alessioatzeni.com/assets/asset.BXJJUYc1_V9uUj.webp" class="media__image"
                        alt="Alessio Atzeni - Creative Developer" inferSize="true" width="600" height="750"
                        loading="lazy" decoding="async"> -->
                    <img :src="imageSrc" class="media__image" alt="Alessio Atzeni - Creative Developer">

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

import { useAnimations } from "@/composables/useAnimations";

useAnimations();
const { $splitting } = useNuxtApp();

onMounted(() => {
    $splitting();
});
</script>