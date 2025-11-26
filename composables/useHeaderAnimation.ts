import gsap from "gsap";
import { useNuxtApp } from "#app";

export function useHeaderAnimation() {
  let rotateAnimation: gsap.core.Tween | null = null;
  const defaultRotation = 24;
  let startRotation = -24;

  function initHeaderAnimation() {
    const { $lenis } = useNuxtApp();
    if (!$lenis) {
      return;
    }

    // 🌀 Elements
    const logo = document.querySelector(".header__logo");
    const pinwheel = document.querySelector(".header__pinwheel-svg");

    if (!pinwheel) {
      return;
    }

    // 🎯 Scroll Event - Rotates pinwheel based on Lenis scroll position
    const handleScroll = () => {
      const scrollTop = $lenis.scroll;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const rotation = (360 * (scrollTop / maxScroll)) - defaultRotation;

      gsap.set(pinwheel, { rotation });
      startRotation = rotation;
    };

    // 🚀 Mouse Enter - Starts infinite rotation
    const handleMouseEnter = () => {
      if (!rotateAnimation) {
        rotateAnimation = gsap.to(pinwheel, {
          rotation: 17979, // Large number for infinite effect
          repeat: -1,
          repeatDelay: 1,
          duration: 5,
          ease: "power4.inOut",
          startAt: { rotation: startRotation },
        });
      }
    };

    // 🛑 Mouse Leave - Stops animation and resets rotation
    const handleMouseLeave = () => {
      destroyAnimation();

      const currentRotation = gsap.getProperty(pinwheel, "rotation") as number;
      let duration = Math.abs(currentRotation - defaultRotation) / 3600;
      duration = Math.min(Math.max(duration, 1), 5);

      gsap.to(pinwheel, {
        rotation: startRotation,
        duration,
        ease: "power4.out",
      });
    };

    // 🔄 Destroy GSAP Animation
    const destroyAnimation = () => {
      if (rotateAnimation) {
        rotateAnimation.kill();
        rotateAnimation = null;
      }
    };

    // 📌 Add Event Listeners
    $lenis.on("scroll", handleScroll);

    if (logo) {
      logo.addEventListener("mouseenter", handleMouseEnter);
      logo.addEventListener("mouseleave", handleMouseLeave);
    }
  }

  return { initHeaderAnimation };
}
