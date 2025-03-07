import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  if (process.client) {
    const datGuiModule = await import('dat.gui');
    window.dat = datGuiModule.default || datGuiModule; // Ensure correct export handling
  }
});
