<template>
    <section class="contact content-section s is--footer" data-liquid-bg-section data-bg-color="#190066">
        <div class="custom-container grid">
            <div class="grid__col--full">
                <div class="relative">
                    <a class="contact__link" href="mailto:chetan.dmc@gmail.com" title="Contact Me" data-pointer="link"
                        data-pointer-text="Say Hi! 🤗">
                        <h2 class="contact__title font-outfit">Let's Talk</h2>
                    </a>
                </div>
            </div>
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
// function revealFooter() {
//     gsap.to(".footer__overlay-w", { opacity: 1 });
//     gsap.timeline({
//         scrollTrigger: {
//             trigger: ".s.is--footer",
//             start: "0% 90%",
//             end: "95% 100%",
//         },
//     }).fromTo(
//         ".footer__overlay",
//         { scale: 1 },
//         {
//             scale: 0,
//             transformOrigin: "center center",
//             stagger: { from: "random", amount: 0.4, each: 0.8 },
//             duration: 1,
//             ease: "power2.out",
//         }
//     );
// }



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
    // revealFooter();

    textRepetitionFx();
    // After DOM duplication and ScrollTrigger creation, force a refresh in case layout shifts
    requestAnimationFrame(() => {
        try { ScrollTrigger.refresh(); } catch (_) { /* no-op */ }
    });
});

</script>
<style>
.contact__title {
    color: var(--col-accent) !important;
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
    background-color: #103228;
    color: #fff;
    grid-area: 1 / 1 / 2 / 2;
    line-height: .839;
    padding-bottom: 1.25rem;
    will-change: transform;
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
    background-color: var(--col-accent);
}

.footer__overlay {
    background-color: #34e8bb;
}

@media (hover: hover) and (pointer:fine) {
    .contact__link span:last-child {
        transition: color .45s ease
    }

    .contact__link:hover span:last-child {
        color: var(--col-accent)
    }
}
</style>
