<script setup lang="ts">
/**
 * [COMPONENT] :: MACBOOK_MODEL_14
 * ----------------------------------------------------------------------
 * Componente que representa el modelo 3D del MacBook Pro de 14".
 * 
 * Responsabilidades:
 * 1. Cargar el modelo GLTF/GLB optimizado.
 * 2. Gestionar la textura de la pantalla de forma independiente.
 * 3. Mapear los materiales para permitir cambios de color dinámicos (Pinia).
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
 * Transformamos el string de color del store en una instancia de Color de Three.js.
 * Esto asegura consistencia en el renderizado y evita re-parseos innecesarios.
 */
const modelColor = computed(() => new Color(color.value))

// =====================================================================
// [SECTION] :: ASSET LOADING (MODEL)
// =====================================================================
/**
 * Carga asíncrona del modelo 3D usando Draco compresión.
 * useGLTF de @tresjs/cientos maneja automágicamente el caching y la carga.
 */
const modelRef = await useGLTF('/models/macbook-14-transformed.glb', { draco: true })

// Extraemos la escena y preparamos nodos/materiales para acceso directo
const model = modelRef.state?.value
const scene = model?.scene

const nodes: Record<string, any> = {}
const materials: Record<string, any> = {}

// Mapeamos los objetos para poder referenciarlos individualmente en el template
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
 * Gestión manual de la textura de la pantalla.
 * Separamos la textura del modelo base para mayor calidda y control.
 */
const textureLoader = new TextureLoader()
let texture: Texture | null = null

try {
  texture = await textureLoader.loadAsync('/screen.png')
  if (texture) {
    texture.colorSpace = SRGBColorSpace // Crucial para que los colores no se vean lavados
    texture.flipY = true // Corrección de orientación estándar en WebGL
    texture.needsUpdate = true
    
    // Validación de seguridad para UVs
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
      MESHES ESTRUCTURALES
      Cada TresMesh representa una parte del portátil.
      Usamos :material-color para vincular reactivamente el color del chasis.
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
    
    <!-- PANTALLA: Aplicamos la textura cargada manualmente -->
    <TresMesh :geometry="nodes.Object_123.geometry" :rotation="[Math.PI / 2, 0, 0]">
      <TresMeshStandardMaterial v-if="texture" :map="texture" :roughness="0.2" :metalness="0.1" />
      <TresMeshStandardMaterial v-else color="black" />
    </TresMesh>
    
    <TresMesh :geometry="nodes.Object_127.geometry" :material="materials.ZCDwChwkbBfITSW" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
  </TresGroup>
</template>