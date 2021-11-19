<template>  
    <div class="modal fade" :id="cart ? 'remove-message' : 'add-message'" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    {{ cart ? 'Remove from cart' : 'Added to cart'}}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {{
                    cart ? 
                    'Are you sure you want to remove this article from your shopping cart?' :
                    'Article is added to your cart!'
                }}
            </div>
            <div class="modal-footer">
                <div v-if="cart">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="removeFromCart('cart')">Remove</button>
                </div>
                <div v-else>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue shopping</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="goToCart">Go to cart</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/useShop';

export default defineComponent({
    props: {
        cart: {
            type: Boolean,
            default: false,
        }
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const goToCart = () => {
            router.push('/cart')
        }

        const removeFromCart = (key: string)  => {
            store.removeFromCart(key, store.productIndex);
        }

        return {
            router,
            store,
            removeFromCart,
            goToCart
        }
    },
})
</script>