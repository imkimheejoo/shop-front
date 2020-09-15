<template>
  <v-container class="mt-5">
    <v-tabs fixed-tabs background-color="grey lighten-1">
      <v-tab @click="currentTab = 'MyOrderLog'">주문내역</v-tab>
      <v-tab @click="currentTab = 'MyQuestions'">문의내역</v-tab>
      <v-tab @click="currentTab = 'MyDeliveries'">배송지관리</v-tab>
      <v-tab @click="currentTab = 'MyCupons'">쿠폰관리</v-tab>
    </v-tabs>

    <keep-alive>
      <component :is="whichTab"></component>
    </keep-alive>
  </v-container>
</template>

<script>
export default {
  name: "AccountView",
  data() {
    return {
      currentTab: "MyOrderLog",
    };
  },
  components: {
    // dynamic components
    MyOrderLog: () => import("../components/orders/MyOrderLog"),
    MyQuestions: () => import("../components/questions/MyQuestions"),
    MyDeliveries: () => import("../components/deliveries/MyDeliveries"),
    MyCupons: () => import("../components/cupons/MyCupons"),
  },
  computed: {
    whichTab() {
      return this.currentTab;
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>