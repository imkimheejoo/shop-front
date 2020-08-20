<template>
  <div>
    <v-container class="mt-5">
      <v-row class="justify-center">
        <ProductInfo></ProductInfo>
        <ProductDetail></ProductDetail>
        <Review></Review>
        <Question></Question>
      </v-row>
    </v-container>
  </div>
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
    Review
  },
};
</script>

<style scoped>
</style>