<script setup lang="ts">
/**
 * [COMPONENT] :: MACBOOK_VIDEO_MODEL
 * ----------------------------------------------------------------------
 * MacBook model variant specialized for the "Features" section.
 * 
 * Unique Features:
 * - Support for VIDEO textures on the screen (VideoTexture).
 * - Optimized for 360-degree rotation without user controls.
 *
 * @module    components/models
 * ----------------------------------------------------------------------
 */
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

// =====================================================================
// [SECTION] :: STATE INTEGRATION
// =====================================================================
const store = useMacbookStore()
const { color, texture: textureUrl } = storeToRefs(store)

const modelColor = computed(() => new Color(color.value))

// =====================================================================
// [SECTION] :: MODEL LOADING
// =====================================================================
const modelRef = await useGLTF('/models/macbook-transformed.glb', { draco: true })
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
// [SECTION] :: VIDEO TEXTURE MANAGER
// =====================================================================
// Manual management of HTML5 video texture for Three.js
let videoTexture: VideoTexture | null = null
const video = document.createElement('video')

// Mandatory configuration for automatic playback without interaction
video.crossOrigin = 'Anonymous'
video.loop = true
video.muted = true
video.playsInline = true

/**
 * [LOGIC] :: TEXTURE_SYNC
 * Synchronizes the DOM <video> element with the WebGL texture.
 * If the URL changes in the store, we update the video and the texture.
 */
if (textureUrl.value) {
    video.src = textureUrl.value
    video.play().catch(e => console.error('Macbook: Error playing video', e))
    videoTexture = new VideoTexture(video)
    videoTexture.colorSpace = SRGBColorSpace
    videoTexture.flipY = false // VideoTextures sometimes need flipY: false depending on UV mapping
}

watch(textureUrl, (newUrl) => {
    if (newUrl) {
        video.src = newUrl
        // Play promise to ensure browser allows playback
        video.play().catch(e => console.error('Macbook: Error playing video', e))
        
        // Lazy initialization of texture if it didn't exist before
        if (!videoTexture) {
            videoTexture = new VideoTexture(video)
            videoTexture.colorSpace = SRGBColorSpace
            videoTexture.flipY = false
        }
    } else {
        video.pause()
    }
})

// UV validation to avoid silent black textures
if (nodes.Object_123 && !nodes.Object_123.geometry.attributes.uv) {
    console.warn('Macbook: Object_123 has no UV attributes! Video texture cannot be mapped.')
}

// =====================================================================
// [SECTION] :: CLEANUP
// =====================================================================
onUnmounted(() => {
    // It is CRITICAL to clean up video resources to avoid memory leaks
    // and phantom sounds in the background.
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
    
    <!-- SCREEN: VideoTexture Rendering -->
    <TresMesh :geometry="nodes.Object_123.geometry" :rotation="[Math.PI / 2, 0, 0]">
      <TresMeshStandardMaterial v-if="videoTexture" :map="videoTexture" :roughness="0.2" :metalness="0.1" />
      <TresMeshStandardMaterial v-else color="black" />
    </TresMesh>
    
    <TresMesh :geometry="nodes.Object_127.geometry" :material="materials.ZCDwChwkbBfITSW" :material-color="modelColor" :rotation="[Math.PI / 2, 0, 0]" />
  </TresGroup>
</template>