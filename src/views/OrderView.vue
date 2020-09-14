<template>
  <v-container class="mt-5">
    <order-products></order-products>
    <v-divider></v-divider>

    <cupons v-on:selectCupon="discount"></cupons>
    <v-divider></v-divider>

    <delivery></delivery>
    <v-divider></v-divider>

    <div class="pa-5">
      <h3 class="pb-2">할인금액 {{ this.selectedCupon.salePrice ? this.selectedCupon.salePrice : 0}} 원</h3>
      <h3 class="pb-2">결제금액 {{ this.selectedCupon.salePrice ? (this.orderInfo.totalPrice - this.selectedCupon.salePrice) : this.orderInfo.totalPrice}} 원</h3>
      <v-btn block color="secondary" dark style="height:45px; font-size:18px">결제하기</v-btn>
    </div>
  </v-container>
</template>

<script>
import OrderProducts from "../components/orders/OrderProducts.vue";
import Cupons from "../components/cupons/Cupons";
import Delivery from "../components/deliveries/Delivery";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      selectedCupon: {},
    };
  },
  components: {
    OrderProducts,
    Cupons,
    Delivery,
  },
  created() {
    this.FETCH_ORDER_INFO({ orderId: this.$route.params.orderId });
  },
  computed: {
    ...mapState(["orderInfo"]),
  },
  methods: {
    ...mapActions(["FETCH_ORDER_INFO"]),
    discount(cupon) {
      this.selectedCupon = cupon;
    },
  },
};
</script>

<style>
</style>