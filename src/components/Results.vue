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
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
        <product
            v-for="item in items"
            :key="item.id"
            :product="item"
        />
    </div>
</template>

<script lang="ts">
import { IType, useStore } from '@/store/useShop'
import { defineComponent, PropType } from 'vue'
import Product from '@/components/Product.vue'
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
    },
    setup() {
        const store = useStore();

        function removeFilter(type: IType) {
            store.changeCheckedValue(type);
        }

        return {
            store,
            removeFilter
        }
    }
})
</script>