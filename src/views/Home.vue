<template>
  <div class="container">
    <div class="search-options row">
      <searchbar/>
    </div>
  </div>
  <results :items="store.products"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/useShop";
import Results from "@/components/Results.vue";
import Searchbar from "@/components/Searchbar.vue";

export default defineComponent({
  components: {
    Results,
    Searchbar
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  mounted() {
    this.store.getProducts(12);
  }
});
</script>
