<template>
  <div>
    <h1>Counter</h1>
    <p>{{ counter }}</p>
    <button @click="store.addOne">Add one</button>
    <button @click="store.reset">Reset</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCounterStore } from "@/store/useCounter";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const store = useCounterStore();
    const { counter } = storeToRefs(store);

    return {
      store,
      counter,
    };
  },
});
</script>
