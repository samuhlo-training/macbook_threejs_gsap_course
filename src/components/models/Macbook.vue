<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue'
import { useGLTF } from '@tresjs/cientos'
import { Color, SRGBColorSpace, VideoTexture } from 'three'
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
const { color, texture: textureUrl } = storeToRefs(store)

// Ensure we pass a Three.js Color instance to the material-color prop to avoid any parsing issues
const modelColor = computed(() => new Color(color.value))

// Cientos useGLTF returns a reactive wrapper, not the direct GLTF object in some versions
const modelRef = await useGLTF('/models/macbook-transformed.glb', { draco: true })
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

// Configuración de VideoTexture
let videoTexture: VideoTexture | null = null
const video = document.createElement('video')

// Initialize video settings
video.crossOrigin = 'Anonymous'
video.loop = true
video.muted = true
video.playsInline = true
// video.autoplay = true // Intentaremos hacer play manualmente

// Si ya hay URL en el store, asignarla y reproducir
if (textureUrl.value) {
    video.src = textureUrl.value
    video.play().catch(e => console.error('Macbook: Error playing video', e))
    videoTexture = new VideoTexture(video)
    videoTexture.colorSpace = SRGBColorSpace
    videoTexture.flipY = true // Ajustar según necesidad, usualmente las texturas GLTF se invierten en Y
}

// Watch para cambios en la URL (por si cambia la textura en tiempo de ejecución)
watch(textureUrl, (newUrl) => {
    if (newUrl) {
        video.src = newUrl
        video.play().catch(e => console.error('Macbook: Error playing video', e))
        if (!videoTexture) {
            videoTexture = new VideoTexture(video)
            videoTexture.colorSpace = SRGBColorSpace
            videoTexture.flipY = true
        }
    } else {
        video.pause()
    }
})

// Check UVs
if (nodes.Object_123 && !nodes.Object_123.geometry.attributes.uv) {
    console.warn('Macbook: Object_123 has no UV attributes! Video texture cannot be mapped.')
}

onUnmounted(() => {
    video.pause()
    video.src = ''
    if (videoTexture) {
        videoTexture.dispose()
    }
})

</script>

<template>
  <TresGroup v-if="nodes?.Object_10" :position="props.position" :rotation="props.rotation" :scale="props.scale">
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
      <TresMeshStandardMaterial v-if="videoTexture" :map="videoTexture" :roughness="0.2" :metalness="0.1" />
      <TresMeshStandardMaterial v-else color="black" />
    </TresMesh>
    <TresMesh :geometry="nodes.Object_127.geometry" :material="materials.ZCDwChwkbBfITSW" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
  </TresGroup>
</template>