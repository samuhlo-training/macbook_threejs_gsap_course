<script setup lang="ts">
/**
 * [COMPONENT] :: MODEL_SWITCHER
 * ----------------------------------------------------------------------
 * Smart component managing the transition between the 3D models
 * of the 14" and 16" MacBook Pro.
 *
 * Responsibilities:
 * 1. Load both models into the scene.
 * 2. Manage entry/exit animation based on screen size.
 * 3. Control orbital camera (rotation).
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
  scale: number // Current scale factor based on window width
  isMobile: boolean // Flag to determine if we are on mobile
}>()

// =====================================================================
// [SECTION] :: CONSTANTS & CONFIG
// =====================================================================
const ANIMATION_DURATION = 1 // Seconds for movement/opacity transition
const OFFSET_DISTANCE = 5 // Distance in 3D units to move model off-screen
const SCALE_LARGE_DESKTOP = 0.08 // Specific scale for large desktop
const SCALE_LARGE_MOBILE = 0.05 // Specific scale for large mobile

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
/**
 * Refs to TresJS groups.
 * These are the "boxes" containing our models that we will move with GSAP.
 */
const smallMacbookRef = ref()
const largeMacbookRef = ref()

/**
 * Control flag for first load.
 * Allows us to avoid the initial "sliding" animation.
 */
const isFirstRun = ref(true)

// =====================================================================
// [SECTION] :: ANIMATION HELPERS
// =====================================================================

/**
 * [ANIMATION] :: FADE_MESHES
 * Recursively traverses a 3D group and animates the opacity of all its materials.
 *
 * @param group    - The root object/group to traverse (Object3D).
 * @param opacity  - Target opacity value (0 = invisible, 1 = visible).
 * @param duration - Time in seconds to complete the transition.
 */
const fadeMeshes = (group: any, opacity: number, duration: number) => {
  if (!group) return

  group.traverse((child: any) => {
    // We are only interested in Meshes that have visible material
    if (child.isMesh) {
      child.material.transparent = true // Ensure it supports transparency
      gsap.to(child.material, { opacity, duration })
    }
  })
}

/**
 * [ANIMATION] :: MOVE_GROUP
 * Moves an entire group on the X axis.
 *
 * @param group    - The object/group to move.
 * @param x        - Target X position.
 * @param duration - Time in seconds to complete the movement.
 */
const moveGroup = (group: any, x: number, duration: number) => {
  if (!group) return

  gsap.to(group.position, { x, duration })
}

// =====================================================================
// [SECTION] :: COMPUTED LOGIC
// =====================================================================
/**
 * Determines which MacBook should be shown based on current scale.
 * Returns true if we should show the 16" model (Large).
 */
const showLargeMacbook = computed(() => {
  return props.scale === SCALE_LARGE_DESKTOP || props.scale === SCALE_LARGE_MOBILE
})

// =====================================================================
// [SECTION] :: REACTIVE WATCHERS
// =====================================================================
/**
 * [WATCHER] :: SCALE_TRANSITION_MANAGER
 * The brains of the operation. Watches for scale changes (props.scale)
 * and model availability (refs).
 *
 * Strategy:
 * 1. If FIRST run (load), move models instantly (duration 0).
 * 2. If subsequent interaction, smoothly animate transition.
 */
watch(
  [() => props.scale, smallMacbookRef, largeMacbookRef],
  () => {
    // GUARD: If models haven't loaded yet, abort.
    if (!smallMacbookRef.value || !largeMacbookRef.value) return

    // LOGIC: First time = Teleport (0s). Next times = Animation (1s).
    const duration = isFirstRun.value ? 0 : ANIMATION_DURATION

    if (showLargeMacbook.value) {
      // CASE A: Show Large (16")
      // 1. Move small out (-5) and large to center (0)
      moveGroup(smallMacbookRef.value, -OFFSET_DISTANCE, duration)
      moveGroup(largeMacbookRef.value, 0, duration)

      // 2. Fade out small and show large
      fadeMeshes(smallMacbookRef.value, 0, duration)
      fadeMeshes(largeMacbookRef.value, 1, duration)
    } else {
      // CASE B: Show Small (14")
      // 1. Move small to center (0) and large out (+5)
      moveGroup(smallMacbookRef.value, 0, duration)
      moveGroup(largeMacbookRef.value, OFFSET_DISTANCE, duration)

      // 2. Show small and fade out large
      fadeMeshes(smallMacbookRef.value, 1, duration)
      fadeMeshes(largeMacbookRef.value, 0, duration)
    }

    // STATE: Initial load finished.
    if (isFirstRun.value) {
      isFirstRun.value = false
    }
  },
  {
    immediate: true, // Execute on mount
    flush: 'post', // WAIT for DOM/Template to render to access refs
  },
)
</script>

<template>
  <!-- Orbital controls: rotation only, no zoom or pan -->
  <OrbitControls
    :enable-pan="false"
    :enable-zoom="false"
    :min-polar-angle="Math.PI / 6"
    :max-polar-angle="Math.PI - Math.PI / 6"
  />

  <!-- 16 Inch Mesh Group -->
  <TresGroup ref="largeMacbookRef">
    <MacbookModel16 :scale="isMobile ? 0.05 : 0.08" />
  </TresGroup>

  <!-- 14 Inch Mesh Group -->
  <TresGroup ref="smallMacbookRef">
    <MacbookModel14 :scale="isMobile ? 0.03 : 0.06" />
  </TresGroup>
</template>