<template>
    <section class="nav">
        <div class="container d-flex justify-content-between align-items-center">
            <div class="h1">
                PKMN
            </div>
            <div class="nav__cta">
                <router-link v-for="link in store.menuItems" :key="link" :to="link.url">
                    {{ link.name }}
                </router-link>
                <router-link to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNav } from '@/store/useNav';

export default defineComponent({
    setup() {
        const store = useNav();

        return {
            store
        }
    },
})
</script>
