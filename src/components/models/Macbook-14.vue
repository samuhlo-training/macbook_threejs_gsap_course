<script setup lang="ts">
/**
 * [COMPONENT] :: MACBOOK_MODEL_14
 * ----------------------------------------------------------------------
 * Component representing the 3D model of the MacBook Pro 14".
 * 
 * TUTORIAL MODE:
 * 14-inch Model.
 * Demonstrates how to load a specific GLTF model and manually apply textures.
 * It uses 'useGLTF' from @tresjs/cientos for easy async loading.
 *
 * Responsibilities:
 * 1. Load the optimized GLTF/GLB model.
 * 2. Manage the screen texture independently.
 * 3. Map materials to allow dynamic colors changes (Pinia).
 *
 * @module    components/models
 * ----------------------------------------------------------------------
 */
import { computed } from 'vue'
import { useGLTF } from '@tresjs/cientos'
import { Color, SRGBColorSpace, Texture, TextureLoader } from 'three'
import { storeToRefs } from 'pinia'
import { useMacbookStore } from '../../store'

// =====================================================================
// [SECTION] :: TYPE DEFINITIONS
// =====================================================================
interface Props {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

// =====================================================================
// [SECTION] :: COMPONENT PROPS
// =====================================================================
const props = withDefaults(defineProps<Props>(), {
  position: () => [0, 0, 0],
  rotation: () => [0, 0, 0],
  scale: 1,
})

// =====================================================================
// [SECTION] :: STORE INTEGRATION
// =====================================================================
const store = useMacbookStore()
const { color } = storeToRefs(store)

/**
 * [COMPUTED] :: MODEL_COLOR
 * Transform the color string from the store into a Three.js Color instance.
 * This ensures consistency in rendering and avoids unnecessary re-parsing.
 */
const modelColor = computed(() => new Color(color.value))

// =====================================================================
// [SECTION] :: ASSET LOADING (MODEL)
// =====================================================================
/**
 * Async loading of the 3D model using Draco compression.
 * useGLTF from @tresjs/cientos automagically handles caching and loading.
 */
const modelRef = await useGLTF('/models/macbook-14-transformed.glb', { draco: true })

// Extract scene and prepare nodes/materials for direct access
const model = modelRef.state?.value
const scene = model?.scene

const nodes: Record<string, any> = {}
const materials: Record<string, any> = {}

// Map objects to be able to reference them individually in the template
if (scene) {
  scene.traverse((object: any) => {
    if (object.name) nodes[object.name] = object
    if (object.material) {
      materials[object.material.name || object.name + '_material'] = object.material
    }
  })
}

// =====================================================================
// [SECTION] :: ASSET LOADING (TEXTURES)
// =====================================================================
/**
 * Manual management of the screen texture.
 * We separate the texture from the base model for higher quality and control.
 */
const textureLoader = new TextureLoader()
let texture: Texture | null = null

try {
  texture = await textureLoader.loadAsync('/screen.png')
  if (texture) {
    texture.colorSpace = SRGBColorSpace // Crucial so colors don't look washed out
    texture.flipY = true // Standard orientation correction in WebGL
    texture.needsUpdate = true
    
    // Safety validation for UVs
    if (nodes.Object_123 && !nodes.Object_123.geometry.attributes.uv) {
        console.warn('Macbook-14: Object_123 has no UV attributes! Texture data cannot be mapped.')
    }
  }
} catch (error) {
  console.error('Macbook-14: Error loading texture', error)
}
</script>

<template>
  <TresGroup v-if="nodes?.Object_10" :position="props.position" :rotation="props.rotation" :scale="props.scale">
    <!-- 
      STRUCTURAL MESHES
      Each TresMesh represents a part of the laptop.
      We use :material-color to reactively bind the chassis color.
    -->
    <TresMesh :geometry="nodes.Object_10.geometry" :material="materials.PaletteMaterial001" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_16.geometry" :material="materials.zhGRTuGrQoJflBD" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_20.geometry" :material="materials.PaletteMaterial002" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_22.geometry" :material="materials.lmWQsEjxpsebDlK" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_30.geometry" :material="materials.LtEafgAVRolQqRw" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_32.geometry" :material="materials.iyDJFXmHelnMTbD" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_34.geometry" :material="materials.eJObPwhgFzvfaoZ" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_38.geometry" :material="materials.nDsMUuDKliqGFdU" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_42.geometry" :material="materials.CRQixVLpahJzhJc" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_48.geometry" :material="materials.YYwBgwvcyZVOOAA" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_54.geometry" :material="materials.SLGkCohDDelqXBu" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_58.geometry" :material="materials.WnHKXHhScfUbJQi" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_66.geometry" :material="materials.fNHiBfcxHUJCahl" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_74.geometry" :material="materials.LpqXZqhaGCeSzdu" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_82.geometry" :material="materials.gMtYExgrEUqPfln" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_96.geometry" :material="materials.PaletteMaterial003" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    <TresMesh :geometry="nodes.Object_107.geometry" :material="materials.JvMFZolVCdpPqjj" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
    
    <!-- SCREEN: Apply manually loaded texture -->
    <TresMesh :geometry="nodes.Object_123.geometry" :rotation="[Math.PI / 2, 0, 0]">
      <TresMeshStandardMaterial v-if="texture" :map="texture" :roughness="0.2" :metalness="0.1" />
      <TresMeshStandardMaterial v-else color="black" />
    </TresMesh>
    
    <TresMesh :geometry="nodes.Object_127.geometry" :material="materials.ZCDwChwkbBfITSW" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
  </TresGroup>
</template>