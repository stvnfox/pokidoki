<template>
  <div class="container search">
    <div class="search-options row">
      <searchbar/>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-lg-2">
        <filters/>
      </div>
      <div class="col-lg-10">
        <results :items="store.products"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/useShop";
import Filters from "@/components/Filters.vue";
import Results from "@/components/Results.vue";
import Searchbar from "@/components/Searchbar.vue";

export default defineComponent({
  components: {
    Filters,
    Results,
    Searchbar
  },
  setup() {
    const store = useStore();

    return {
      store,
    }
  },
  mounted() {
    this.store.getProducts(12);
  }
});
</script>
