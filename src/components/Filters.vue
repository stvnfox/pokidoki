<template>
    <section class="filters">
        <h2>Filters</h2>
        <div class="filters__type">
            <button
                class="btn btn-filter px-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#types"
                aria-expanded="false"
                aria-controls="types"
            >
                Type
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            <div id="types" class="collapse show filters__type-items">
                <div v-for="type in types" :key="type" class="filters__type-items-item">
                    <input :id="type" type="checkbox">
                    <label :for="type">{{ type }}</label>
                </div>
            </div>
        </div>
        <div class="filters__type">
            <button
                class="btn btn-filter px-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sets"
                aria-expanded="false"
                aria-controls="sets"
            >
                Sets
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            <div id="sets" class="collapse show filters__type-items scrollable">
                <div v-for="set in sets" :key="set.id" class="filters__type-items-item">
                    <input :id="set.name" type="checkbox">
                    <label :for="set.name">{{ set.name }}</label>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ISet } from "@/interfaces/ISet";

export default defineComponent({
    props: {
        types: {
            type: Array,
            required: true
        },
        sets: {
            type: Object as PropType<ISet>,
            required: true
        }
    },
})
</script>
