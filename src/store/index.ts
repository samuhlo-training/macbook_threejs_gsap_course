import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMacbookStore = defineStore('macbook', () => {
    const color = ref<string>('#2e2c2e')
    const scale = ref<number>(0.08)
    const texture = ref<string>('/videos/feature-1.mp4')

    function setColor(newColor: string) {
        color.value = newColor
    }

    function setScale(newScale: number) {
        scale.value = newScale
    }

    function setTexture(newTexture: string) {
        texture.value = newTexture
    }

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