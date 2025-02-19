import gsap from "gsap";
import { useNuxtApp } from "#app";

export function useHeaderAnimation() {
  let rotateAnimation: gsap.core.Tween | null = null;
  const defaultRotation = 24;
  let startRotation = -24;

  function initHeaderAnimation() {
    // console.log("✅ Initializing Header Animation");

    const { $lenis } = useNuxtApp();
    if (!$lenis) {
      console.error("❌ Lenis not found in Nuxt app!");
      return;
    }

    // 🌀 Elements
    const logo = document.querySelector(".header__logo");
    const pinwheel = document.querySelector(".header__pinwheel-svg");

    if (!pinwheel) {
    //   console.warn("⚠️ Pinwheel element not found.");
      return;
    }
    // console.log("✅ Pinwheel element found:", pinwheel);

    // if (!logo) {
    //   console.warn("⚠️ Logo element not found.");
    // } else {
    //   console.log("✅ Logo element found:", logo);
    // }

    // 🎯 Scroll Event - Rotates pinwheel based on Lenis scroll position
    const handleScroll = () => {
    //   console.log("📜 Scrolling...");
      const scrollTop = $lenis.scroll;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const rotation = (360 * (scrollTop / maxScroll)) - defaultRotation;

      gsap.set(pinwheel, { rotation });
      startRotation = rotation;
    //   console.log("🔄 Pinwheel rotated to:", rotation);
    };

    // 🚀 Mouse Enter - Starts infinite rotation
    const handleMouseEnter = () => {
    //   console.log("🐭 Mouse entered logo");
      if (!rotateAnimation) {
        rotateAnimation = gsap.to(pinwheel, {
          rotation: 17979, // Large number for infinite effect
          repeat: -1,
          repeatDelay: 1,
          duration: 5,
          ease: "power4.inOut",
          startAt: { rotation: startRotation },
        });
        // console.log("🌀 Rotation animation started");
      }
    };

    // 🛑 Mouse Leave - Stops animation and resets rotation
    const handleMouseLeave = () => {
    //   console.log("🐭 Mouse left logo");
      destroyAnimation();

      const currentRotation = gsap.getProperty(pinwheel, "rotation") as number;
      let duration = Math.abs(currentRotation - defaultRotation) / 3600;
      duration = Math.min(Math.max(duration, 1), 5);

      gsap.to(pinwheel, {
        rotation: startRotation,
        duration,
        ease: "power4.out",
      });

    //   console.log("🔄 Rotation reset with duration:", duration);
    };

    // 🔄 Destroy GSAP Animation
    const destroyAnimation = () => {
      if (rotateAnimation) {
        rotateAnimation.kill();
        rotateAnimation = null;
        // console.log("🛑 Animation destroyed");
      }
    };

    // 📌 Add Event Listeners
    $lenis.on("scroll", handleScroll);
    // console.log("📜 Scroll event listener added");

    if (logo) {
      logo.addEventListener("mouseenter", handleMouseEnter);
      logo.addEventListener("mouseleave", handleMouseLeave);
    //   console.log("🐭 Mouse event listeners added to logo");
    }
  }

  return { initHeaderAnimation };
}
