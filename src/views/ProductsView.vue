<template>
  <v-container class="mt-5">
    <product-info></product-info>
    <product-detail></product-detail>
    <review></review>
    <question></question>
  </v-container>
</template>

<script>
import ProductInfo from "../components/products/ProductInfo";
import ProductDetail from "../components/products/ProductDetail";
import Question from "../components/questions/Question";
import Review from "../components/reviews/Review";

export default {
  name: "ProductsView",
  components: {
    ProductInfo,
    ProductDetail,
    Question,
    Review,
  },
  created() {
    this.$store.dispatch("FETCH_REVIEWS", this.$route.params.id);
  },
};
</script>

<style scoped>
</style>