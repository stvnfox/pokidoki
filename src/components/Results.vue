<template>
    <div class="filters__active">
        <button
            v-for="filter in store.checkedFilters"
            :key="filter.name"
            class="btn btn-secondary"
            @click="removeFilter(filter)"
        >
            {{ filter.name }}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
    <div>
        <Promised :promise="getResults">
            <template v-slot:combined="{ isPending }">
                <transition name="fade" mode="out-in">
                    <template v-if="isPending">
                        <div class="results" key="loading">
                            <div class="spinner-border text-success" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="items.length > 0">
                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5" key="result">
                            <transition-group name="fade">
                                <product
                                    v-for="item in items"
                                    :key="item.id"
                                    :product="item"
                                />
                            </transition-group>
                        </div>
                    </template>
                    <template v-else>
                        <div class="results" key="noResults">
                            <h2>
                                No results found    
                            </h2>    
                        </div> 
                    </template>
                </transition>
            </template>
        </Promised>
    </div>
</template>

<script lang="ts">
import { IType, useStore } from '@/store/useShop';
import { defineComponent, PropType, ref } from 'vue';
import { Promised } from 'vue-promised';
import Product from '@/components/Product.vue';
import { IProduct } from '@/interfaces/IProduct';

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<IProduct[]>,
            required: true,
        },
    },
    components: {
        Product,
        Promised
    },
    setup() {
        const store = useStore();
        const getResults = ref<Promise<IProduct[]>|null>(null);

        function removeFilter(filter: IType) {
            filter.checked = !filter.checked;
            store.getProducts(store.currentPage)
        }

        return {
            getResults,
            store,
            removeFilter
        }
    },
    mounted() {
        this.getResults = this.store.getProducts();
    }
})
</script>