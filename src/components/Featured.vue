<template>
    <section class="featured">
        <div v-for="item in items" :key="item.id" class="featured__item">
            <img v-if="item.image.original !== ''" :src="item.image.thumbnail" :alt="item.name">
            <h2 v-text="item.name" />
            <div class="featured__item-cta">
                <p>
                    €{{ item.retailPrice }},-
                </p>
                <button @click="store.addToCart(item)">Add to cart</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store/useShop'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        items: {
            type: Array,
            required: true,
        },
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

    &__item {
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
}
</style>