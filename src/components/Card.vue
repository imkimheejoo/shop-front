<template>
  <router-link style="text-decoration:none;" :to="`/products/${product.id}`">
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-card @click="showProduct" width="250" :elevation="hover ? 16 : 2">
        <v-img :src="product.thumbnailUrl" height="200px"></v-img>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="mb-1">{{product.title}}</v-list-item-title>
            <v-list-item-subtitle>{{convertOptions(product.options)}}</v-list-item-subtitle>
            <v-list-item-subtitle class="black--text text--darken-5">{{product.price}}원</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-hover>
  </router-link>
</template>

<script>
import {convertOptions} from '../util/util.js'
export default {
  props: ["product"],
  methods: {
    showProduct() {
      console.log("show Product");
    },
    convertOptions
  },
};
</script>

<style>
</style>