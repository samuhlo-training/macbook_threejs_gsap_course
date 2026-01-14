<script setup lang="ts">
import { navLinks } from "../constants";
</script>

<template>
  
<header>
            <nav>
                <img  src="/logo.svg" alt="Apple logo" />

                <ul>
                  
                    <li v-for="link in navLinks" :key="link.label">
                      <a :href="link.label">{{ link.label }}</a>
                    </li>
                </ul>

                <div className="flex-center gap-3">
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


