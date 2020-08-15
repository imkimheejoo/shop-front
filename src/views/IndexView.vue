<template>
  <v-container class="mt-5">
    <v-row class="text-center" align="center" justify="center">
        <Card  v-for="(index) in 12" class="ma-2"
        :key="index"
        cols="12"
        sm="4"
        md="4"
        xl="3"/>
      <v-col class="text-center mt-5">
        <!-- <v-pagination v-model="page" :length="6"></v-pagination> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "../components/Card";
export default {
  components: {
    Card,
  },
};
</script>

<style>
</style>