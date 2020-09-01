<template>
  <v-navigation-drawer v-model="drawer" absolute temporary class="pa-3">
    <h4>Category</h4>
    <v-list nav dense>
      <v-list-item-group active-class="teal--text text--accent-4">
        <v-list-item>
          <v-list-item-title>상의</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>하의</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
};
</script>

<style>
</style>