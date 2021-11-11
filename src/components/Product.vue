<template>
    <div class="product">
        <img v-if="product.image.original !== ''" :src="product.image.thumbnail" :alt="product.name">
        <h2 v-text="product.name" />
        <div class="product-cta">
            <p>
                €{{ product.retailPrice }},-
            </p>
            <button @click="cart ? store.removeFromCart(product) : store.addToCart(product)">
                {{ cart ? 'Remove from' : 'Add to'}} cart
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/useShop'

export default defineComponent({
    props: {
        product: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            default: 0
        },
        cart: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const store = useStore();

        return {
            store
        }
    },
})
</script>


<style scoped lang="scss">
.product {
    img {
        height: 200px;
        width: 200px;
    }

    &-cta {
        display: flex;
        justify-content: space-between;
        margin: 0 4rem;
    }
}
</style>