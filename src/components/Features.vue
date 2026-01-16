<script setup lang="ts">
/**
 * [COMPONENT] :: FEATURES
 * ----------------------------------------------------------------------
 * Section displaying product features with scroll-synchronized animations.
 *
 * KEY DIFFERENCES FROM REACT:
 * 1. In React, R3F Canvas can be pinned directly.
 *    In Vue/TresJS, we must wrap the canvas in a wrapper to avoid
 *    dimension issues when pinning.
 * 
 * 2. In React, useGSAP runs after render.
 *    In Vue, we use watch with flush: 'post' to wait for the 3D model.
 *
 * @module components/Features.vue
 * ----------------------------------------------------------------------
 */

import { ref, shallowRef, watch, onMounted, onUnmounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import gsap from 'gsap'
import { features, featureSequence } from '../constants/index'
import { useMacbookStore } from '../store'
import { useMediaQuery } from '../composables/useMediaQuery'
import StudioLights from './tresjs/StudioLights.vue'
import MacbookModel from './models/Macbook.vue'



// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================

const groupRef = ref<any>(null)

// We use shallowRef for ctx because GSAP Context doesn't need deep reactivity
const ctx = shallowRef<gsap.Context | null>(null)

// Ref to control if animations have already initialized in this instance
const animationsInitialized = ref(false)

const store = useMacbookStore()
const { setTexture } = store
const isMobile = useMediaQuery('(max-width: 1024px)')

// Array to store preloaded videos and allow their cleanup
const preloadedVideos: HTMLVideoElement[] = []


// =====================================================================
// [SECTION] :: LIFECYCLE - VIDEO PRELOAD
// =====================================================================

onMounted(() => {
    // Pre-load all videos and store them for later cleanup
    featureSequence.forEach((feature) => {
        const video = document.createElement('video')
        Object.assign(video, {
            src: feature.videoPath,
            muted: true,
            playsInline: true,
            preload: 'auto',
            crossOrigin: 'anonymous',
        })
        video.load()
        
        // Store reference to clean up in onUnmounted
        preloadedVideos.push(video)
    })
})


// =====================================================================
// [SECTION] :: ANIMATION INITIALIZATION
// =====================================================================

/**
 * [WATCHER] :: Initialize animations when groupRef is ready
 * 
 * REACT DIFFERENCE:
 * In React, useGSAP runs after mount.
 * In Vue with Suspense, the model loads async, so we use watch.
 */
watch(
    groupRef,
    (newValue) => {
        if (!newValue || animationsInitialized.value) return
        
        animationsInitialized.value = true

        ctx.value = gsap.context(() => {
            /**
             * TIMELINE 1: 3D Model Rotation
             * 
             * REACT EQUIVALENT:
             * trigger: '#f-canvas', pin: true
             * 
             * IN VUE: We use #canvas-wrapper as the pin element
             * because pinning a WebGL canvas directly causes issues.
             */
            const modelTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#canvas-wrapper',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 3,  // Increased for smoother animation
                    pin: true,
                }
            })

            /**
             * TIMELINE 2: Content Synchronization
             * 
             * start: 'top top' - Starts when canvas is pinned at top
             * (not 'top center' which was too early)
             */
            const contentTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#canvas-wrapper',
                    start: 'top center',  
                    end: 'bottom top',
                    scrub: 2,  // Increased from 1 to 2 for smoother animation
                }
            })

            // 360° Model Rotation
            modelTimeline.to(
                newValue.rotation, 
                { y: Math.PI * 2, ease: 'power1.inOut' }
            )

            /**
             * Content and Video Synchronization
             * 
             * STRUCTURE:
             * 1. First we load the video (without showing text)
             * 2. Then we show the text and allow time to read
             * 
             * The initial "delay" allows the laptop to center
             * before the first text appears.
             */
            contentTimeline
                // INTRO: Load first video and give initial time
                .call(() => setTexture('/videos/feature-1.mp4'))
                .to({}, { duration: 0.5 })  // Empty space to center laptop
                
                // Feature 1: Email AI
                .to('.box1', { opacity: 1, y: 0, duration: 0.8 })
                .to({}, { duration: 0.2 })  // Small pause to read
                
                // Feature 2: Image AI
                .call(() => setTexture('/videos/feature-2.mp4'))
                .to('.box2', { opacity: 1, y: 0, duration: 0.8 })
                .to({}, { duration: 0.2 })
                
                // Feature 3: Summarize AI
                .call(() => setTexture('/videos/feature-3.mp4'))
                .to('.box3', { opacity: 1, y: 0, duration: 0.8 })
                .to({}, { duration: 0.2 })
                
                // Feature 4: AirDrop
                .call(() => setTexture('/videos/feature-4.mp4'))
                .to('.box4', { opacity: 1, y: 0, duration: 0.8 })
                .to({}, { duration: 0.2 })
                
                // Feature 5: Writing Tool
                .call(() => setTexture('/videos/feature-5.mp4'))
                .to('.box5', { opacity: 1, y: 0, duration: 0.8 })
        })
    },
    { flush: 'post' }
)

onUnmounted(() => {
    // Clean GSAP context on unmount
    ctx.value?.revert()
    
    // Clean preloaded videos to free memory
    preloadedVideos.forEach((video) => {
        // Pause playback if running
        video.pause()
        
        // Clear src and force buffer flush
        video.src = ''
        video.load()
        
        // Remove media attributes
        video.removeAttribute('crossOrigin')
        video.removeAttribute('playsInline')
    })
    
    // Empty array to allow garbage collection
    preloadedVideos.length = 0
    
    // Reset flag so if component remounts, animations restart
    animationsInitialized.value = false
})
</script>


<template>
    <section id="features">
        <h2>See it all in a new light.</h2>

        <!--
            [WRAPPER] :: CANVAS_CONTAINER
            In React, the Canvas is pinned directly.
            In Vue/TresJS, we wrap the canvas because
            GSAP pin manipulates styles that affect the WebGL canvas.
        -->
        <div id="canvas-wrapper" class="w-full h-dvh">
            <TresCanvas id="f-canvas" class="w-full h-full">
                <TresPerspectiveCamera 
                    :position="[0, 0, 5]" 
                    :fov="50" 
                    :look-at="[0, 0, 0]"
                />
                
                <TresAmbientLight :intensity="0.5" />
                
                <Suspense>
                    <TresGroup>
                        <StudioLights />
                        <TresGroup ref="groupRef">
                            <MacbookModel 
                                :scale="isMobile ? 0.05 : 0.07" 
                                :position="[0, -1, 0]" 
                            />
                        </TresGroup>
                    </TresGroup>
                    
                    <template #fallback>
                        <TresGroup />
                    </template>
                </Suspense>
            </TresCanvas>
        </div>

        <!--
            [OVERLAY] :: FEATURE_BOXES
            Exactly like in React: absolute inset-0 inside #features.
            Positions (top-[20%], etc.) are relative to #features.
            When GSAP pins the canvas-wrapper, it generates pinSpacing
            that increases the height of #features.
        -->
        <div class="absolute inset-0">
            <div 
                v-for="(feature, index) in features" 
                :key="feature.id" 
                :class="['box', `box${index + 1}`, feature.styles]"
            >
                <img :src="feature.icon" :alt="feature.highlight" />
                <p>
                    <span class="text-white">{{ feature.highlight }}</span>
                    {{ feature.text }}
                </p>
            </div>
        </div>
    </section>
</template>
