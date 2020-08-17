<template>
  <v-container class="mt-5">
    <v-row  v-if="this.products" align="center" justify="center">
      <Card
        v-for="(product,index) in this.products.contents"
        class="ma-2"
        :key="index"
        cols="12"
        sm="4"
        md="4"
        xl="3"
        :product="product"
      />
    </v-row>
    <v-row>
      <v-col class="text-center mt-5">
        <v-pagination v-model="page" :length="products.totalPages" total-visible="7"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "../components/Card";
import { mapState, mapActions } from "vuex";
export default {
  watch: {
    page() {
      this.FETCH_PRODUCTS(this.page);
    },
  },
  data() {
    return {
      page: 3,
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["FETCH_PRODUCTS"])
  }
};
</script>

<style>
</style>