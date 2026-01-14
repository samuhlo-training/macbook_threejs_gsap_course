<script setup lang="ts">
/**
 * STUDIOLIGHTS - Configuración de iluminación de estudio para escenas 3D
 * =========================================================================
 * 
 * Este componente replica la funcionalidad de react-three/drei:
 * - Environment con Lightformers (para iluminación basada en imagen/HDR)
 * - SpotLights para iluminación direccional
 * 
 * En TresJS, usamos componentes nativos de Three.js directamente.
 * 
 * NOTA: @tresjs/cientos tiene <Environment> pero NO tiene Lightformer.
 * Para replicar el efecto de Lightformer puedes usar:
 * 1. Un Environment preset (más simple)
 * 2. RectAreaLights (equivalente más cercano a Lightformer)
 */
import { Environment } from '@tresjs/cientos'
</script>

<template>
  <TresGroup name="lights">
    <!--
    ENVIRONMENT
    ===========
    En @react-three/drei, Environment + Lightformer crea luces de área rectangulares
    dentro de un cubo de entorno para reflejos suaves.
    
    En TresJS/Cientos, Environment soporta presets HDR o puedes cargar tu propio HDR.
    Los presets disponibles: 'sunset', 'dawn', 'night', 'warehouse', 'forest', 
    'apartment', 'studio', 'city', 'park', 'lobby'
    
    'studio' es el más cercano al setup original de Lightformers.
    -->
    <!-- 
    background=false (o sin la prop) → solo afecta reflejos del modelo
    background=true → muestra el HDR como imagen de fondo visible
    -->
    <Environment 
      :resolution="256" 
      preset="studio"
    />
    
    <!--
    RECTAREALIGHT - Equivalente a Lightformer
    ==========================================
    RectAreaLight es el equivalente nativo de Three.js a Lightformer.
    Crea luz de área rectangular perfecta para iluminación de estudio.
    
    IMPORTANTE: RectAreaLight requiere RectAreaLightUniformsLib.init() que
    Three.js carga automáticamente, pero a veces necesita el helper visual.
    
    Posición [-10, 5, -5] con rotación Y = PI/2 (90°) apunta hacia el centro
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
    Los SpotLights son idénticos en Three.js/TresJS.
    - angle: ángulo del cono de luz en radianes
    - decay: atenuación de la luz con la distancia (0 = sin atenuación)
    - intensity: intensidad de la luz
    
    Math.PI * 0.2 ≈ 0.628 (intensidad suave)
    Math.PI * 1 ≈ 3.14 (intensidad fuerte)
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
      :intensity="Math.PI * 0.2"
    />
    
    <TresSpotLight
      :position="[0, 15, 5]"
      :angle="0.15"
      :decay="0.1"
      :intensity="Math.PI * 1"
    />
  </TresGroup>
</template>
