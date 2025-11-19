<template>
    <!-- <BackgroundProvider>
    </BackgroundProvider> -->
    <ClientOnly>
        <div class="pointer-events-auto fixed inset-0 z-0">
            <UiBackgroundRippleEffect />
        </div>
    </ClientOnly>

    <LayoutHeader />

    <main class="site-main flex flex-col gap-24" id="lqd-site-content">
        <slot />
        <LayoutFooter />
        <!-- <ClientOnly>
                <SmoothCursor />
            </ClientOnly> -->
        <ClientOnly>
            <SleekLineCursor />
        </ClientOnly>
    </main>
</template>

<script setup>
import SleekLineCursor from '~/components/layout/SleekLineCursor.vue';
import BackgroundProvider from '~/components/BackgroundProvider.vue';
</script>