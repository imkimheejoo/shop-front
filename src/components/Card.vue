<template>
   <v-hover
        v-slot:default="{ hover }"
        open-delay="200"
      >
    <v-card-actions @click="showProduct">
      <v-card width="250" :elevation="hover ? 16 : 2">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

        <v-card-title>상품명</v-card-title>
        <v-card-subtitle>옵션들</v-card-subtitle>
        <v-card-subtitle>상품가격</v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card-actions>
  </v-hover>
</template>

<script>
export default {
  methods: {
    showProduct() {
      console.log("show Product");
    },
  },
};
</script>

<style>
</style>