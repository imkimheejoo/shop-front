<template>
  <div>
    <v-container class="mt-5">
      <ProductInfo></ProductInfo>
    </v-container>
  </div>
</template>

<script>
import ProductInfo from "../components/ProductInfo";
export default {
  name: "ProductsView",
  components: {
    ProductInfo,
  },
};
</script>

<style scoped>
</style>