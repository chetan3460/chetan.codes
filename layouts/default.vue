<template>
    <BackgroundProvider>
        <main class="site-main" id="lqd-site-content">
            <LayoutHeader />
            <slot />
            <LayoutFooter />
            <!-- <ClientOnly>
                <SmoothCursor />
            </ClientOnly> -->
            <ClientOnly>
                <SleekLineCursor />
            </ClientOnly>
        </main>
    </BackgroundProvider>
</template>

<script setup>
import SleekLineCursor from '~/components/layout/SleekLineCursor.vue';
import SmoothCursor from '~/components/layout/SmoothCursor.vue';
import BackgroundProvider from '~/components/BackgroundProvider.vue';
</script>
