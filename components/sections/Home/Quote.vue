<template>
    <section class="quote-section content-section" data-liquid-bg-section data-bg-color="#ffccf3">
        <div class="custom-container grid grid-cols-12 gap-4">
            <div class="grid__col--full relative">
                <div class="content-section__head">
                    <div class="mx-auto text-center  text-[12vw] leading-[1.1] !mt-0 scroll-js-title !font-outfit font-bold text-[#5c0047]"
                        data-splitting data-fx="data-effect27">
                        <span class="font-upper block">Shaping Digital</span>
                        <span class="font-upper block">Experiences</span>
                        <span class="font-upper block">Pixel by Pixel</span>
                    </div>

                </div>

                <div class="about__wrapper w-full mx-auto max-w-7xl content-section__wrapper">
                    <div class="about__description content-section__description scroll-js-content !text-[#5c0047]"
                        data-splitting data-fx="scroll-opacity">
                        <p>
                            Development is more than execution — it’s refinement. From structure to
                            interaction, every decision shapes the final experience. I build with a
                            mindset that blends engineering discipline with creative precision.
                            Each component is crafted with intention, ensuring clarity in logic,
                            fluidity in motion, and performance at scale. I believe great development
                            is not just about what you build, but how thoughtfully you bring it to life.
                        </p>
                    </div>
                </div>

            </div>

        </div>

    </section>
</template>

<script setup>
import { useAnimations } from "@/composables/useAnimations"

useAnimations()
</script>

<style scoped>
.quote-section {
    position: relative;
}
</style>
