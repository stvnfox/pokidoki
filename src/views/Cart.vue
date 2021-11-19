<template>
    <section class="container my-5">
        <h1>Cart</h1>
        <div class="row row-cols-1 row-cols-md-2 g-4 pb-5">
            <product
                v-for="(item, index) in store.cart"
                :key="item.id"
                :product="item"
                :index="index"
                cart
            />
        </div>
        <modal :cart="true"/>
    </section>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useStore } from '@/store/useShop';
import Modal from '@/components/Modal.vue';
import Product from '@/components/Product.vue';

export default defineComponent({
    components: {
        Modal,
        Product
    },
    setup() {
        const store = useStore();
        
        return {
            store
        }
    },
    mounted() {
        this.store.getSessionItem('cart');
    }
})
</script>
