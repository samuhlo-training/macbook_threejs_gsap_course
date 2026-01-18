<script setup lang="ts">
/**
 * [COMPONENT] :: PAGE_FOOTER
 * ----------------------------------------------------------------------
 * Final footer of the application.
 *
 * TUTORIAL MODE:
 * The bottom section of the page. It shows how to use dynamic JavaScript expressions 
 * (like getting the current year) directly inside the HTML template.
 *
 * Features:
 * - Dynamic links generated from constants.
 * - Dynamic Copyright date (zero maintenance).
 *
 * @module    src/components/Footer
 * ----------------------------------------------------------------------
 */
import { footerLinks } from '../constants'
</script>

<template>
    <footer>
            <div class="info">
                <p>More ways to shop: Find an Apple Store or other retailer near you. Or call 000800 040 1966.</p>
                <img src="/logo.svg" alt ="Apple logo"/>
            </div>

            <hr />

            <div class="links">
                <!-- 
                  [DYNAMIC_DATA] :: AUTO_UPDATED_YEAR
                  We use JavaScript directly in the template (interpolation)
                  so the year is always updated without changing the code.
                -->
                <p>Copyright © {{ new Date().getFullYear() }} Apple Inc. All rights reserved.</p>

                <ul>
                    <li v-for="link in footerLinks" :key="link.label">
                        <a :href="link.link">{{ link.label }}</a>
                    </li>
                </ul>
            </div>
        </footer>
</template>