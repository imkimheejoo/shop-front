<template>
  <v-container class="mt-5">
   <cart></cart>
  </v-container>
</template>

<script>
import Cart from '../components/carts/Cart'
export default {
  name: "CartView",
  data: () => ({
  }),
  components :{
      Cart,
  }
};
</script>

<style scoped>
</style>