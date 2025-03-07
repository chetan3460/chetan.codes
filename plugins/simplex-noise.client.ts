import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async () => {
  if (process.client) {
    try {
      const SimplexNoise = (await import('simplex-noise')).default;
      window.SimplexNoise = SimplexNoise;
      console.log('✅ SimplexNoise loaded:', window.SimplexNoise);
    } catch (error) {
      console.error('❌ Failed to load SimplexNoise:', error);
    }
  }
});
