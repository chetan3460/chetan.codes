<template>
    <main class="site-main">
        <LayoutHeader />
        <slot />
        <LayoutFooter />
        <ClientOnly>
            <SmoothCursor />
        </ClientOnly>
    </main>
</template>

<script setup>
import SmoothCursor from '~/components/layout/SmoothCursor.vue';
</script>
