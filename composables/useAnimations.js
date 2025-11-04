import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNuxtApp } from "#app";
import { Sine, Back } from "gsap";

export function useAnimations() {
    const { $splitting } = useNuxtApp();
    const scrollTriggers = [];

    function applySplitting() {
        $splitting(); // Apply text splitting
    }

    function aboutImageAnimation() {
        const elements = document.querySelectorAll('.about__media')
        if (!elements.length) return


        elements.forEach((element) => {
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
        )
        if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger)
        })
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

    function effectTitleOverflowHorizontal(element) {
        const chars = element.querySelectorAll(".char");
        if (!chars.length) return;

        chars.forEach((char) => {
            const wrapper = document.createElement("span");
            wrapper.classList.add("char-wrap");
            char.parentNode.appendChild(wrapper);
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

    function effectTitleScaleWords(element) {
        const chars = element.querySelectorAll(".char");
        if (!chars.length) return;

        const tween = gsap.fromTo(
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
        if (tween.scrollTrigger) scrollTriggers.push(tween.scrollTrigger);
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

    function effectContentOverflowHorizontal(element) {
        const chars = element.querySelectorAll(".char");
        if (!chars.length) return;

        chars.forEach((char) => {
            const wrapper = document.createElement("span");
            wrapper.classList.add("char-wrap");
            char.parentNode.appendChild(wrapper);
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
        applySplitting(); // Ensure Splitting.js is applied before animations
        aboutImageAnimation();
        headingAnimation();
        contentAnimation();
        listAnimation();
    });

    onUnmounted(() => {
        // Cleanup all ScrollTrigger instances to prevent memory leaks
        scrollTriggers.forEach(st => st.kill());
    });
}


export function useFeaturesScrollAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-features',
            end: 'bottom bottom',
            scrub: true,
            toggleActions: 'restart none reverse',
            pin: '.features-wrapper',
        },
    })

    tl.from('.features-card', {
        opacity: 0,
        yPercent: 50,
        xPercent: 35,
        scale: 1.25,
        duration: 1,
        stagger: { each: 1, from: 'end' },
    })
}
