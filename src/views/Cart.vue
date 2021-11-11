<template>
    <section>
        <h1>Cart</h1>
        <div class="card-row">
            <cart-item
                v-for="(item, index) in store.cart"
                :key="item.id"
                :item="item"
                :index="index"
            />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/useShop';
import CartItem from '@/components/CartItem.vue';

export default defineComponent({
    components: {
        CartItem,
    },
    setup() {
        const store = useStore();
        
        return {
            store
        }
    },
})
</script>
