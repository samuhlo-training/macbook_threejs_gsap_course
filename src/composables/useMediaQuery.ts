import { ref, onMounted, onUnmounted } from 'vue'

export function useMediaQuery(query: string) {
  const matches = ref(false)

  // Validate that window/matchMedia exists (for SSR safety, though this is likely SPA)
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia(query)
    matches.value = mediaQuery.matches

    const listener = (event: MediaQueryListEvent) => {
      matches.value = event.matches
    }

    onMounted(() => {
      mediaQuery.addEventListener('change', listener)
    })

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', listener)
    })
  }

  return matches
}
