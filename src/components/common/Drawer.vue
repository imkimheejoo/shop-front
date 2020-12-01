<template>
  <v-navigation-drawer v-model="drawer" absolute temporary class="pa-3">
    <h4>Category</h4>
    <v-list nav dense>
      <v-list-item-group active-class="teal--text text--accent-4">
        <v-list-item v-for="ca in categories" :key="ca.id">
          <v-list-item-title @click="getProductsByCategory(ca.id)">{{
            ca.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      drawer: false,
      categories: [
        { title: '상의', id: 'top' },
        { title: '하의', id: 'bottom' },
        { title: '악세서리', id: 'acc' },
      ],
    };
  },
  methods: {
    ...mapActions(['FETCH_PRODUCTS_BY_CATEGORY']),

    getProductsByCategory(category) {
      this.FETCH_PRODUCTS_BY_CATEGORY({ category });
    },
  },
};
</script>

<style></style>
