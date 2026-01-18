<script setup lang="ts">
/**
 * [COMPONENT] :: PRODUCT_VIEWER
 * ----------------------------------------------------------------------
 * Main container for 3D product visualization.
 * Acts as the "master" page or section where UI and 3D Canvas converge.
 *
 * TUTORIAL MODE:
 * The "Container" for our 3D experience.
 * It connects the HTML UI (buttons) with the 3D world (TresCanvas).
 * It shows how to pass State (Pinia) down to 3D components.
 * 
 * Responsibilities:
 * 1. Connect with Store (Pinia) to manage global state.
 * 2. Render UI controls (HTML/CSS) for color and size.
 * 3. Initialize the 3D environment (TresCanvas, Lights, Camera).
 * 4. Orchestrate the loading of the complex 3D component (ModelSwitcher).
 *
 * @module    components
 * ----------------------------------------------------------------------
 */
import { storeToRefs } from 'pinia'
import { useMacbookStore } from '../store'
import { TresCanvas } from '@tresjs/core'

/**
 * [IMPORT] :: 3D COMPONENTS
 * Import specific sub-components for the TresJS environment.
 * - StudioLights: Studio lighting configuration.
 * - ModelSwitcher: Model switching logic.
 */
import StudioLights from './tresjs/StudioLights.vue'
import ModelSwitcher from './tresjs/ModelSwitcher.vue'


import { useMediaQuery } from '../composables/useMediaQuery'

// =====================================================================
// [SECTION] :: STORE INTEGRATION
// =====================================================================
const store = useMacbookStore()
/**
 * We use storeToRefs to maintain reactivity when destructuring.
 * If we did `const { color } = store`, we would lose the reactive connection.
 */
const { color, scale } = storeToRefs(store)
const { setColor, setScale } = store

// =====================================================================
// [SECTION] :: RESPONSIVE LOGIC
// =====================================================================
const isMobile = useMediaQuery('(max-width: 1024px)')
</script>

<template>
  <section id="product-viewer" class="w-full">
    <!-- 
      [SECTION] :: UI & CONTROLS (HTML LAYER)
      This layer lives "above" the 3D canvas. It is standard HTML.
    -->
    <h2>Take a closer look.</h2>

    <div class="controls">
      <div class="flex-center gap-5 mt-5">
        
        <!-- CONTROL :: COLOR SELECTOR -->
        <div class="color-control">
          <!-- Option: Silver (#adb5bd) -->
          <div
            :class="['bg-neutral-300', { active: color === '#adb5bd' }]"
            @click="setColor('#adb5bd')"
          ></div>
          <!-- Option: Space Grey (#2e2c2e) -->
          <div
            :class="['bg-neutral-900', { active: color === '#2e2c2e' }]"
            @click="setColor('#2e2c2e')"
          ></div>
        </div>

        <!-- CONTROL :: SIZE SELECTOR -->
        <div class="size-control">
          <!-- Option: 14 Inches -->
          <div
            :class="scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white'"
            @click="setScale(0.06)"
          >
            <p>14"</p>
          </div>
          <!-- Option: 16 Inches -->
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
      [SECTION] :: 3D SCENE (WEBGL LAYER)
      TresJS comes into play here. Everything inside <TresCanvas> is 3D magic.
    -->
    <TresCanvas id="canvas">
      <!-- CAMERA: The spectator's eye -->
      <TresPerspectiveCamera :position="[0, 2, 5]" :fov="50" :near="0.1" :far="100" />
      
      <!-- 
        SUSPENSE: Async loading handling.
        Since 3D models are heavy, Suspense allows us to wait until they are ready
        before attempting to render them, avoiding crashes.
      -->
      <Suspense>
        <TresGroup>
          <!-- LIGHTING -->
          <StudioLights />

          <!-- MAIN CONTENT -->
          <ModelSwitcher :scale="scale" :isMobile="isMobile" />
        </TresGroup>
      </Suspense>
      
    </TresCanvas>
  </section>
</template>
