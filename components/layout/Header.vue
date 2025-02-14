<template>
    <header class="header left-0 fixed top-0 w-full z-10">
        <div
            class="header__wrapper w-full h-[6.25rem] bg-gray-300 backdrop-blur-[10px] flex items-center justify-between @container">
            <div class="header__block header__block--left flex items-center">
                <a href="/" class="header__logo flex items-center" data-pointer="link" data-pointer-text="Reload">
                    <div class="header__pinwheel relative z-[1] w-[1.25rem] h-[2.5rem] overflow-hidden">
                        <span class="absolute top-0 left-0 w-[2.5rem] h-[2.5rem] rotate-[-24deg] inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="w-full h-full">
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M7.4436 2.4046c-.0564-.3077.4728-.6084 1.5878-.902 1.115-.2938 2.0536-.4406 2.8158-.4406.3387 0 .494.056.4657.1678l-3.345 6.545c-.0282.084-.1058.126-.2329.126-.127 0-.1905-.042-.1905-.126L7.4436 2.4046Z">
                                </path>
                                <path class="fill-[var(--col-accent)]"
                                    d="M9.5607 8.8237c-.0564 0-.1058-.056-.1482-.1678-.0423-.1119-.0212-.1818.0635-.2098l4.7847-2.727c.254-.112.628.1747 1.122.86.494.6853.9245 1.4265 1.2915 2.2236.367 7972.4657 1.1818.2964 1.1538L9.5607 8.8237Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M8.7986 9.7467c0-.0559.0564-.1188.1693-.1888.113-.0699.1835-.0909.2117-.0629l4.0649 3.734c.1976.1679.0423.5944-.4658 1.2797a12.241 12.241 0 0 1-1.736 1.888c-.6493.5733-.988.7761-1.0162.6083l-1.228-7.2163v-.042Z">
                                </path>
                                <path class="fill-[var(--col-accent)]"
                                    d="M5.75 14.6136c-.0283.0839-.1412.1258-.3388.1258-.367 0-.9245-.1468-1.6725-.4405-.748-.2937-1.4114-.6154-1.99-.965-.5788-.3496-.7975-.5524-.6564-.6083L7.6977 9.369l.0847-.042c.0846 0 .1623.035.2328.105.0706.0699.0918.1328.0635.1888L5.75 14.6136Z">
                                </path>
                                <path class="fill-[var(--col-pinwheel)]"
                                    d="M2.0662 7.9007c-.254-.056-.3811-.4755-.3811-1.2586 0-.7832.0917-1.6293.2752-2.5383s.3458-1.2937.487-1.1538L7.74 8.1524c.0565.056.0635.1399.0212.2518-.0424.1119-.0918.1538-.1482.1258l-5.5468-.6293Z">
                                </path>
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
            <div class="header__block header__block--center">
                <div class="header__version">
                    <span>
                        Portfolio <b>'25</b>
                    </span>
                </div>
            </div>
            <div class="header__block header__block--right">
                <button class="header__colors" data-pointer="simple" title="Theme Switcher" aria-label="Theme Dark">
                    <span class="header__colors-picker svg-data">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 78">
                            <g fill="#FFFFFF" fill-rule="nonzero">
                                <path
                                    d="M2.5 26.9h18.1c.9 0 1.7-.7 1.9-1.6.7-3.4 2-6.5 3.9-9.3.5-.8.5-1.8-.2-2.5L13.3.7c-.8-.8-2.2-.8-2.9.1C5.1 7.5 1.6 15.7.5 24.7c-.1 1.2.8 2.2 2 2.2Z">
                                </path>
                                <path
                                    d="M26.3 44.8c-1.9-2.8-3.2-5.9-3.9-9.3-.2-.9-.9-1.6-1.9-1.6h-18c-1.2 0-2.1 1-1.9 2.1 1.1 9 4.6 17.2 9.9 23.9.7.9 2.1 1 2.9.1l12.8-12.8c.6-.6.6-1.6.1-2.4Z">
                                </path>
                                <path
                                    d="M42.9 55.9c-3.4-.7-6.5-2-9.3-3.9-.8-.5-1.8-.5-2.5.2L18.3 65.1c-.8.8-.8 2.2.1 2.9 6.7 5.3 14.9 8.8 23.9 9.9 1.1.1 2.1-.8 2.1-1.9V57.8c.1-.9-.6-1.7-1.5-1.9Z">
                                </path>
                                <path
                                    d="M64.9 52.3c-.7-.7-1.7-.7-2.5-.2-2.8 1.9-5.9 3.2-9.3 3.9-.9.2-1.6.9-1.6 1.9V76c0 1.2 1 2.1 2.1 1.9 9-1.1 17.2-4.6 23.9-9.9.9-.7 1-2.1.1-2.9L64.9 52.3Z">
                                </path>
                                <path
                                    d="M93.5 33.9H75.4c-.9 0-1.7.7-1.9 1.6-.7 3.4-2 6.5-3.9 9.3-.5.8-.5 1.8.2 2.5l12.8 12.8c.8.8 2.2.8 2.9-.1 5.3-6.7 8.8-14.9 9.9-23.9.2-1.2-.7-2.2-1.9-2.2Z">
                                </path>
                                <path
                                    d="M73.5 25.3c.2.9.9 1.6 1.9 1.6h18.1c1.2 0 2.1-1 1.9-2.1-1.1-9-4.6-17.2-9.9-23.9-.7-.9-2.1-1-2.9-.1L69.9 13.5c-.7.7-.7 1.7-.2 2.5 1.8 2.7 3.2 5.9 3.8 9.3Z">
                                </path>
                                <path class="drop"
                                    d="M60.9 30.5c0-5.7-7.6-18.7-9.9-22.6-.6-1.1-1.8-1.7-3-1.7s-2.4.6-3 1.7c-2.3 3.9-9.9 16.9-9.9 22.6 0 7.1 5.8 12.9 12.9 12.9 7.1 0 12.9-5.7 12.9-12.9ZM46.4 25c-.1.2-3.2 5.3-.9 8.7.3.5.4 1 .3 1.5-.1.5-.4 1-.9 1.3-.3.2-.7.4-1.1.4-.7 0-1.3-.3-1.7-.9-3.8-5.7.7-12.9.9-13.2.3-.5.8-.8 1.3-.9.5-.1 1.1 0 1.6.3.8.5 1.1 1.8.5 2.8Z">
                                </path>
                            </g>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </header>
</template>
