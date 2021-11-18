<template>
  <div class="container search">
    <div class="search-options row">
      <searchbar/>
    </div>
  </div>
  <div class="container">
    <div class="search-sort row justify-content-end pb-3">
      <div class="col-lg-6">
        <sort/> 
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2">
        <filters/>
      </div>
      <div class="col-lg-10">
        <results :items="store.products"/>
        <transition name="fade" mode="out-in">
          <div v-if="store.products.length > 0" class="uiv">
            <pagination
              v-model="store.currentPage"
              :total-page="store.total / store.pageSize"
              class="mb-5"
              @change="store.changePage()"
            />
          </div>
        </transition>
      </div>
    </div>
    <modal/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/useShop";
import { IProduct } from "@/interfaces/IProduct";
import Filters from "@/components/Filters.vue";
import Modal from '@/components/Modal.vue';
import Results from "@/components/Results.vue";
import Searchbar from "@/components/Searchbar.vue";
import Sort from "@/components/Sort.vue";

export default defineComponent({
  components: {
    Filters,
    Modal,
    Results,
    Searchbar,
    Sort
  },
  setup() {
    const store = useStore();

    return {
      store
    }
  },
  mounted() {
    this.store.getProducts(this.store.currentPage);
    this.store.getSessionItem('cart');
  }
});
</script>
