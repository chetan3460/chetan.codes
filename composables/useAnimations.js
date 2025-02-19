import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNuxtApp } from "#app";
import { Sine, Back } from "gsap";

// Register GSAP Plugin
if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
}

export function useAnimations() {
    const { $splitting } = useNuxtApp();

    function applySplitting() {
        $splitting(); // Apply text splitting
    }

    function aboutImageAnimation() {
        const element = document.querySelector(".about__media");
        if (!element) return;

        gsap.fromTo(
            element,
            {
                "will-change": "opacity, transform",
                opacity: 0,
                scale: 0,
                rotation: -50,
            },
            {
                ease: "sine.inOut",
                rotation: 10,
                opacity: 0.5,
                scale: 1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    end: "bottom 50%",
                    scrub: true,
                },
            }
        );
    }

    function headingAnimation() {
        document.querySelectorAll(".scroll-js-title[data-splitting]").forEach((element) => {
            const effectType = element.dataset.fx || "default";
            animateHeading(element, effectType);
        });
    }

    function animateHeading(element, effect) {
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
        }
    }

    function effectTitlePerspectiveOpacity(element) {
        const chars = element.querySelectorAll(".char");
        if (!chars.length) return;

        chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));

        gsap.fromTo(
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
    }

    function effectTitleOverflowHorizontal(element) {
        const chars = element.querySelectorAll(".char");
        if (!chars.length) return;

        chars.forEach((char) => {
            const wrapper = document.createElement("span");
            wrapper.classList.add("char-wrap");
            char.parentNode.appendChild(wrapper);
            wrapper.appendChild(char);
        });

        gsap.fromTo(
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
    }

    function effectTitleScaleWords(element) {
        const chars = element.querySelectorAll(".char");
        if (!chars.length) return;

        gsap.fromTo(
            chars,
            {
                opacity: 0,
                x: (i, target, all) => 300 * (i - all.length / 2),
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
    }

    function contentAnimation() {
        document.querySelectorAll(".scroll-js-content[data-splitting]").forEach((element) => {
            const effectType = element.dataset.fx || "default";
            animateContent(element, effectType);
        });
    }

    function animateContent(element, effect) {
        switch (effect) {
            case "scroll-opacity":
                effectContentScrollOpacity(element);
                break;
            case "overflow-horizontal":
                effectContentOverflowHorizontal(element);
                break;
        }
    }

    function effectContentScrollOpacity(element) {
        const words = element.querySelectorAll(".word");
        if (!words.length) return;

        gsap.fromTo(
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
    }

    function effectContentOverflowHorizontal(element) {
        const chars = element.querySelectorAll(".char");
        if (!chars.length) return;

        chars.forEach((char) => {
            const wrapper = document.createElement("span");
            wrapper.classList.add("char-wrap");
            char.parentNode.appendChild(wrapper);
            wrapper.appendChild(char);
        });

        gsap.fromTo(
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
    }

    function listAnimation() {
        document.querySelectorAll(".scroll-js-list").forEach((element) => {
            if (element.dataset.fx === "opacity") {
                effectListOpacity(element);
            }
        });
    }

    function effectListOpacity(element) {
        const items = element.querySelectorAll(".list__item-box");
        if (!items.length) return;

        gsap.fromTo(
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
    }

    onMounted(() => {
        applySplitting(); // Ensure Splitting.js is applied before animations
        aboutImageAnimation();
        headingAnimation();
        contentAnimation();
        listAnimation();
    });
}
