<template>
    <form class="searchbar pt-5" @submit.prevent="getSearchResults">
        <input
            v-model="searchTerm"
            type="text"
            class="form-control"
            placeholder="Search for your favorite pokemon"
            aria-label="Search for your favorite pokemon"
            @input="getSearchResults"
        >
        <button class="btn btn-secondary p-2" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import debounce from 'lodash/debounce';
import { useStore } from "@/store/useShop";

export default defineComponent({
    setup() {
        const store = useStore();
        const searchTerm = ref('');

        const getSearchResults = debounce(() => {
            store.getProducts(12, searchTerm.value)
        }, 300);
        
        return {
            store,
            searchTerm,
            getSearchResults
        }
    }
})
</script>
