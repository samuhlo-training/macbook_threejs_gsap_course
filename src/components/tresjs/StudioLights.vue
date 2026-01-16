<script setup lang="ts">
/**
 * STUDIOLIGHTS - Studio lighting configuration for 3D scenes
 * =========================================================================
 * 
 * This component replicates the functionality of react-three/drei:
 * - Environment with Lightformers (for image-based/HDR lighting)
 * - SpotLights for directional lighting
 * 
 * In TresJS, we use native Three.js components directly.
 * 
 * NOTE: @tresjs/cientos has <Environment> but NO Lightformer.
 * To replicate the Lightformer effect you can use:
 * 1. An Environment preset (simpler)
 * 2. RectAreaLights (closest equivalent to Lightformer)
 */
import { Environment } from '@tresjs/cientos'
</script>

<template>
  <TresGroup name="lights">
    <!--
    ENVIRONMENT
    ===========
    In @react-three/drei, Environment + Lightformer creates rectangular area lights
    inside an environment cube for soft reflections.
    
    In TresJS/Cientos, Environment supports HDR presets or you can load your own HDR.
    Available presets: 'sunset', 'dawn', 'night', 'warehouse', 'forest', 
    'apartment', 'studio', 'city', 'park', 'lobby'
    
    'studio' is the closest to the original Lightformer setup.
    -->
    <!-- 
    background=false (or missing prop) → only affects model reflections
    background=true → shows HDR as visible background image
    -->
    <Environment 
      :resolution="256" 
      preset="studio"
    />
    
    <!--
    RECTAREALIGHT - Equivalent to Lightformer
    ==========================================
    RectAreaLight is the native Three.js equivalent to Lightformer.
    Creates perfect rectangular area light for studio lighting.
    
    IMPORTANT: RectAreaLight requires RectAreaLightUniformsLib.init() which
    Three.js loads automatically, but sometimes needs custom handling or helpers.
    
    Position [-10, 5, -5] with rotation Y = PI/2 (90°) points towards the center
    -->
    <TresRectAreaLight
      :position="[-10, 5, -5]"
      :width="10"
      :height="10"
      :intensity="10"
      :rotation="[0, Math.PI / 2, 0]"
      color="#ffffff"
    />
    
    <TresRectAreaLight
      :position="[10, 0, 1]"
      :width="10"
      :height="10"
      :intensity="10"
      :rotation="[0, -Math.PI / 2, 0]"
      color="#ffffff"
    />
    
    <!--
    SPOTLIGHTS
    ==========
    SpotLights are identical in Three.js/TresJS.
    - angle: light cone angle in radians
    - decay: light attenuation with distance (0 = no attenuation)
    - intensity: light intensity
    
    Math.PI * 0.2 ≈ 0.628 (soft intensity)
    Math.PI * 1 ≈ 3.14 (strong intensity)
    -->
    <TresSpotLight
      :position="[-2, 10, 5]"
      :angle="0.15"
      :decay="0"
      :intensity="Math.PI * 0.2"
    />
    
    <TresSpotLight
      :position="[0, -25, 10]"
      :angle="0.15"
      :decay="0"
      :intensity="Math.PI * 0.05"
    />
    
    <TresSpotLight
      :position="[0, 15, 5]"
      :angle="0.15"
      :decay="0.1"
      :intensity="Math.PI * 1"
    />
  </TresGroup>
</template>
