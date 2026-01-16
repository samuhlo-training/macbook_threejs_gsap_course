<script setup lang="ts">
/**
 * [COMPONENT] :: HIGHLIGHTS_GRID
 * ----------------------------------------------------------------------
 * Bento-style grid highlighting key features.
 *
 * Complex Logic:
 * - Conditional animations (GSAP MatchMedia) for Mobile/Desktop.
 * - Strict memory cleanup management (Garbage Collection).
 * - Use of class selectors for batch animations.
 *
 * @module    src/components/Highlights
 * ----------------------------------------------------------------------
 */
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
// Store GSAP context to revert ALL animations created in this component
// at once. This is crucial in SPAs to avoid memory leaks.
let ctx: gsap.Context;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================
onMounted(() => {
  // [MATCH_MEDIA] : Responsive Animations
  // gsap.matchMedia() allows defining animations that ONLY exist
  // at certain breakpoints. If the window changes, GSAP handles
  // reverting/recreating as needed.
  const mm = gsap.matchMedia();

  // Create context. Everything animated inside this callback
  // will be recorded in 'ctx'.
  ctx = gsap.context(() => {
    
    mm.add({
      // Define readable "conditions"
      isMobile: "(max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
    }, (context) => {
      // Extract current boolean
      const { isMobile } = context.conditions as { isMobile: boolean };

      // [SETUP] : Initial State
      // Prepare elements hidden and shifted down.
      gsap.set(['.left-column', '.right-column'], { y: 50, opacity: 0 });

      // [ANIMATION] : Entrance
      // Animate both columns to their original position.
      gsap.to(['.left-column', '.right-column'], {
          scrollTrigger: {
              trigger: '.masonry',
              // Desktop: Starts when masonry top reaches center.
              // Mobile: we wait a bit longer (bottom bottom).
              start: isMobile ? 'bottom bottom' : 'top center'
          },
          y: 0, 
          opacity: 1,
          stagger: 0.5, // 0.5s de retraso entre la columna izq y der
          duration: 1,
          ease: 'power1.inOut'
      });
    });

  });
})

onUnmounted(() => {
  // [CLEANUP] :: MEMORY_MANAGEMENT
  // Revert context. This kills ScrollTriggers, MatchMedias
  // and returns DOM elements to their original pre-JS CSS style.
  if (ctx) ctx.revert(); 
})
</script>

<template>
  <section id="highlights">
    <h2>There’s never been a better time to upgrade.</h2>
    <h3>Here’s what you get with the new MacBook Pro.</h3>

    <div class="masonry">
      <div class="left-column">
        <div>
          <img src="/laptop.png" alt="Laptop" />
          <p>Fly through demanding tasks up to 9.8x faster.</p>
        </div>
        <div>
          <img src="/sun.png" alt="Sun" />
          <p>A stunning <br />
            Liquid Retina XDR <br />
            display.</p>
        </div>
      </div>
      <div class="right-column">
        <div class="apple-gradient">
          <img src="/ai.png" alt="AI" />
          <p>Built for <br />
            <span>Apple Intelligence.</span></p>
        </div>
        <div>
          <img src="/battery.png" alt="Battery" />
          <p>Up to
            <span class="green-gradient"> 14 more hours </span>
            battery life.
            <span class="text-dark-100"> (Up to 24 hours total.)
            </span></p>
        </div>
      </div>
    </div>
  </section>
</template>