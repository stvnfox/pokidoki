<template>
  <div>
    <h1>SNKRT</h1>
    <featured :items="store.featuredItems"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/useShop";
import { storeToRefs } from "pinia";
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
    this.store.getFeaturedItems(12);
  }
});
</script>
