<script setup lang="ts">
/**
 * [COMPONENT] :: HERO_SECTION
 * ----------------------------------------------------------------------
 * Initial impact section ("Above the Fold").
 * It is the first impression the user receives when loading the page.
 *
 * TUTORIAL MODE:
 * This is the "face" of the website. It uses a video element that we control directly 
 * via JavaScript (using a 'ref') to change its playback speed or trigger it.
 *
 * Technical Logic:
 * - Direct DOM manipulation (Template Refs) to control the video.
 * - PlaybackRate adjustment for stylistic effects.
 *
 * @module    src/components/Hero
 * ----------------------------------------------------------------------
 */
import { ref, onMounted } from 'vue';

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
// Create a "DOM Reference" (Template Ref).
// Initially null, but Vue will populate it when the component mounts.
const videoRef = ref<HTMLVideoElement | null>(null);

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================
onMounted(() => {
  // Verify the ref exists before attempting to access its properties.
  // This is a good defensive practice in Vue.
  if (videoRef.value) {
    // Speed up the video to 2x (playbackRate) for a more dynamic feel.
    videoRef.value.playbackRate = 2;
  }
});
</script>

<template>
  <section id="hero">
    <div>
      <h1>MacBook Pro</h1>
      <img src="/title.png" alt="MacBook Title" />
    </div>

    <!-- 
      [REF_BINDING] :: VIDEO_CONTROL
      The 'ref="videoRef"' attribute connects this HTML element
      with the const videoRef variable in the script.
    -->
    <video ref="videoRef" src="/videos/hero.mp4" autoPlay muted playsInline></video>

    <button>Buy</button>

    <p>From $1599 or $133/mo for 12 months</p>
  </section>
</template>