<template>
  <section class="lab content-section">
    <div class="custom-container grid">
      <div class="grid__col--full">
        <!-- Title -->
        <div class="content-section__head">
          <h2 class="lab__title content-section__title scroll-js-title" data-splitting data-fx="perspective-opacity">
            The Process
          </h2>
          <span class="lab__decorative content-section__decorative scroll-js-title" data-splitting
            data-fx="scale-words">
            Build</span>
        </div>

        <!-- Description -->
        <div class="lab__wrapper content-section__wrapper">
          <div class="lab__description content-section__description scroll-js-content" data-splitting
            data-fx="scroll-opacity">
            <p>
              In a world full of cookie-cutter websites, I create unique digital experiences that blend stunning design
              with top-tier performance. Every project is built for speed, creativity, and lasting impact.
            </p>
          </div>

          <!-- Lab Cards -->
          <div class="lab__lists mt-14 md:mt-24">
            <div class="lists lists--linkables scroll-js-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]"
              data-fx="opacity">
              <div v-for="(lab, index) in labs" :key="index"
                class="list__item-box  group relative overflow-hidden p-5 flex ">

                <div class="flex flex-col justify-between gap-3">
                  <div class="list__item-media">
                    <!-- Render SVG if available -->
                    <div v-if="lab.svg" class="media__svg" v-html="lab.svg"></div>

                    <!-- Otherwise, fallback to image if SVG is not present -->
                    <img v-else-if="lab.image" :src="lab.image" :alt="lab.title" class="media__image" width="512"
                      height="512" loading="lazy" decoding="async" />
                  </div>

                  <div class="flex flex-col justify-between gap-2">
                    <h3 class="text-4xl !font-outfit font-medium">
                      {{ lab.title }}
                    </h3>
                    <p class="text-2xl">
                      {{ lab.description }}
                    </p>
                  </div>
                </div>



                <!-- Border Layer -->
                <div class="absolute inset-0 w-full h-full border border-[#1fa5fd] rounded-sm  pointer-events-none">
                </div>

                <!-- Hover Background Layer -->
                <div
                  class="absolute inset-0 w-full h-full bg-[#1fa5fd] opacity-0 pointer-events-none rounded-[var(--border-radius)] transition-all duration-[var(--animation-fast)] group-hover:opacity-[0.05]">
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<script setup>
const { data: labs } = await useFetch('json/lab.json')
</script>