<!-- <template>
    <footer data-theme="footer01" class="s is--footer">

        <div class="c is--footer">
            <section class="contact content-section">
                <div class="container grid">
                    <div class="grid__col--full">
                        <a class="contact__link" href="mailto:info@alessioatzeni.com" title="Contact Me"
                            data-pointer="link" data-pointer-text="Say Hi! 🤗">
                            <h2 class="contact__title">Let's Talk</h2>
                        </a>
                    </div>
                </div>
            </section>
        </div>
        <div class="w-layout-grid footer__overlay-w">
            <div id="w-node-_0afe8161-d88a-336c-57eb-ac8656d1aab4-550a09e8" class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
            <div class="footer__overlay"></div>
        </div>
    </footer>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function revealFooter() {
    gsap.to(".footer__overlay-w", { opacity: 1 });
    gsap.timeline({
        scrollTrigger: {
            trigger: ".s.is--footer",
            start: "0% 90%",
            end: "95% 100%",
        },
    }).fromTo(
        ".footer__overlay",
        { scale: 1 },
        {
            scale: 0,
            transformOrigin: "center center",
            stagger: { from: "random", amount: 0.4, each: 0.8 },
            duration: 1,
            ease: "power2.out",
        }
    );
}
onMounted(() => {
    revealFooter();
});
</script>
<style scoped>
footer[data-theme=footer01] {
    background-color: #e7ffd9;
    color: #223307;
    transition: background-color .5sease-out, color .5sease-out;
    position: relative;
}

.c.is--footer {
    padding-top: 4.5rem;
    padding-bottom: 4.5rem;
}

.c {
    flex-direction: column;
    align-self: stretch;
    align-items: flex-start;
    width: 100%;
    max-width: 128rem;
    margin-left: auto;
    margin-right: auto;
    padding: 11.5rem 4rem;
    display: flex;
    position: relative;
}

.footer-w {
    grid-column-gap: 22rem;
    grid-row-gap: 22rem;
    grid-template-rows: auto;
    grid-template-columns: minmax(auto, 38.7rem) auto;
    width: 100%;
    grid-auto-columns: 1fr;
    display: grid;
}

.footer__overlay-w {
    grid-column-gap: 0rem;
    grid-row-gap: 0rem;
    opacity: 0;
    pointer-events: none;
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    width: 100%;
    height: 100%;
    display: grid;
    position: absolute;
    inset: 0%;
}

.footer__overlay {
    background-color: #223307;
}

.footer__overlay {
    background-color: currentColor;
}

.footer__overlay {
    width: 100%;
    height: 100%;
}
</style> -->

<template>
    <footer class="footer">
        <div class="footer__wrapper container grid custom-container grid-cols-12 gap-4">
            <div class="footer__block footer__block--left">
                <ul class="footer__socials">
                    <li class="social__item">
                        <a href="https://www.linkedin.com/in/alessioatzeni/" title="Follow Me on LinkedIn"
                            target="_blank" rel="noopener noreferrer nofollow" data-pointer="simple">
                            <span>LinkedIn</span>
                        </a>
                    </li>
                    <li class="social__item">
                        <a href="https://github.com/Bluxart" title="Follow Me on GitHub" target="_blank"
                            rel="noopener noreferrer nofollow" data-pointer="simple">
                            <span>GitHub</span>
                        </a>
                    </li>
                    <li class="social__item">
                        <a href="https://codepen.io/Bluxart" title="Follow Me on CodePen" target="_blank"
                            rel="noopener noreferrer nofollow" data-pointer="simple">
                            <span>CodePen</span>
                        </a>
                    </li>
                    <li class="social__item">
                        <a href="https://x.com/Bluxart" title="Follow Me on X/Twitter" target="_blank"
                            rel="noopener noreferrer nofollow" data-pointer="simple">
                            <span>X/Twitter</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="footer__block footer__block--right">
                <p class="footer__copyrights">&copy;2025 - Chetan Dhargalkar</p>
            </div>
        </div>
    </footer>
</template>