import { ref, onMounted, onUnmounted } from "vue";

/**
 * [COMPOSABLE] :: USE_MEDIA_QUERY
 * ----------------------------------------------------------------------
 * Reactive hook to detect CSS media query changes from JS.
 * Replicates CSS behavior but returns a boolean Ref.
 *
 * TUTORIAL MODE:
 * A "Composable" (Custom Hook).
 * It encapsulates the logic for tracking screen width (Media Queries)
 * into a reusable function that returns a reactive boolean Ref.
 *
 * @param query - CSS media query string (e.g., '(max-width: 1024px)')
 * @returns Ref<boolean> - True if the query matches.
 *
 * @module    src/composables
 * ----------------------------------------------------------------------
 */
export function useMediaQuery(query: string) {
  // Reactive state to store whether the condition is met or not
  const matches = ref(false);

  // GUARD: Environment Verification (SSR Safety)
  // Ensure window and matchMedia exist before executing.
  if (typeof window !== "undefined" && window.matchMedia) {
    const mediaQuery = window.matchMedia(query);

    // [INIT] :: Set initial value
    matches.value = mediaQuery.matches;

    // [EVENT_HANDLER] :: Listener function
    // We define the function outside to be able to reference it in removeEventListener
    const listener = (event: MediaQueryListEvent) => {
      matches.value = event.matches;
    };

    // [LIFECYCLE] :: SETUP & TEARDOWN
    onMounted(() => {
      // Listen for breakpoint changes
      mediaQuery.addEventListener("change", listener);
    });

    onUnmounted(() => {
      // IMPORTANT: Clean up listeners to avoid memory leaks
      mediaQuery.removeEventListener("change", listener);
    });
  }

  return matches;
}
