<template>
  <section>
    <navbar />
    <main class="main">
      <router-view />
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  components: {
    Navbar
  },
})
</script>
