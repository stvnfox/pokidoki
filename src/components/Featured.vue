<template>
    <section class="featured">
        <product v-for="item in items" :key="item.id" :product="item"/>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store/useShop'
import { defineComponent } from 'vue'
import Product from '@/components/Product.vue'

export default defineComponent({
    props: {
        items: {
            type: Array,
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

<style lang="scss" scoped>
.featured {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
</style>