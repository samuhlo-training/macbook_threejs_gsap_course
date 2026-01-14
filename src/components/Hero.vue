<script setup>
import { ref, onMounted } from 'vue';

const videoRef = ref(null);
onMounted(() => {
  if (videoRef.value) {
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

    <!-- El ref se vincula automáticamente a la variable con el mismo nombre -->
    <video ref="videoRef" src="/videos/hero.mp4" autoPlay muted playsInline></video>

    <button>Buy</button>

    <p>From $1599 or $133/mo for 12 months</p>
  </section>
</template>