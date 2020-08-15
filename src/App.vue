<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/common/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
</style>