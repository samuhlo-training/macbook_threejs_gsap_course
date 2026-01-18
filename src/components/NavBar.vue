<script setup lang="ts">
/**
 * [COMPONENT] :: NAVIGATION_BAR
 * ----------------------------------------------------------------------
 * Fixed or static top navigation bar.
 * Acts as the main site map for the user.
 *
 * TUTORIAL MODE:
 * A navigation bar that stays at the top. It demonstrates how to use a constant array 
 * (navLinks) to generate HTML with a loop (v-for), keeping the code clean and easy to update.
 *
 * Features:
 * - ITERATIVE rendering of links based on configuration (DRY).
 * - Optimized iconography (SVG) for secondary actions.
 * 
 * @module    src/components/NavBar
 * ----------------------------------------------------------------------
 */
import { navLinks } from "../constants";
</script>

<template>
    <!--
      [SEMANTIC] :: HTML5_NAVIGATION
      We use <nav> to indicate to screen readers that
      this is a main navigation section.
    -->
    <header>
        <nav>
            <img src="/logo.svg" alt="Apple logo" />
            
            <!-- 
              [LOOP] :: NAVIGATION_ITEMS
              Iterate through the 'navLinks' array from constants/index.ts.
              This facilitates keeping links in a single place.
            -->
            <ul>
                <li v-for="link in navLinks" :key="link.label">
                    <a :href="link.label">{{ link.label }}</a>
                </li>
            </ul>

            <div class="flex-center gap-3">
                <button>
                    <img src="/search.svg" alt="Search" />
                </button>
                <button>
                    <img src="/cart.svg" alt="Cart" />
                </button>
            </div>
        </nav>
    </header>

</template>
