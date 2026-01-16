<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

let ctx: gsap.Context;

onMounted(() => {
  const mm = gsap.matchMedia();

  // Adding context for proper cleanup
  ctx = gsap.context(() => {
    
    mm.add({
      isMobile: "(max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      // Animation logic
      gsap.to(['.left-column', '.right-column'], {
          scrollTrigger: {
              trigger: '.masonry',
              start: isMobile ? 'bottom bottom' : 'top center'
          },
          y: 0,
          opacity: 1,
          stagger: 0.5,
          duration: 1,
          ease: 'power1.inOut'
      });
    });

  });
})

onUnmounted(() => {
  if (ctx) ctx.revert(); // Reverts matchMedia as well since it was created inside
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