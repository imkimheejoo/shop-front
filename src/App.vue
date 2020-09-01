<template>
  <v-app>
    <v-main>
      <Navbar v-on:showTab="showCategoryTab" />
      <drawer ref="drawer"></drawer>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import drawer from "./components/common/Drawer";

export default {
  name: "App",

  components: {
    Navbar,
    drawer,
  },

  data: () => ({
  }),

  methods: {
    showCategoryTab() {
      this.$refs.drawer.drawer = true;
    },
  },
};
</script>
<style>
</style>