<template>
    <div>
        <img v-if="item.image.original !== ''" :src="item.image.thumbnail" :alt="item.name">
        <h2 v-text="item.name" />
        <div class="featured__item-cta">
            <p>
                €{{ item.retailPrice }},-
            </p>
            <button @click="store.removeFromCart(index)">Remove cart</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/useShop'

export default defineComponent({
    props: {
        item: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true
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


<style>

</style>