<template>
    <section class="about content-section" data-liquid-bg-section data-bg-color="#3d065f">
        <div class="custom-container  grid grid-cols-12 gap-4">
            <div class="grid__col--full relative">

                <div class="content-section__head">
                    <h2 class="about__title content-section__title scroll-js-title !text-[#fff]" data-splitting
                        data-fx="typewriter-scramble">Behind the Scenes</h2>
                    <span class="about__decorative content-section__decorative scroll-js-title !text-[#eac2ff]/50"
                        data-splitting data-fx="scale-words">About</span>
                </div>
                <div class="about__wrapper w-full mx-auto max-w-7xl content-section__wrapper">
                    <div class="about__description content-section__description scroll-js-content !text-[#fff]"
                        data-splitting data-fx="scroll-opacity">
                        <p>I’m Chetan Dhargalkar — a Creative Developer who blends design, motion, and engineering to
                            build immersive digital experiences.</p>
                        <p>I specialize in high-performance WordPress development, modern frontend engineering, and
                            AI-powered workflows that dramatically speed up the process of building and shipping
                            websites.</p>
                        <p>My work focuses on clean UI, smooth animations, and scalable architecture powered by tools
                            like Nuxt, Tailwind, Vite, and custom ACF-based ecosystems.</p>
                        <p>Whether it’s crafting aesthetic landing pages, building custom WordPress plugins, or
                            developing automated AI-driven systems, I enjoy turning ideas into meaningful, interactive
                            experiences.</p>
                        <!-- <p>Based in Goa, India.</p> -->
                    </div>
                </div>







            </div>

        </div>

    </section>

</template>

<script setup>
import Meteors from '@/components/ui/Meteors.vue';
import ElectricBorder from '@/components/ui/ElectricBorder.vue';
import imageSrc from '/assets/Images/me.jpeg'; // Importing from assets
import ParticleImage from '@/components/ParticleImage.vue'

import { useAnimations } from "@/composables/useAnimations";

const { data: aboutSkills } = await useFetch('/json/aboutSkills.json')
const skills = computed(() => aboutSkills.value || [])

useAnimations()

// Import Lucide icons
import { Wrench, Layout, Bot, Rocket } from 'lucide-vue-next'

const iconMap = {
    Wrench,
    Layout,
    Bot,
    Rocket
}



</script>
