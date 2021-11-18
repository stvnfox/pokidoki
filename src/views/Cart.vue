<template>
    <section class="container my-5">
        <h1>Cart</h1>
        <div class="card-row">
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
import { defineComponent } from 'vue';
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
})
</script>
