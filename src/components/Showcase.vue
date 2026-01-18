
<script setup lang="ts">
/**
 * [COMPONENT] :: SHOWCASE
 * ----------------------------------------------------------------------
 * Section demonstrating a mask-reveal effect using GSAP ScrollTrigger.
 * 
 * TUTORIAL MODE:
 * A scroll-based "Reveal" animation.
 * It uses a SVG mask that expands as you scroll, revealing the video underneath.
 * Key Concept: Using 'pin: true' to keep the section in place while the animation plays.
 *
 * @module    components/Showcase.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
let ctx: gsap.Context;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Initializes the mask expansion animation linked to scroll.
 */
onMounted(() => {
    // We use matchMedia directly for responsive GSAP animations as it handles cleanup/reverting automatically
    // and is the recommended standard for GSAP in React/Vue.
    const mm = gsap.matchMedia();

    // Adding context for proper cleanup of non-matchMedia GSAP instances if any, 
    // though matchMedia handles its own added animations.
    ctx = gsap.context(() => {
        
        mm.add({
            // React logic: !isTablet (where isTablet is <= 1024px)
            // So animation should run on > 1024px.
            isDesktop: "(min-width: 1025px)", 
        }, (context) => {
            const { isDesktop } = context.conditions as { isDesktop: boolean };

            if (isDesktop) {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#showcase',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                        pin: true,
                    }
                });

                timeline
                    .to('.mask img', {
                        transform: 'scale(1.15)',
                    })
                    .to('.content', { 
                        opacity: 1, 
                        y: 0, 
                        ease: 'power1.in' 
                    });
            }
        });

    });
});

/**
 * [ hook ] :: ON_UNMOUNTED
 * Cleanup GSAP context.
 */
onUnmounted(() => {
    ctx?.revert(); // Reverts matchMedia as well since it was created inside (or if attached to scope)
});
</script>

<template>
  <section id="showcase">
            <div class="media">
                <video src="/videos/game.mp4" loop muted autoplay playsinline />
                <div class="mask">
                    <img src="/mask-logo.svg" alt="" />
                </div>
            </div>

            <div class="content">
                <div class="wrapper">
                    <div class="lg:max-w-md">
                        <h2>Rocket Chip</h2>

                        <div class="space-y-5 mt-7 pe-10">
                            <p>
                                Introducing
                                <span class="text-white">
                                    M4, the next generation of Apple silicon
                                </span>
                                . M4 powers
                            </p>
                            <p>
                                It drives Apple Intelligence on iPad Pro, so you can write, create, and accomplish more with ease. All in a design that’s unbelievably thin, light, and powerful.
                            </p>
                            <p>
                                A brand-new display engine delivers breathtaking precision, color accuracy, and brightness. And a next-gen GPU with hardware-accelerated ray tracing brings console-level graphics to your fingertips.
                            </p>
                            <p class="text-primary">Learn more about Apple Intelligence</p>
                        </div>
                    </div>

                    <div class="max-w-3xs space-y-14">
                        <div class="space-y-2">
                            <p>Up to</p>
                            <h3>4x faster</h3>
                            <p>pro rendering performance than M2</p>
                        </div>
                        <div class="space-y-2">
                            <p>Up to</p>
                            <h3>1.5x faster</h3>
                            <p>CPU performance than M2</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>



