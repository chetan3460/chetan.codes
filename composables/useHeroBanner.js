import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNuxtApp } from "#app";

// Register GSAP Plugin
if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
}

export function useHeroAnimations() {
    const { $splitting } = useNuxtApp();
    let headerBlocks;
    let heroTitle;
    let heroChars;
    let heroButton;

    function setupElements() {
        headerBlocks = gsap.utils.toArray(".header__block");
        heroTitle = document.querySelector(".hero-header__description");
        heroButton = document.querySelector(".hero-header__scroll");

        if (!heroTitle) {
            console.warn("Hero title not found!");
            return;
        }

        // Apply Splitting.js
        $splitting();

        heroChars = heroTitle.querySelectorAll(".char");
        if (!heroChars.length) {
            console.warn("No characters found for hero animation.");
            return;
        }

        gsap.set(headerBlocks, { willChange: "opacity", opacity: 0 });
        heroChars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
        gsap.set(heroChars, { opacity: 0, y: 0, z: 0, scale: 1 });
    }

    function startHeaderElementsAnimation() {
        gsap.to(headerBlocks, {
            ease: "power1.inOut",
            opacity: 1,
            stagger: 0.25,
            duration: 1,
        });
    }

    function startHeroElementsAnimation() {
        gsap.to(heroChars, {
            ease: "power1.inOut",
            opacity: 1,
            stagger: { each: 0.01, from: "start" },
            duration: 1,
        });
    }

    function scrollHeroElementsAnimation() {
        gsap.timeline({
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
    }

    onMounted(() => {
        setupElements();
        if (heroTitle) {
            startHeaderElementsAnimation();
            startHeroElementsAnimation();
            scrollHeroElementsAnimation();
            ScrollTrigger.refresh();
        }
    });
}
