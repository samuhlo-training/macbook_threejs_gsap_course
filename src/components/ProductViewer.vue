<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMacbookStore } from '../store'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
// Importamos el modelo MacBook convertido a Vue
import MacbookModel14 from './models/Macbook-14.vue'
import StudioLights from './tresjs/StudioLights.vue'

const store = useMacbookStore()
const { color, scale } = storeToRefs(store)
const { setColor, setScale } = store
</script>

<template>
  <section id="product-viewer" class="w-full">
    <!-- Headers y estructura -->
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

    <!--
    TRESCANVAS CON MODELO GLTF
    ==========================
    Ya NO necesitamos Suspense porque useGLTF de TresJS/Cientos
    no es async - retorna refs reactivos que se actualizan cuando carga.
    
    El componente MacbookModel14 usa v-if="state?.scene" internamente
    para esperar a que el modelo esté listo.
    -->
    <TresCanvas id="canvas">
      <TresPerspectiveCamera :position="[0, 2, 5]" :fov="50" :near="0.1" :far="100" />
      <TresAmbientLight :intensity="3" />
      <TresDirectionalLight :position="[2, 2, 2]" :intensity="2" />
      
      <!--
      El modelo MacBook se renderiza directamente.
      - position: ubicación en el espacio 3D
      - scale: tamaño del modelo (controlado por el store)
      -->
      <StudioLights />
      <MacbookModel14 
        :position="[0, 0, 0]" 
        :scale="scale"
        :rotation="[0,0,0]"
      />
     
      <OrbitControls make-default :enableZoom="false" />
    </TresCanvas>
  </section>
</template>
