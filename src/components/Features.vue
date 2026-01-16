<script setup lang="ts">
/**
 * [COMPONENT] :: FEATURES
 * ----------------------------------------------------------------------
 * Sección que muestra las características del producto con animaciones 
 * sincronizadas al scroll.
 *
 * DIFERENCIAS CLAVE CON REACT:
 * 1. En React, el Canvas de R3F se puede pinnear directamente.
 *    En Vue/TresJS, debemos envolver el canvas en un wrapper para evitar
 *    problemas de dimensiones al pinnear.
 * 
 * 2. En React, useGSAP se ejecuta después del render.
 *    En Vue, usamos watch con flush: 'post' para esperar al modelo 3D.
 *
 * @module components/Features.vue
 * ----------------------------------------------------------------------
 */

import { ref, watch, onMounted, onUnmounted } from 'vue'
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
let ctx: gsap.Context | null = null
let animationsInitialized = false

const store = useMacbookStore()
const { setTexture } = store
const isMobile = useMediaQuery('(max-width: 1024px)')


// =====================================================================
// [SECTION] :: LIFECYCLE - VIDEO PRELOAD
// =====================================================================

onMounted(() => {
    // Pre-cargar todos los videos
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
    })
})


// =====================================================================
// [SECTION] :: ANIMATION INITIALIZATION
// =====================================================================

/**
 * [WATCHER] :: Inicializar animaciones cuando el groupRef esté listo
 * 
 * DIFERENCIA CON REACT:
 * En React, useGSAP se ejecuta después del mount.
 * En Vue con Suspense, el modelo carga async, así que usamos watch.
 */
watch(
    groupRef,
    (newValue) => {
        if (!newValue || animationsInitialized) return
        
        animationsInitialized = true

        ctx = gsap.context(() => {
            /**
             * TIMELINE 1: Rotación del modelo 3D
             * 
             * EQUIVALENCIA REACT:
             * trigger: '#f-canvas', pin: true
             * 
             * EN VUE: Usamos #canvas-wrapper como el elemento a pinnear
             * porque pinnear directamente un canvas WebGL causa problemas.
             */
            const modelTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#canvas-wrapper',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 3,  // Aumentado para animación más suave
                    pin: true,
                }
            })

            /**
             * TIMELINE 2: Sincronización de contenido
             * 
             * start: 'top top' - Empieza cuando el canvas está pinneado arriba
             * (no 'top center' que era demasiado pronto)
             */
            const contentTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#canvas-wrapper',
                    start: 'top center',  
                    end: 'bottom top',
                    scrub: 2,  // Aumentado de 1 a 2 para animación más suave
                }
            })

            // Rotación 360° del modelo
            modelTimeline.to(
                newValue.rotation, 
                { y: Math.PI * 2, ease: 'power1.inOut' }
            )

            /**
             * Sincronización de contenido y videos
             * 
             * ESTRUCTURA:
             * 1. Primero cargamos el video (sin mostrar texto)
             * 2. Luego mostramos el texto y dejamos tiempo para leerlo
             * 
             * El "delay" inicial permite que el ordenador se centre
             * antes de que aparezca el primer texto.
             */
            contentTimeline
                // INTRO: Cargar primer video y dar tiempo inicial
                .call(() => setTexture('/videos/feature-1.mp4'))
                .to({}, { duration: 0.5 })  // Espacio vacío para centrar el ordenador
                
                // Feature 1: Email AI
                .to('.box1', { opacity: 1, y: 0, duration: 0.8 })
                .to({}, { duration: 0.2 })  // Pequeña pausa para leer
                
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
    ctx?.revert()
})
</script>


<template>
    <section id="features">
        <h2>See it all in a new light.</h2>

        <!--
            [WRAPPER] :: CANVAS_CONTAINER
            En React, el Canvas se pinnea directamente.
            En Vue/TresJS, envolvemos el canvas en un wrapper porque
            GSAP pin manipula estilos que afectan al canvas WebGL.
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
            Exactamente como en React: absolute inset-0 dentro de #features.
            Las posiciones (top-[20%], etc.) son relativas a #features.
            Cuando GSAP pinnea el canvas-wrapper, genera pinSpacing
            que aumenta la altura de #features.
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
