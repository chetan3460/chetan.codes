<template>
    <main class="site-main">
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
</template>

<script setup>
import SleekLineCursor from '~/components/layout/SleekLineCursor.vue';
import SmoothCursor from '~/components/layout/SmoothCursor.vue';
</script>
