<script setup lang="ts">
/**
 * [COMPONENT] :: MODEL_SWITCHER
 * ----------------------------------------------------------------------
 * Componente inteligente que gestiona la transición entre los modelos 3D
 * del MacBook Pro de 14" y 16".
 *
 * Responsabilidades:
 * 1. Cargar ambos modelos en la escena.
 * 2. Gestionar la animación de entrada/salida según el tamaño de pantalla.
 * 3. Controlar la cámara orbital (rotación).
 *
 * @module    components/tresjs
 * ----------------------------------------------------------------------
 */
import { ref, watch, computed } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import gsap from 'gsap'

import MacbookModel16 from '../models/Macbook-16.vue'
import MacbookModel14 from '../models/Macbook-14.vue'

// =====================================================================
// [SECTION] :: COMPONENT PROPS
// =====================================================================
const props = defineProps<{
  scale: number // Factor de escala actual basado en el ancho de la ventana
  isMobile: boolean // Flag para determinar si estamos en dispositivo móvil
}>()

// =====================================================================
// [SECTION] :: CONSTANTS & CONFIG
// =====================================================================
const ANIMATION_DURATION = 1 // Segundos que tarda la transición de movimiento/opacidad
const OFFSET_DISTANCE = 5 // Distancia en unidades 3D para sacar el modelo de pantalla
const SCALE_LARGE_DESKTOP = 0.08 // Escala específica para desktop grande
const SCALE_LARGE_MOBILE = 0.05 // Escala específica para móvil grande

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
/**
 * Refs a los grupos de TresJS.
 * Son las "cajas" que contienen nuestros modelos y que moveremos con GSAP.
 */
const smallMacbookRef = ref()
const largeMacbookRef = ref()

/**
 * Flag de control para la primera carga.
 * Nos permite evitar la animación de "deslizamiento" inicial.
 */
const isFirstRun = ref(true)

// =====================================================================
// [SECTION] :: ANIMATION HELPERS
// =====================================================================

/**
 * [ANIMATION] :: FADE_MESHES
 * Recorre recursivamente un grupo 3D y anima la opacidad de todos sus materiales.
 *
 * @param group    - El objeto/grupo root a recorrer (Object3D).
 * @param opacity  - Valor objetivo de opacidad (0 = invisible, 1 = visible).
 * @param duration - Tiempo en segundos para completar la transición.
 */
const fadeMeshes = (group: any, opacity: number, duration: number) => {
  if (!group) return

  group.traverse((child: any) => {
    // Solo nos interesan las mallas (Meshes) que tienen material visible
    if (child.isMesh) {
      child.material.transparent = true // Aseguramos que soporte transparencia
      gsap.to(child.material, { opacity, duration })
    }
  })
}

/**
 * [ANIMATION] :: MOVE_GROUP
 * Desplaza un grupo entero en el eje X.
 *
 * @param group    - El objeto/grupo a mover.
 * @param x        - Posición destino en el eje X.
 * @param duration - Tiempo en segundos para completar el movimiento.
 */
const moveGroup = (group: any, x: number, duration: number) => {
  if (!group) return

  gsap.to(group.position, { x, duration })
}

// =====================================================================
// [SECTION] :: COMPUTED LOGIC
// =====================================================================
/**
 * Determina qué MacBook se debe mostrar basado en la escala actual.
 * Devuelve true si debemos mostrar el modelo de 16" (Large).
 */
const showLargeMacbook = computed(() => {
  return props.scale === SCALE_LARGE_DESKTOP || props.scale === SCALE_LARGE_MOBILE
})

// =====================================================================
// [SECTION] :: REACTIVE WATCHERS
// =====================================================================
/**
 * [WATCHER] :: SCALE_TRANSITION_MANAGER
 * El cerebro de la operación. Vigila cambios en la escala (props.scale)
 * y la disponibilidad de los modelos (refs).
 *
 * Estrategia:
 * 1. Si es la PRIMERA ejecución (carga), mueve los modelos instantáneamente (duración 0).
 * 2. Si es una interacción posterior, anima suavemente la transición.
 */
watch(
  [() => props.scale, smallMacbookRef, largeMacbookRef],
  () => {
    // GUARD: Si los modelos no se han cargado aún, abortamos.
    if (!smallMacbookRef.value || !largeMacbookRef.value) return

    // LOGIC: Primera vez = Teletransporte (0s). Siguientes = Animación (1s).
    const duration = isFirstRun.value ? 0 : ANIMATION_DURATION

    if (showLargeMacbook.value) {
      // CASO A: Mostrar Grande (16")
      // 1. Movemos el pequeño fuera (-5) y el grande al centro (0)
      moveGroup(smallMacbookRef.value, -OFFSET_DISTANCE, duration)
      moveGroup(largeMacbookRef.value, 0, duration)

      // 2. Desvanecemos el pequeño y mostramos el grande
      fadeMeshes(smallMacbookRef.value, 0, duration)
      fadeMeshes(largeMacbookRef.value, 1, duration)
    } else {
      // CASO B: Mostrar Pequeño (14")
      // 1. Movemos el pequeño al centro (0) y el grande fuera (+5)
      moveGroup(smallMacbookRef.value, 0, duration)
      moveGroup(largeMacbookRef.value, OFFSET_DISTANCE, duration)

      // 2. Mostramos el pequeño y desvanecemos el grande
      fadeMeshes(smallMacbookRef.value, 1, duration)
      fadeMeshes(largeMacbookRef.value, 0, duration)
    }

    // STATE: Ya hemos terminado la carga inicial.
    if (isFirstRun.value) {
      isFirstRun.value = false
    }
  },
  {
    immediate: true, // Ejecutar al montar el componente
    flush: 'post', // ESPERAR a que el DOM/Template se haya renderizado para tener acceso a los refs
  },
)
</script>

<template>
  <!-- Control de cámara orbital: solo rotación, sin zoom ni desplazamiento -->
  <OrbitControls
    :enable-pan="false"
    :enable-zoom="false"
    :min-polar-angle="Math.PI / 6"
    :max-polar-angle="Math.PI - Math.PI / 6"
  />

  <!-- Grupo Malla 16 Pulgadas -->
  <TresGroup ref="largeMacbookRef">
    <MacbookModel16 :scale="isMobile ? 0.05 : 0.08" />
  </TresGroup>

  <!-- Grupo Malla 14 Pulgadas -->
  <TresGroup ref="smallMacbookRef">
    <MacbookModel14 :scale="isMobile ? 0.03 : 0.06" />
  </TresGroup>
</template>