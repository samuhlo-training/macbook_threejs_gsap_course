<script setup lang="ts">
/**
 * [COMPONENT] :: PRODUCT_VIEWER
 * ----------------------------------------------------------------------
 * Contenedor principal para la visualización 3D del producto.
 * Actúa como la "página" o sección maestra donde convergen la UI y el Canvas 3D.
 * 
 * Responsabilidades:
 * 1. Conectar con el Store (Pinia) para gestionar el estado global.
 * 2. Renderizar los controles de UI (HTML/CSS) para color y tamaño.
 * 3. Inicializar el entorno 3D (TresCanvas, Luces, Cámara).
 * 4. Orquestar la carga del componente 3D complejo (ModelSwitcher).
 *
 * @module    components
 * ----------------------------------------------------------------------
 */
import { storeToRefs } from 'pinia'
import { useMacbookStore } from '../store'
import { TresCanvas } from '@tresjs/core'

/**
 * [IMPORT] :: COMPONENTES 3D
 * Importamos los sub-componentes específicos del entorno TresJS.
 * - StudioLights: Configuración de iluminación de estudio.
 * - ModelSwitcher: Lógica de intercambio de modelos.
 */
import StudioLights from './tresjs/StudioLights.vue'
import ModelSwitcher from './tresjs/ModelSwitcher.vue'


import { useMediaQuery } from '../composables/useMediaQuery'

// =====================================================================
// [SECTION] :: STORE INTEGRATION
// =====================================================================
const store = useMacbookStore()
/**
 * Usamos storeToRefs para mantener la reactividad al desestructurar.
 * Si hiciéramos `const { color } = store`, perderíamos la conexión reactiva.
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
      Esta capa vive "por encima" del canvas 3D. Es HTML estándar.
    -->
    <h2>Take a closer look.</h2>

    <div class="controls">
      <div class="flex-center gap-5 mt-5">
        
        <!-- CONTROL :: COLOR SELECTOR -->
        <div class="color-control">
          <!-- Opción: Silver (#adb5bd) -->
          <div
            :class="['bg-neutral-300', { active: color === '#adb5bd' }]"
            @click="setColor('#adb5bd')"
          ></div>
          <!-- Opción: Space Grey (#2e2c2e) -->
          <div
            :class="['bg-neutral-900', { active: color === '#2e2c2e' }]"
            @click="setColor('#2e2c2e')"
          ></div>
        </div>

        <!-- CONTROL :: SIZE SELECTOR -->
        <div class="size-control">
          <!-- Opción: 14 Pulgadas -->
          <div
            :class="scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white'"
            @click="setScale(0.06)"
          >
            <p>14"</p>
          </div>
          <!-- Opción: 16 Pulgadas -->
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
      Aquí entra en juego TresJS. Todo dentro de <TresCanvas> es magia 3D.
    -->
    <TresCanvas id="canvas">
      <!-- CÁMARA: El ojo del espectador -->
      <TresPerspectiveCamera :position="[0, 2, 5]" :fov="50" :near="0.1" :far="100" />
      
      <!-- 
        SUSPENSE: Manejo de carga asíncrona.
        Como los modelos 3D son pesados, Suspense nos permite esperar a que estén listos
        antes de intentar renderizarlos, evitando fallos.
      -->
      <Suspense>
        <TresGroup>
          <!-- ILUMINACIÓN -->
          <StudioLights />

          <!-- CONTENIDO PRINCIPAL -->
          <ModelSwitcher :scale="scale" :isMobile="isMobile" />
        </TresGroup>
      </Suspense>
      
    </TresCanvas>
  </section>
</template>
