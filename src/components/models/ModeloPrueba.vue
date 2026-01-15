<script setup lang="ts">
/**
 * [COMPONENT] :: MODELO_PRUEBA
 * ----------------------------------------------------------------------
 * Componente de pruebas para experimentación con modelos 3D.
 * Similar al Macbook-14 pero incluye lógica experimental de interacción.
 * 
 * Funcionalidades experimentales:
 * - Cambio de color al pasar el cursor (hover event handling).
 * - Carga de texturas alternativas (/screen-e.png).
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
  // Nota: Cargamos una textura diferente para diferenciar este modelo de prueba
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
 * Cambia el color del material a rojo cuando el cursor pasa por encima.
 * 
 * @param e - Evento de TresJS que contiene el objeto interceptado.
 */
const handlePointerOver = (e: any) => {
  e.stopPropagation() // Prevenir que el evento burbujee a otros objetos detrás
  const mesh = e.object
  
  // Guardamos el material original si no lo tenemos ya
  if (!mesh.userData.originalMaterial) {
    mesh.userData.originalMaterial = mesh.material
  }
  
  // Clonamos para no afectar a otros objetos que compartan el mismo material
  const newMaterial = mesh.userData.originalMaterial.clone()
  newMaterial.color.set(0xff0000) // Rojo puro
  mesh.material = newMaterial
}

/**
 * [HANDLER] :: POINTER_OUT
 * Restaura el material original cuando el cursor sale del objeto.
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
    <!-- MESHES: Renderizado estándar de componentes -->
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