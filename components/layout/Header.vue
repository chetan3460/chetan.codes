<template>
    <header class="header left-0 fixed top-0 w-full z-10">
        <div class="container-fluid header__wrapper w-full   backdrop-blur-[10px]   py-5 grid grid-cols-12 gap-4">
            <!-- Logo -->
            <div
                class="header__block header__block--left flex items-center col-span-8 lg:col-span-4 col-start-1  justify-start">
                <a href="/" class="header__logo flex items-center" data-pointer="link" data-pointer-text="Reload">
                    <div class="header__pinwheel relative z-[1] w-[1.25rem] h-[2.5rem] overflow-hidden">
                        <span
                            class="header__pinwheel-svg svg-data absolute top-0 left-0 w-[2.5rem] h-[2.5rem] rotate-[-24deg] inline-flex">

                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 45 45" fill="none"
                                class="svg-7 flower-svg"
                                style="translate: none; rotate: none; scale: none; transform: translate3d(0px, 0px, 0px) rotate(99.9574deg);">
                                <path class="fill-[var(--col-pinwheel)]" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M26.4277 21.9668C27.3934 21.9063 29.2172 21.1389 31.2274 19.6762C34.8346 17.0516 39.2615 18.5255 42.3768 21.1509C42.9914 21.6099 43.7211 21.9285 44.7819 21.9668H45.0002C44.9478 21.9668 44.8961 21.9674 44.8452 21.9687C44.8961 21.97 44.9478 21.9707 45.0002 21.9707H44.7819C43.7211 22.009 42.9914 22.3275 42.3768 22.7866C39.2615 25.412 34.8346 26.8859 31.2274 24.2613C29.2172 22.7986 27.3934 22.0312 26.4277 21.9707H26.3086C26.3355 21.9707 26.3633 21.97 26.3918 21.9687C26.3633 21.9674 26.3355 21.9668 26.3086 21.9668H26.4277Z"
                                    fill="currentColor"></path>
                                <path class="fill-[var(--col-pinwheel)]" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.5723 21.9395C17.6066 21.9999 15.7828 22.7674 13.7726 24.23C10.1654 26.8546 5.73845 25.3808 2.62318 22.7554C2.00863 22.2963 1.27889 21.9777 0.218144 21.9395L-0.000201858 21.9395C0.0522426 21.9395 0.103909 21.9388 0.154822 21.9375C0.103909 21.9362 0.0522426 21.9356 -0.000201858 21.9356L0.218144 21.9356C1.27889 21.8973 2.00863 21.5787 2.62318 21.1196C5.73845 18.4943 10.1654 17.0204 13.7726 19.645C15.7828 21.1076 17.6066 21.8751 18.5723 21.9356L18.6914 21.9356C18.6645 21.9356 18.6367 21.9362 18.6082 21.9375C18.6367 21.9388 18.6645 21.9395 18.6914 21.9395L18.5723 21.9395Z"
                                    fill="currentColor"></path>
                                <path class="fill-[var(--col-accent)]"
                                    d="M22.537 19.8393C19.9136 16.7787 16.2408 8.526 22.537 0C25.1603 3.27923 28.8331 11.838 22.537 19.8393Z"
                                    fill="currentColor"></path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M22.5379 44.605C19.9146 41.5443 16.2418 33.2916 22.5379 24.7656C25.1613 28.0449 28.8341 36.6036 22.5379 44.605Z"
                                    fill="currentColor"></path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M27.7842 17.5481C27.8935 14.5422 30.178 8.20232 38.4417 6.89062C38.0044 10.1699 35.2608 16.8923 27.7842 17.5481Z"
                                    fill="currentColor"></path>
                                <path class="fill-[var(--col-accent)]"
                                    d="M6.63281 37.3919C6.74212 34.3859 9.02665 28.0461 17.2903 26.7344C16.8531 30.0136 14.1095 36.736 6.63281 37.3919Z"
                                    fill="currentColor"></path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M38.6055 37.3841C38.4962 34.3781 36.2116 28.0383 27.948 26.7266C28.3852 30.0058 31.1288 36.7282 38.6055 37.3841Z"
                                    fill="currentColor"></path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M17.29 17.3841C17.1807 14.3781 14.8962 8.03825 6.63254 6.72656C7.06977 10.0058 9.8134 16.7282 17.29 17.3841Z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>

                    </div>
                    <div class="header__author relative z-[2] px-[0.3125rem]">
                        <span class="header__name text-[var(--col-text)] font-semibold uppercase">Chetan
                            Dhargalkar</span>
                        <span class="header__role text-[var(--col-text-500)] font-medium uppercase">Creative
                            Developer</span>
                    </div>
                </a>
            </div>

            <!--Name  -->
            <div
                class="header__block header__block--center hidden lg:block col-span-8 lg:col-span-4 col-start-5 flex justify-center items-center">
                <div class="header__version">
                    <span class="">
                        Portfolio <b class="text-[var(--col-accent)]">'25</b>
                    </span>
                </div>
            </div>
            <!-- Icon -->
            <div
                class="hidden header__block header__block--right items-center  col-span-4 col-start-9 flex justify-end ">
                <button class="header__colors  h-[2.75rem] left-[.5rem] relative w-[2.75rem]" data-pointer="simple"
                    title="Theme Switcher" aria-label="Theme Dark">
                    <span
                        class="header__colors-picker h-[1.5rem] w-[1.8125rem] absolute text-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] svg-data">

                        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 78">
                            <g fill="#FFFFFF" fill-rule="nonzero">
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M2.5 26.9h18.1c.9 0 1.7-.7 1.9-1.6.7-3.4 2-6.5 3.9-9.3.5-.8.5-1.8-.2-2.5L13.3.7c-.8-.8-2.2-.8-2.9.1C5.1 7.5 1.6 15.7.5 24.7c-.1 1.2.8 2.2 2 2.2Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M26.3 44.8c-1.9-2.8-3.2-5.9-3.9-9.3-.2-.9-.9-1.6-1.9-1.6h-18c-1.2 0-2.1 1-1.9 2.1 1.1 9 4.6 17.2 9.9 23.9.7.9 2.1 1 2.9.1l12.8-12.8c.6-.6.6-1.6.1-2.4Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M42.9 55.9c-3.4-.7-6.5-2-9.3-3.9-.8-.5-1.8-.5-2.5.2L18.3 65.1c-.8.8-.8 2.2.1 2.9 6.7 5.3 14.9 8.8 23.9 9.9 1.1.1 2.1-.8 2.1-1.9V57.8c.1-.9-.6-1.7-1.5-1.9Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M64.9 52.3c-.7-.7-1.7-.7-2.5-.2-2.8 1.9-5.9 3.2-9.3 3.9-.9.2-1.6.9-1.6 1.9V76c0 1.2 1 2.1 2.1 1.9 9-1.1 17.2-4.6 23.9-9.9.9-.7 1-2.1.1-2.9L64.9 52.3Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M93.5 33.9H75.4c-.9 0-1.7.7-1.9 1.6-.7 3.4-2 6.5-3.9 9.3-.5.8-.5 1.8.2 2.5l12.8 12.8c.8.8 2.2.8 2.9-.1 5.3-6.7 8.8-14.9 9.9-23.9.2-1.2-.7-2.2-1.9-2.2Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M73.5 25.3c.2.9.9 1.6 1.9 1.6h18.1c1.2 0 2.1-1 1.9-2.1-1.1-9-4.6-17.2-9.9-23.9-.7-.9-2.1-1-2.9-.1L69.9 13.5c-.7.7-.7 1.7-.2 2.5 1.8 2.7 3.2 5.9 3.8 9.3Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]" class="drop"
                                    d="M60.9 30.5c0-5.7-7.6-18.7-9.9-22.6-.6-1.1-1.8-1.7-3-1.7s-2.4.6-3 1.7c-2.3 3.9-9.9 16.9-9.9 22.6 0 7.1 5.8 12.9 12.9 12.9 7.1 0 12.9-5.7 12.9-12.9ZM46.4 25c-.1.2-3.2 5.3-.9 8.7.3.5.4 1 .3 1.5-.1.5-.4 1-.9 1.3-.3.2-.7.4-1.1.4-.7 0-1.3-.3-1.7-.9-3.8-5.7.7-12.9.9-13.2.3-.5.8-.8 1.3-.9.5-.1 1.1 0 1.6.3.8.5 1.1 1.8.5 2.8Z">
                                </path>
                            </g>
                        </svg> -->
                    </span>
                </button>
            </div>
        </div>
    </header>
</template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import { useHeaderAnimation } from "@/composables/useHeaderAnimation";

const { initHeaderAnimation } = useHeaderAnimation();

onMounted(() => {
    initHeaderAnimation();
});

// onUnmounted(() => {
//     console.log("🛑 Header Component Unmounted");
// });
</script>
