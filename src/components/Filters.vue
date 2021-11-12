<template>
    <section>
        <h2>Filters</h2>
        <h3>Type</h3>
        <div v-for="type in types" :key="type">
            {{ type }}
        </div>
        <h3>Sets</h3>
        <div v-for="set in sets" :key="set.id">
            {{ set.name }}
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
