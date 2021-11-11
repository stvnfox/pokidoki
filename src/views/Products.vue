<template>
  <div class="products">
    <h1>All our products</h1>
    <div class="products__row">
      <product
        v-for="product in store.productsWithImage"
        :key="product.id"
        :product="product"
      />
      <button @click="loadMore">Load more</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/useShop";
import { storeToRefs } from "pinia";
import Product from "@/components/Product.vue"

export default defineComponent({
  components: {
    Product
  },
  setup() {
    const store = useStore();
    const { pageSize, more } = storeToRefs(store)

    const loadMore = () => {
      store.pageSize = store.pageSize + store.more;
      const visibleProducts = store.productsWithImage.slice(store.pageSize, store.more);
      console.log(store.pageSize)
    }

    return {
      store,
      pageSize,
      more,
      loadMore
    };
  },
  mounted() {
    this.store.getProducts(50);
  }
});
</script>

<style lang="scss" scoped>
.products {
  &__row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
