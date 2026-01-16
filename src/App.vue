<script setup lang="ts">
/**
 * [ROOT] :: APP_ENTRY_POINT
 * ----------------------------------------------------------------------
 * Root component of the application. Acts as the main orchestrator,
 * assembling all visual sections of the landing page in order.
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
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

// =====================================================================
// [SECTION] :: GLOBAL CONFIGURATION
// =====================================================================
// Register GSAP plugins once at the root level.
// ScrollTrigger: Enables scroll-based animations.
// SplitText: Allows splitting text for letter-by-letter animations.
gsap.registerPlugin(ScrollTrigger, SplitText)

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

