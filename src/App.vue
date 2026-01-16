<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import ProductViewer from './components/ProductViewer.vue'
import Showcase from './components/Showcase.vue'
import Performance from './components/Performance.vue'
import Features from './components/Features.vue'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { onMounted } from 'vue'


onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(SplitText)
})
</script>

<template>
  <NavBar />
  <Hero />  
  <ProductViewer />
  <Showcase />
  <Performance />
  <Features />
</template>
