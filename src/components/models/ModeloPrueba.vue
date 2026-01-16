<script setup lang="ts">
/**
 * [COMPONENT] :: TEST_MODEL
 * ----------------------------------------------------------------------
 * Test component for 3D model experimentation.
 * Similar to Macbook-14 but includes experimental interaction logic.
 * 
 * Experimental Features:
 * - Color change on hover (hover event handling).
 * - Alternative texture loading (/screen-e.png).
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

const modelColor = computed(() => new Color(color.value))

// =====================================================================
// [SECTION] :: ASSET LOADING (MODEL)
// =====================================================================
const modelRef = await useGLTF('/models/macbook-14-transformed.glb', { draco: true })
const model = modelRef.state?.value
const scene = model?.scene

const nodes: Record<string, any> = {}
const materials: Record<string, any> = {}

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
const textureLoader = new TextureLoader()
let texture: Texture | null = null

try {
  // Note: We load a different texture to differentiate this test model
  texture = await textureLoader.loadAsync('/screen-e.png')
  if (texture) {
    texture.colorSpace = SRGBColorSpace
    texture.flipY = true
    texture.needsUpdate = true
    
    if (nodes.Object_123 && !nodes.Object_123.geometry.attributes.uv) {
        console.warn('ModeloPrueba: Object_123 has no UV attributes! Texture data cannot be mapped.')
    }
  }
} catch (error) {
  console.error('ModeloPrueba: Error loading texture', error)
}

// =====================================================================
// [SECTION] :: INTERACTION HANDLERS (EXPERIMENTAL)
// =====================================================================

/**
 * [HANDLER] :: POINTER_OVER
 * Changes material color to red when cursor hovers over.
 * 
 * @param e - TresJS event containing the intercepted object.
 */
const handlePointerOver = (e: any) => {
  e.stopPropagation() // Prevent event from bubbling to other objects behind
  const mesh = e.object
  
  // Store original material if we don't have it yet
  if (!mesh.userData.originalMaterial) {
    mesh.userData.originalMaterial = mesh.material
  }
  
  // Clone to not affect other objects sharing the same material
  const newMaterial = mesh.userData.originalMaterial.clone()
  newMaterial.color.set(0xff0000) // Pure red
  mesh.material = newMaterial
}

/**
 * [HANDLER] :: POINTER_OUT
 * Restores original material when cursor leaves the object.
 */
const handlePointerOut = (e: any) => {
  e.stopPropagation()
  const mesh = e.object
  if (mesh.userData.originalMaterial) {
    // Dispose the cloned hover material before restoring original
    if (mesh.material !== mesh.userData.originalMaterial) {
      mesh.material.dispose()
    }
    mesh.material = mesh.userData.originalMaterial
  }
}
</script>

<template>
  <TresGroup 
    v-if="nodes?.Object_10" 
    :position="props.position" 
    :rotation="props.rotation" 
    :scale="props.scale" 
    v-on:pointerover="handlePointerOver" 
    v-on:pointerout="handlePointerOut"
  >
    <!-- MESHES: Standard component rendering -->
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
    
    <TresMesh :geometry="nodes.Object_123.geometry" :rotation="[Math.PI / 2, 0, 0]">
      <TresMeshStandardMaterial v-if="texture" :map="texture" :roughness="0.2" :metalness="0.1" />
      <TresMeshStandardMaterial v-else color="red" />
    </TresMesh>
    
    <TresMesh :geometry="nodes.Object_127.geometry" :material="materials.ZCDwChwkbBfITSW" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
  </TresGroup>
</template>