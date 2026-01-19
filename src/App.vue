<script setup lang="ts">
/**
 * [ROOT] :: APP_ENTRY_POINT
 * ----------------------------------------------------------------------
 * Root component of the application. Acts as the main orchestrator,
 * assembling all visual sections of the landing page in order.
 *
 * TUTORIAL MODE:
 * Think of App.vue as the "Frame" or "Skeleton" of your site.
 * It stacks the components (Hero, Features, etc.) vertically.
 * It also registers global animations (GSAP) so they are available everywhere.
 *
 * Responsibilities:
 * 1. Global initialization of animation libraries (GSAP).
 * 2. Definition of the page's semantic structure.
 * 3. Entry point for global styles.
 *
 * @module    src/App
 * ----------------------------------------------------------------------
 */

import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import ProductViewer from './components/ProductViewer.vue'
import Showcase from './components/Showcase.vue'
import Performance from './components/Performance.vue'
import Features from './components/Features.vue'
import Highlights from './components/Highlights.vue'
import Footer from './components/Footer.vue'

// [LIB] :: ANIMATION & SCROLL
// ---------------------------------------------------------------------
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Lenis from 'lenis'
import { onMounted, onUnmounted } from 'vue' // Needed for lifecycle init

// =====================================================================
// [SECTION] :: GLOBAL CONFIGURATION
// =====================================================================
// Register GSAP plugins once at the root level.
gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * [TUTORIAL] :: LENIS_INTEGRATION
 * ---------------------------------------------------------------------
 * We use 'Lenis' for smooth scrolling. This is modern standard for 
 * "luxury" feel websites. 
 * 
 * WHY IS THIS CODE HERE?
 * 1. Lenis needs to take control of the global window scroll.
 * 2. GSAP ScrollTrigger needs to know EXACTLY where Lenis is, 
 *    otherwise specific animations (like pinning) will jitter or break.
 * 
 * THE SYNC LOOP:
 * Browser scrolls -> Lenis calculates smooth position -> Lenis tells GSAP
 * -> GSAP updates ScrollTriggers -> Validates animations.
 */
// Needed for lifecycle init

// Register GSAP plugins once at the root level.
gsap.registerPlugin(ScrollTrigger, SplitText)

// Store references for cleanup
let lenis: Lenis | null = null
let rafCallback: ((time: number) => void) | null = null

onMounted(() => {
  // 1. Initialize Lenis
  lenis = new Lenis()

  // 2. Add Lenis to the GSAP animation loop (RAf)
  // entirely replacing the default GSAP ticker/raf for scrolling.
  lenis.on('scroll', ScrollTrigger.update)

  // 3. Connect GSAP Ticker to Lenis
  // This ensures GSAP and Lenis update at the exact same refresh rate (usually 60fps or monitor Hz)
  rafCallback = (time: number) => {
    lenis?.raf(time * 1000) // Convert to milliseconds
  }
  gsap.ticker.add(rafCallback)

  // 4. Disable GSAP's own lag smoothing to avoid conflicts with Lenis
  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  if (rafCallback) {
    gsap.ticker.remove(rafCallback)
  }
  lenis?.destroy()
  lenis = null
})

</script>

<template>
  <!-- 
    [LAYOUT] :: STACKED_SECTIONS
    Sequential rendering of components.
    Vue renders this as fragments in the DOM.
  -->
  <NavBar />
  <Hero />  
  <ProductViewer />
  <Showcase />
  <Performance />
  <Features />
  <Highlights />
  <Footer />
</template>

