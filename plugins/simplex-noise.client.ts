import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async () => {
  if (process.client) {
    try {
      const SimplexNoise = (await import('simplex-noise')).default;
      window.SimplexNoise = SimplexNoise;
    } catch (error) {
      // Failed to load SimplexNoise - silent fail
    }
  }
});
