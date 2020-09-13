<template>
  <v-container class="mt-5">
    <order-products></order-products>
    <cupons></cupons>
    <delivery></delivery>
    <order-price-info></order-price-info>
    <v-btn block color="secondary" dark style="height:45px; font-size:18px">결제하기</v-btn>
  </v-container>
</template>

<script>
import OrderProducts from "../components/orders/OrderProducts.vue";
import Cupons from "../components/cupons/Cupons";
import Delivery from "../components/deliveries/Delivery";
import OrderPriceInfo from "../components/orders/OrderPriceInfo";

export default {
  components: {
    OrderProducts,
    Cupons,
    Delivery,
    OrderPriceInfo,
  },
};
</script>

<style>
</style>