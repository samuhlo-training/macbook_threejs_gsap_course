<script setup lang="ts">
/**
 * [COMPONENT] :: PERFORMANCE
 * ----------------------------------------------------------------------
 * Section displaying performance metrics and scattering images on scroll.
 */

import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { performanceImages, performanceImgPositions } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context;
let mm: gsap.MatchMedia;

onMounted(() => {
    mm = gsap.matchMedia();

    ctx = gsap.context(() => {
        // [ANIMATION] :: TEXT_REVEAL (Global)
        gsap.fromTo(
            "#performance .content p",
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: "#performance .content p",
                    start: "top bottom",
                    end: "top center",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }
        );
    });

    // [ANIMATION] :: IMAGE_SCATTER (Desktop Only)
    mm.add({
        isDesktop: "(min-width: 1025px)", // Matching !isMobile (<= 1024) logic
    }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        if (!isDesktop) return;

        // Use a local context for the scoped animations
        const localCtx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
                scrollTrigger: {
                    trigger: '#performance',
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return; // Skip center image

                const selector = `.${item.id}`;
                const vars: TweenVars = {}; // Using any/custom type logic for now since GSAP types can be strict

                if (typeof item.left === "number") vars.left = `${item.left}%`;
                if (typeof item.right === "number") vars.right = `${item.right}%`;
                if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;
                if ((item as any).transform) vars.transform = (item as any).transform;

                tl.to(selector, vars, 0);
            });
        });

        // Return a cleanup function
        return () => {
            localCtx.revert();
        };
    });
});

onUnmounted(() => {
    mm?.revert();
    ctx?.revert();
});

// Helper type for dynamic vars if needed, though 'any' works for the object construction above
interface TweenVars {
    [key: string]: string | number;
}
</script>

<template>
    <section id="performance">
        <h2>Next-level graphics performance. Game on.</h2>

        <div class="wrapper">
            <img 
                v-for="(item, index) in performanceImages" 
                :key="index"
                :src="item.src"
                :class="item.id"
                :alt="`Performance Image #${index + 1}`"
            />
        </div>

        <div class="content">
            <p>
                Run graphics-intensive workflows with a responsiveness that keeps up
                with your imagination. The M4 family of chips features a GPU with a
                second-generation hardware-accelerated ray tracing engine that renders
                images faster, so
                <span class="text-white">
                    gaming feels more immersive and realistic than ever.
                </span>
                And Dynamic Caching optimizes fast on-chip memory to dramatically
                increase average GPU utilization — driving a huge performance boost
                for the most demanding pro apps and games.
            </p>
        </div>
    </section>
</template>