<template>
    <section class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 py-5">
            <product
                v-for="item in items"
                :key="item.id"
                :product="item"
            />
        </div>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store/useShop'
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

        return {
            store
        }
    }
})
</script>