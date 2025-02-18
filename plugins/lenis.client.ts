import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    lerp: 0.1, // Adjust smoothness (lower = smoother)
    smooth: true,
    infinite: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Start Lenis globally
  onMounted(() => {
    lenis.start();
  });

  return {
    provide: {
      lenis,
    },
  };
});
