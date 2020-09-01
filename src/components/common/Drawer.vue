<template>
  <v-navigation-drawer v-model="drawer" absolute temporary class="pa-3">
    <h4>Category</h4>
    <v-list nav dense>
      <v-list-item-group active-class="teal--text text--accent-4">
        <v-list-item v-for="ca in categories" :key="ca.id">
          <v-list-item-title @click="getProductsByCategory(ca.id)">{{ca.title}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      categories: [
        { title: "상의", id: "top" },
        { title: "하의", id: "bottom" },
        { title: "악세서리", id: "acc" },
      ],
    };
  },
  methods: {
    getProductsByCategory(category) {
      this.$router.push(`/products/category/${category}`).catch(() => {});
    },
  },
};
</script>

<style>
</style>