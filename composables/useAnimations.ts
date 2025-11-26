import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNuxtApp } from "#app";
import { useReducedMotion } from "./useReducedMotion";

type EffectType =
  | "perspective-opacity"
  | "overflow-horizontal"
  | "scale-words"
  | "glitch-reveal"
  | "wave-bounce"
  | "spiral-in"
  | "elastic-drop"
  | "magnetic-pull"
  | "typewriter-scramble"
  | "orbit-converge"
  | "liquid-morph"
  | "effect27"
  | "default";

type ContentEffectType = "scroll-opacity" | "overflow-horizontal" | "default";

export function useAnimations() {
  const { $splitting } = useNuxtApp();
  const { prefersReducedMotion } = useReducedMotion();
  const scrollTriggers: ScrollTrigger[] = [];

  function applySplitting(): void {
    if ($splitting) {
      $splitting();
    }
  }

  function aboutImageAnimation(): void {
    const elements = document.querySelectorAll('.about__media');
    if (!elements.length) return;

    elements.forEach((element) => {
      if (prefersReducedMotion.value) {
        // Instant reveal for reduced motion
        gsap.set(element, { opacity: 0.5, scale: 1, rotation: 10 });
        return;
      }

      const tween = gsap.fromTo(
        element,
        {
          'will-change': 'opacity, transform',
          opacity: 0,
          scale: 0,
          rotation: -50,
        },
        {
          ease: 'sine.inOut',
          rotation: 10,
          opacity: 0.5,
          scale: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      );
      if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
    });
  }

  function headingAnimation(): void {
    document.querySelectorAll(".scroll-js-title[data-splitting]").forEach((element) => {
      const raw = (element as HTMLElement).dataset.fx || "default";
      const effectType = raw.replace(/^data-/, "") as EffectType;
      animateHeading(element as HTMLElement, effectType);
    });
  }

  function animateHeading(element: HTMLElement, effect: EffectType): void {
    // Skip complex animations if user prefers reduced motion
    if (prefersReducedMotion.value) {
      const chars = element.querySelectorAll(".char");
      gsap.set(chars, { opacity: 1 });
      return;
    }

    switch (effect) {
      case "perspective-opacity":
        effectTitlePerspectiveOpacity(element);
        break;
      case "overflow-horizontal":
        effectTitleOverflowHorizontal(element);
        break;
      case "scale-words":
        effectTitleScaleWords(element);
        break;
      case "glitch-reveal":
        effectTitleGlitchReveal(element);
        break;
      case "wave-bounce":
        effectTitleWaveBounce(element);
        break;
      case "spiral-in":
        effectTitleSpiralIn(element);
        break;
      case "elastic-drop":
        effectTitleElasticDrop(element);
        break;
      case "magnetic-pull":
        effectTitleMagneticPull(element);
        break;
      case "typewriter-scramble":
        effectTitleTypewriterScramble(element);
        break;
      case "orbit-converge":
        effectTitleOrbitConverge(element);
        break;
      case "liquid-morph":
        effectTitleLiquidMorph(element);
        break;
      case "effect27":
        effectTitleDataEffect27(element);
        break;
    }
  }

  function effectTitlePerspectiveOpacity(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));

    const tween = gsap.fromTo(
      chars,
      { opacity: 0, z: -800 },
      {
        ease: "back.out(1.2)",
        opacity: 1,
        z: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleOverflowHorizontal(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("char-wrap");
      char.parentNode?.appendChild(wrapper);
      wrapper.appendChild(char);
    });

    const tween = gsap.fromTo(
      chars,
      { xPercent: -100 },
      {
        ease: "back.out(1.2)",
        xPercent: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleScaleWords(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        x: (i: number, _target: Element, all: Element[]) => 300 * (i - all.length / 2),
      },
      {
        ease: "power1.inOut",
        opacity: 1,
        x: 0,
        stagger: { grid: "auto", from: "center" },
        scrollTrigger: {
          trigger: element,
          start: "center bottom+=30%",
          end: "top top+=15%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleGlitchReveal(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-50, 50),
        rotation: () => gsap.utils.random(-45, 45),
        scale: () => gsap.utils.random(0.5, 2),
      },
      {
        ease: "power4.out",
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: {
          amount: 0.6,
          from: "random",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleWaveBounce(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 200,
        rotation: 180,
      },
      {
        ease: "elastic.out(1, 0.5)",
        opacity: 1,
        y: 0,
        rotation: 0,
        stagger: {
          each: 0.03,
          from: "start",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 55%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleSpiralIn(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block", transformOrigin: "center center" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        scale: 0,
        rotation: (i: number) => i * 120,
        x: (i: number) => Math.cos(i * 0.5) * 300,
        y: (i: number) => Math.sin(i * 0.5) * 300,
      },
      {
        ease: "back.out(2)",
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        stagger: {
          each: 0.02,
          from: "center",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleElasticDrop(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: -300,
        scaleY: 3,
        scaleX: 0.3,
      },
      {
        ease: "elastic.out(1, 0.4)",
        opacity: 1,
        y: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: {
          each: 0.04,
          from: "edges",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleMagneticPull(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        scale: 5,
        x: (i: number) => (i % 2 === 0 ? -800 : 800),
        y: () => gsap.utils.random(-200, 200),
        rotation: (i: number) => (i % 2 === 0 ? -720 : 720),
      },
      {
        ease: "power3.inOut",
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        stagger: {
          each: 0.025,
          from: "center",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleTypewriterScramble(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: -20,
        rotationX: -90,
        filter: "blur(10px)",
      },
      {
        ease: "power2.out",
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: "blur(0px)",
        stagger: {
          each: 0.02,
          from: "start",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleOrbitConverge(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block", transformOrigin: "center center" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        scale: 0.2,
        x: (i: number) => Math.cos((i / chars.length) * Math.PI * 4) * 500,
        y: (i: number) => Math.sin((i / chars.length) * Math.PI * 4) * 500,
        rotation: (i: number) => i * 360,
      },
      {
        ease: "expo.out",
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        stagger: {
          each: 0.015,
          from: "start",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleLiquidMorph(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => gsap.set(char, { display: "inline-block" }));

    const tween = gsap.fromTo(
      chars,
      {
        opacity: 0,
        scaleX: () => gsap.utils.random(0.2, 3),
        scaleY: () => gsap.utils.random(0.2, 3),
        rotation: () => gsap.utils.random(-180, 180),
        y: (i: number) => Math.sin(i * 0.8) * 150,
        skewX: () => gsap.utils.random(-45, 45),
      },
      {
        ease: "power4.inOut",
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        y: 0,
        skewX: 0,
        stagger: {
          each: 0.03,
          from: "random",
        },
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 1.5,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectTitleDataEffect27(element: HTMLElement): void {
    const words = [...element.querySelectorAll('.word')];
    if (!words.length) return;

    for (const [pos, word] of words.entries()) {
      const chars = word.querySelectorAll('.char');
      if (!chars.length) continue;

      const tween = gsap.fromTo(chars, {
        'will-change': 'transform',
        transformOrigin: `${pos % 2 ? 0 : 100}% ${pos % 2 ? 100 : 0}%`,
        scale: 0
      },
        {
          ease: 'power4',
          scale: 1,
          stagger: {
            each: 0.03,
            from: pos % 2 ? 'end' : 'start'
          },
          scrollTrigger: {
            trigger: word,
            start: 'top bottom-=10%',
            end: 'top top',
            scrub: true,
          }
        });

      if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
    }
  }

  function contentAnimation(): void {
    document.querySelectorAll(".scroll-js-content[data-splitting]").forEach((element) => {
      const effectType = (element as HTMLElement).dataset.fx || "default";
      animateContent(element as HTMLElement, effectType as ContentEffectType);
    });
  }

  function animateContent(element: HTMLElement, effect: ContentEffectType): void {
    // Skip complex animations if user prefers reduced motion
    if (prefersReducedMotion.value) {
      const words = element.querySelectorAll(".word");
      gsap.set(words, { opacity: 1 });
      return;
    }

    switch (effect) {
      case "scroll-opacity":
        effectContentScrollOpacity(element);
        break;
      case "overflow-horizontal":
        effectContentOverflowHorizontal(element);
        break;
    }
  }

  function effectContentScrollOpacity(element: HTMLElement): void {
    const words = element.querySelectorAll(".word");
    if (!words.length) return;

    const tween = gsap.fromTo(
      words,
      { opacity: 0.1 },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=10%",
          end: "center top+=20%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function effectContentOverflowHorizontal(element: HTMLElement): void {
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;

    chars.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("char-wrap");
      char.parentNode?.appendChild(wrapper);
      wrapper.appendChild(char);
    });

    const tween = gsap.fromTo(
      chars,
      { xPercent: -100 },
      {
        ease: "back.out(1.2)",
        xPercent: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  function listAnimation(): void {
    document.querySelectorAll(".scroll-js-list").forEach((element) => {
      if ((element as HTMLElement).dataset.fx === "opacity") {
        effectListOpacity(element as HTMLElement);
      }
    });
  }

  function effectListOpacity(element: HTMLElement): void {
    const items = element.querySelectorAll(".list__item-box");
    if (!items.length) return;

    if (prefersReducedMotion.value) {
      gsap.set(items, { opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      items,
      { opacity: 0 },
      {
        ease: "back.out(1.2)",
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
    if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
  }

  onMounted(() => {
    try {
      applySplitting();
      requestAnimationFrame(() => {
        headingAnimation();
        contentAnimation();
        listAnimation();
        aboutImageAnimation();
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            try { ScrollTrigger.refresh(); } catch (_) { /* no-op */ }
          }
        }, 0);
      });

      window.addEventListener('load', () => {
        try { ScrollTrigger.refresh(); } catch (_) { /* no-op */ }
      }, { once: true });

      window.addEventListener('resize', () => {
        try { ScrollTrigger.refresh(); } catch (_) { /* no-op */ }
      });
    } catch (error) {
      console.error('Error initializing animations:', error);
    }
  });

  onUnmounted(() => {
    scrollTriggers.forEach(st => st.kill());
  });
}

export function useFeaturesScrollAnimation() {
  const { prefersReducedMotion } = useReducedMotion();

  if (prefersReducedMotion.value) {
    // Skip complex scroll animations for reduced motion
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-features',
      end: 'bottom bottom',
      scrub: true,
      toggleActions: 'restart none reverse',
      pin: '.features-wrapper',
    },
  });

  tl.from('.features-card', {
    opacity: 0,
    yPercent: 50,
    xPercent: 35,
    scale: 1.25,
    duration: 1,
    stagger: { each: 1, from: 'end' },
  });
}
