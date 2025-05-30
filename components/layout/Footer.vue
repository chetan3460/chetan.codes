<template>
    <footer class="footer">
        <div class="footer__wrapper  grid custom-container grid-cols-12 gap-4">
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
                    <!-- <li class="social__item">
                        <a href="https://codepen.io/Bluxart" title="Follow Me on CodePen" target="_blank"
                            rel="noopener noreferrer nofollow" data-pointer="simple">
                            <span>CodePen</span>
                        </a>
                    </li> -->

                </ul>
            </div>
            <div class="footer__block footer__block--right">
                <p class="footer__copyrights">&copy;2025 - Chetan Dhargalkar</p>
            </div>
        </div>


    </footer>
</template>

<style>
/* Footer */

.footer {
    border-top: 1px solid var(--col-border);
    margin-top: 12vh;
    position: relative;
    width: 100%;
    z-index: 3;
}

.footer__wrapper {
    height: 6.25rem;
    width: 100%;
}

.footer__block {
    align-items: center;
    display: flex;
}

.footer__block--left {
    grid-column: 1 / span 4;
    justify-content: flex-start;
}

.footer__block--right {
    grid-column: 9 / span 4;
    justify-content: flex-end;
}

.footer__socials {
    display: flex;
}

.footer__socials li {
    color: var(--col-text);
}

.footer__socials li:before {
    content: "/";
    display: inline-block;
    margin: 0 1.25rem;
    position: relative;
}

.footer__socials li:first-child:before {
    margin-left: 0;
}

.footer__socials li:last-child:after {
    content: "/";
    display: inline-block;
    margin-left: 1.25rem;
    position: relative;
}

.footer__socials li a {
    position: relative;
}

.footer__socials li a span {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.0625rem;
    text-transform: uppercase;
}

.footer__socials li a:after {
    background-color: var(--col-accent);
    bottom: -0.125rem;
    content: "";
    height: 0.125rem;
    left: 0;
    position: absolute;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.5s var(--ease-in-out-cubic);
    width: 100%;
    z-index: 0;
}

.footer__copyrights {
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
}

@media (min-width: 1025px) and (hover: hover) and (pointer: fine) {
    .footer__socials li a:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
}

@media (max-width: 1024px) {
    .footer__wrapper {
        height: auto;
        padding-bottom: 1.875rem;
        padding-top: 1.875rem;
    }

    .footer__block {
        grid-column: 1 / span 12;
        justify-content: center;
    }
}

@media (max-width: 767px) {
    .footer__socials {
        flex-direction: column;
    }

    .footer__socials li {
        text-align: center;
    }

    .footer__socials li:first-child:before,
    .footer__socials li:last-child:after {
        display: none;
    }

    .footer__socials li:before {
        content: "-";
        display: block;
        margin: 0;
    }

    .footer__copyrights {
        font-size: 0.875rem;
        margin-top: 1.25rem;
    }
}
</style>