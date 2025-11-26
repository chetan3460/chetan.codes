import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNuxtApp } from "#app";
import { useReducedMotion } from "./useReducedMotion";

export function useHeroAnimations() {
  const { $splitting } = useNuxtApp();
  const { prefersReducedMotion } = useReducedMotion();
  
  let headerBlocks: gsap.TweenTarget;
  let heroTitle: HTMLElement | null;
  let heroChars: NodeListOf<Element>;
  let heroButton: HTMLElement | null;
  let heroScrollTrigger: ScrollTrigger | null = null;

  function setupElements(): void {
    headerBlocks = gsap.utils.toArray(".header__block");
    heroTitle = document.querySelector(".hero-header__description");
    heroButton = document.querySelector(".hero-header__scroll");

    if (!heroTitle) {
      return;
    }

    // Apply Splitting.js
    if ($splitting) {
      $splitting();
    }

    heroChars = heroTitle.querySelectorAll(".char");
    if (!heroChars.length) {
      return;
    }

    gsap.set(headerBlocks, { willChange: "opacity", opacity: 0 });
    heroChars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
    gsap.set(heroChars, { opacity: 0, y: 0, z: 0, scale: 1 });
  }

  function startHeaderElementsAnimation(): void {
    if (prefersReducedMotion.value) {
      // Instant reveal for reduced motion
      gsap.set(headerBlocks, { opacity: 1 });
      return;
    }

    gsap.to(headerBlocks, {
      ease: "power1.inOut",
      opacity: 1,
      stagger: 0.25,
      duration: 1,
    });
  }

  function startHeroElementsAnimation(): void {
    if (prefersReducedMotion.value) {
      // Instant reveal for reduced motion
      gsap.set(heroChars, { opacity: 1 });
      return;
    }

    gsap.to(heroChars, {
      ease: "power1.inOut",
      opacity: 1,
      stagger: { each: 0.01, from: "start" },
      duration: 1,
    });
  }

  function scrollHeroElementsAnimation(): void {
    if (prefersReducedMotion.value) {
      // Skip scroll animations for reduced motion
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroTitle,
        start: "top bottom-=35%",
        end: "bottom 20%",
        scrub: 2.5,
        onEnter: () => {
          gsap.killTweensOf(heroChars, "opacity");
          gsap.set(heroChars, { opacity: 1, y: 0, z: 0 });
        },
        onLeaveBack: () => {
          gsap.set(heroChars, { opacity: 1, y: 0, z: 0 });
        },
      },
    })
      .to(heroButton, {
        ease: "power1.inOut",
        opacity: 0,
        duration: 0.3,
      }, ">")
      .to(heroChars, {
        ease: "sine.inOut",
        opacity: 0,
        y: () => gsap.utils.random(0, 600),
        z: () => gsap.utils.random(0, 500),
        scale: 0,
        stagger: { each: 0.005, from: "end" },
      }, 0);

    heroScrollTrigger = timeline.scrollTrigger;
  }

  onMounted(() => {
    try {
      setupElements();
      if (heroTitle) {
        startHeaderElementsAnimation();
        startHeroElementsAnimation();
        scrollHeroElementsAnimation();
        ScrollTrigger.refresh();
      }
    } catch (error) {
      console.error('Error initializing hero animations:', error);
    }
  });

  onUnmounted(() => {
    // Cleanup ScrollTrigger instance to prevent memory leaks
    if (heroScrollTrigger) {
      heroScrollTrigger.kill();
    }
  });
}
