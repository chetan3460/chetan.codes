<template>
    <section class="contact content-section">
        <div class="container grid">
            <div class="grid__col--full">
                <a class="contact__link" href="mailto:info@alessioatzeni.com" title="Contact Me" data-pointer="link"
                    data-pointer-text="Say Hi! 🤗">
                    <h2 class="contact__title !font-outfit">Let's Talk</h2>
                </a>
            </div>
        </div>
    </section>
</template>
<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
}

function textRepetitionFx() {
    const t = document.querySelector(".contact__title");
    if (t) setupTextRepetition(t);
}

function setupTextRepetition(t) {
    createTextLayout(t, 7, 20, 0.2);
    const e = [...t.querySelectorAll("span")].slice(0, -1);
    setBoundaries(t, 7, 20);
    createScrollAnimation(t, e);
    window.addEventListener("resize", () => setBoundaries(t, 7, 20));
}

function createTextLayout(t, e, r, i) {
    const n = Math.floor(e / 2);
    let s = "";
    for (let o = 0; o < e; ++o) {
        const { ty: a, delay: l, scale: c } = calculateTyAndDelay(o, e, n, r, i);
        s += `<span data-delay="${l}" data-ty="${a}" data-scale="${c}">${t.innerHTML}</span>`;
    }
    t.innerHTML = s;
    t.classList.add("text-rep");
}

function calculateTyAndDelay(t, e, r, i, n) {
    let s, o, a;
    if (t === e - 1) {
        s = 0;
        o = 0;
        a = 1;
    } else if (t < r) {
        s = r * i - i * t;
        o = n * (r - t) - n;
        a = 0.5 + (t / r) * 0.5;
    } else {
        s = -1 * (r * i - (t - r) * i);
        o = n * (r - (t - r)) - n;
        a = 0.5 + ((t - r) / r) * 0.5;
    }
    return { ty: s, delay: o, scale: a };
}

function setBoundaries(t, e, r) {
    const i = ((t) => {
        const e = getComputedStyle(t);
        let r = t.clientHeight;
        return r - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom);
    })(t) * Math.floor(e / 2) * (r / 100);
    gsap.set(t, { marginTop: i, paddingBottom: i });
}

function createScrollAnimation(t, e) {
    gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".contact",
                start: "top 90%",
                end: "bottom 90%",
                scrub: true,
            },
        }).to(e, {
            duration: 1,
            ease: "power1",
            transformOrigin: "center center",
            yPercent: (t, e) => e.dataset.ty,
            delay: (t, e) => e.dataset.delay,
            scale: (t, e) => e.dataset.scale,
        });
    });
}

onMounted(() => {
    textRepetitionFx();
});

</script>
<style>
.contact__title {
    color: var(--col-text);
    display: grid;
    font-size: 16vw;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    white-space: nowrap;
}

.contact__title span {
    background-color: #603e2b;
    color: #d8d2cf;
    grid-area: 1 / 1 / 2 / 2;
    line-height: .839;
    padding-bottom: 1.25rem;
    will-change: transform;
}
</style>