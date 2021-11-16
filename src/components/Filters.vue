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
                <div v-for="type in store.filters.types" :key="type" class="filters__type-items-item">
                    <input :id="type.name" :checked="type.checked" type="radio" @change="updateTypeFilter(type)">
                    <label :for="type.name">{{ type.name }}</label>
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
            <div id="sets" class="collapse show">
                <div class="filters__type-items-search mb-3">
                    <input v-model="searchSets" type="text" class="form-input" />
                    <button class="btn btn-secondary p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div class="filters__type-items scrollable">
                    <div v-for="set in matchingSets" :key="set.id" class="filters__type-items-item">
                        <input :id="set.name" :checked="set.checked" type="radio" @change="updateSetFilter(set)">
                        <label :for="set.name">{{ set.name }}</label>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore, IType } from '@/store/useShop';
import { ISetWChecked } from '@/interfaces/ISet';

export default defineComponent({
    setup() {
        const searchSets = ref('');
        const store = useStore();

        const matchingSets = computed(() => {
            return store.filters.sets.filter((set) => set.name.toLowerCase().includes(searchSets.value.toLowerCase()));
        })

        function updateTypeFilter(type: IType) {
            store.changeCheckedTypeValue(type);
        }

        function updateSetFilter(set: ISetWChecked) {
            store.changeCheckedSetValue(set);
        }

        return {
            searchSets,
            store,
            matchingSets,
            updateSetFilter,
            updateTypeFilter
        }
    },
    mounted() {
        this.store.getFilters();
    }
})
</script>
