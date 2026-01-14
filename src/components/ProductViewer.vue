<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMacbookStore } from '../store';
import { TresCanvas } from '@tresjs/core';
import { Box, OrbitControls } from '@tresjs/cientos';
const store = useMacbookStore();
const { color, scale } = storeToRefs(store);
const { setColor, setScale } = store;
</script>

<template>
  <section id="product-viewer" class="w-full">
    <!-- Headers y estructura asumiendo lo que mostraste antes -->
    <h2>Take a closer look.</h2>

    <div class="controls">
     

      <div class="flex-center gap-5 mt-5">
        <div class="color-control">
          <div
            :class="['bg-neutral-300', { active: color === '#adb5bd' }]"
            @click="setColor('#adb5bd')"
          ></div>
          <div
            :class="['bg-neutral-900', { active: color === '#2e2c2e' }]"
            @click="setColor('#2e2c2e')"
          ></div>
        </div>

        <div class="size-control">
          <div
            :class="scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white'"
            @click="setScale(0.06)"
          >
            <p>14"</p>
          </div>
          <div
            :class="scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white'"
            @click="setScale(0.08)"
          >
            <p>16"</p>
          </div>
        </div>
      </div>
    </div>
    <TresCanvas id="canvas">
      <TresPerspectiveCamera :position="[0, 2, 5]" :fov="50" :near="0.1" :far="100" />
      <TresAmbientLight :intensity="2" />
      <TresDirectionalLight :position="[2, 2, 2]" :intensity="2" />
      
      <!-- Usamos Box de cientos que es más simple -->
      <!-- :key="color" fuerza a recrear el objeto al cambiar color, evitando el error de Vue 3.5 + Tres -->
      <Box 
        :position="[0, 0, 0]" 
        :scale="scale * 10" 
        :args="[1, 1, 1]"
        :key="color"
      >
         <TresMeshStandardMaterial :color="color" />
      </Box>
      <OrbitControls :enableZoom="false"/>
    </TresCanvas>
  </section>
</template>

