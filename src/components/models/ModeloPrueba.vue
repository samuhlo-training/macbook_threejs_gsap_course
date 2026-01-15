<script setup lang="ts">
import { computed } from 'vue'
import { useGLTF } from '@tresjs/cientos'
import { Color, SRGBColorSpace, Texture, TextureLoader } from 'three'
import { storeToRefs } from 'pinia'
import { useMacbookStore } from '../../store'

interface Props {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

const props = withDefaults(defineProps<Props>(), {
  position: () => [0, 0, 0],
  rotation: () => [0, 0, 0],
  scale: 1,
})

const store = useMacbookStore()
const { color } = storeToRefs(store)

// Ensure we pass a Three.js Color instance to the material-color prop to avoid any parsing issues
const modelColor = computed(() => new Color(color.value))

// Cientos useGLTF returns a reactive wrapper, not the direct GLTF object in some versions
const modelRef = await useGLTF('/models/macbook-14-transformed.glb', { draco: true })
// Intentar obtener el objeto GLTF real desde el wrapper
const model = modelRef.state?.value

const scene = model?.scene

// Intentar obtener el objeto GLTF real desde el wrapper
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



// Cargar la textura de la pantalla
// Nota: '/screen.png' debe estar en la carpeta public
const textureLoader = new TextureLoader()
let texture: Texture | null = null
try {
  texture = await textureLoader.loadAsync('/screen-e.png')
  if (texture) {
    texture.colorSpace = SRGBColorSpace
    texture.flipY = true
    texture.needsUpdate = true
    // texture.matrixAutoUpdate = true // default is true
    
    // Check if the target mesh has UVs
    if (nodes.Object_123 && !nodes.Object_123.geometry.attributes.uv) {
        console.warn('ModeloPrueba: Object_123 has no UV attributes! Texture data cannot be mapped.')
    }
  }
} catch (error) {
  console.error('ModeloPrueba: Error loading texture', error)
}

// Funcion para cambiar el color de un material al pasar el raton por encima
// evitando que se propague el evento a los padres, que en este caso serian los otros meshes
const handlePointerOver = (e: any) => {
  e.stopPropagation()
  const mesh = e.object
  if (!mesh.userData.originalMaterial) {
    mesh.userData.originalMaterial = mesh.material
  }
  const newMaterial = mesh.userData.originalMaterial.clone()
  newMaterial.color.set(0xff0000)
  mesh.material = newMaterial
}

const handlePointerOut = (e: any) => {
  e.stopPropagation()
  const mesh = e.object
  if (mesh.userData.originalMaterial) {
    mesh.material = mesh.userData.originalMaterial
  }
}
</script>

<template>
  <TresGroup v-if="nodes?.Object_10" :position="props.position" :rotation="props.rotation" :scale="props.scale" v-on:pointerover="handlePointerOver" v-on:pointerout="handlePointerOut">
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