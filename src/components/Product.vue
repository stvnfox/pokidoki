<template>
    <div class="col product">
        <div class="card pt-4">
            <img :src="product.images.small" :alt="product.name" class="skeleton">
            <div class="card-body">
                <h2 class="text-center" v-text="product.name" />
            </div>
            <div v-if="product.cardmarket" class="card-footer py-3">
                <h3 class="mb-0">
                    € {{ Math.ceil(product.cardmarket.prices.trendPrice) }},-
                </h3>
                <button
                    type="button"
                    data-bs-toggle="modal"
                    :data-bs-target="cart ? '#remove-message' : '#add-message'"
                    class="btn btn-secondary"
                    @click="cart ? removeFromCart(index) : addToCart('cart', product)"
                >
                    {{ cart ? 'Remove from' : 'Add to' }} cart
                </button>
            </div>
            <div v-else class="card-footer py-3">
                <h3 class="mb-0">Not for sale</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from '@/store/useShop';
import { IProduct } from '@/interfaces/IProduct';

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProduct>,
            required: true
        },
        index: {
            type: Number,
            default: null
        },
        cart: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const store = useStore();

        const addToCart = (key: string, product: IProduct) => {
            store.addToCart(key, product);
        }

        const removeFromCart = (product: number) => {
            store.productIndex = product;
        }

        return {
            store,
            addToCart,
            removeFromCart
        }
    },
})
</script>