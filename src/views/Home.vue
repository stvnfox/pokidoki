<template>
  <div>
    <h1>SNKRT</h1>
    <featured :items="store.featuredItems"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/useShop";
import Featured from "@/components/Featured.vue"

export default defineComponent({
  components: {
    Featured
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  mounted() {
    this.store.getProducts(10);
  }
});
</script>
