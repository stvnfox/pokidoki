<template>
    <section class="d-flex justify-content-end">    
        <div class="sort">
            <label for="sort-options" class="text-nowrap">Per page:</label>
            <select v-model="store.pageSize" id="sort-options" class="form-select" @change="changePageSize">
                <option v-for="option in store.pageSizeValues" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="sort">
            <label for="sort-options">Sort:</label>
            <select v-model="store.orderBy" id="sort-options" class="form-select" @change="getSortedProducts">
                <option value="" selected>Featured</option>
                <option v-for="option in store.orderByValues" :key="option.realValue" :value="option.realValue">
                    {{ option.displayValue }}
                </option>
            </select>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/useShop';

export default defineComponent({
    setup() {
        const store = useStore();

        const getSortedProducts = () => {
            store.getProducts();
        }

        const changePageSize = () => {
            store.getProducts()
        }

        return {
            store,
            changePageSize,
            getSortedProducts
        }
    },
})
</script>
