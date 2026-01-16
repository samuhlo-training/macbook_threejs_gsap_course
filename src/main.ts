/**
 * [ENTRY_POINT] :: VUE_APPLICATION
 * ----------------------------------------------------------------------
 * Main entry point of the application.
 * Here we orchestrate the "Bootstrapping" of Vue, Pinia, and global styles.
 *
 * Responsibilities:
 * 1. Import global styles (Tailwind/CSS).
 * 2. Create the Pinia instance for global state.
 * 3. Mount the application to the DOM (#app).
 *
 * @module    src/main
 * ----------------------------------------------------------------------
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles.css'
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)

// =====================================================================
// [SECTION] :: APP MOUNTING
// =====================================================================
// Install plugins (Pinia) and mount.
app.use(pinia)
app.mount('#app')
