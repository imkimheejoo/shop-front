<template>
  <v-container class="mt-5">
    <v-row align="center" justify="center">
      <Card
        v-for="(product,index) in this.products"
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
        <v-pagination v-model="page" :length="6"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "../components/Card";
import {mapState} from 'vuex';
export default {
  data(){
    return{
      page:3
    }
  },
  components: {
    Card
  },
  computed:{
    ...mapState([
      'products'
    ])
  }
};
</script>

<style>
</style>