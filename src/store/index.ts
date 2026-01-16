import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * [STORE] :: MACBOOK_CONFIGURATION
 * ----------------------------------------------------------------------
 * Global state management for product configuration.
 * We use Pinia's "Setup Stores" pattern, which resembles Vue's
 * Composition API (ref, computed, function).
 * 
 * Responsibilities:
 * - Centralize user selection (Color, Size).
 * - Synchronize the video playing on the model's screen.
 *
 * @module    src/store
 * ----------------------------------------------------------------------
 */
export const useMacbookStore = defineStore('macbook', () => {

    // =====================================================================
    // [SECTION] :: STATE (REFS)
    // =====================================================================
    // Initial reactive values.
    const color = ref<string>('#2e2c2e')            // Space Grey by default
    const scale = ref<number>(0.08)                 // Initial size (14")
    const texture = ref<string>('/videos/feature-1.mp4') // Default video

    // =====================================================================
    // [SECTION] :: ACTIONS (FUNCTIONS)
    // =====================================================================
    // Methods to mutate state. In Setup Stores they are simple functions.
    
    function setColor(newColor: string) {
        color.value = newColor
    }

    function setScale(newScale: number) {
        scale.value = newScale
    }

    function setTexture(newTexture: string) {
        texture.value = newTexture
    }

    /**
     * [ACTION] :: RESET_DEFAULTS
     * Restores all values to their original state.
     * Useful for clearing state when leaving the view or in tests.
     */
    function reset() {
        color.value = '#2e2c2e'
        scale.value = 0.08
        texture.value = '/videos/feature-1.mp4'
    }

    return {
        color,
        scale,
        texture,
        setColor,
        setScale,
        setTexture,
        reset
    }
})