<template>
    <v-container class="mt-5">
        <order-products></order-products>
        <v-divider></v-divider>

        <cupons v-on:selectCupon="discount"></cupons>
        <v-divider></v-divider>

        <delivery v-on:selectDelivery="selectDeliveryId"></delivery>
        <v-divider></v-divider>

        <div class="pa-5">
            <v-row>
                <v-col>
                    <h3 class="pb-2">할인금액</h3>
                </v-col>
                <v-col class="text-right">
                    <h3 class="pb-2">{{ this.selectedCupon.salePrice ? this.selectedCupon.salePrice : 0}} 원</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h3 class="pb-2">결제금액</h3>
                </v-col>
                <v-col class="text-right">
                    <h3
                            class="pb-2"
                    >{{ this.selectedCupon.salePrice ? (this.orderInfo.totalPrice - this.selectedCupon.salePrice) :
                        this.orderInfo.totalPrice}} 원</h3>
                </v-col>
            </v-row>

            <v-btn block color="secondary" dark style="height:45px; font-size:18px" @click="payOrder">결제하기</v-btn>
        </div>
    </v-container>
</template>

<script>
    import OrderProducts from "../components/orders/OrderProducts.vue";
    import Cupons from "../components/cupons/Cupons";
    import Delivery from "../components/deliveries/Delivery";
    import {mapActions, mapState} from "vuex";

    export default {
        data() {
            return {
                selectedCupon: {},
                selectedDeliveryId: null,
            };
        },
        components: {
            OrderProducts,
            Cupons,
            Delivery,
        },
        created() {
            this.FETCH_ORDER_INFO({orderId: this.$route.params.orderId});
        },
        computed: {
            ...mapState({orderInfo: state => state.orders.orderInfo}),
        },
        methods: {
            ...mapActions(["FETCH_ORDER_INFO", "ADD_PAY_ORDER"]),

            discount(cupon) {
                this.selectedCupon = cupon;
            },

            selectDeliveryId(deliveryId) {
                this.selectedDeliveryId = deliveryId;
            },

            payOrder() {
                if (!this.selectedDeliveryId) {
                    alert("배송지를 선택하여주세요");
                    return;
                }
                const payInfo = {
                    orderId: this.$route.params.orderId,
                    cuponId: this.selectedCupon.cuponId,
                    deliveryId: this.selectedDeliveryId,
                };

                this.ADD_PAY_ORDER(payInfo)
                    .then((response) => {
                        if (response.status === 200) {
                            alert(
                                "결제가 완료되었습니다! 주문내역은 마이페이지에서 조회 가능합니다."
                            );
                            this.$router.push(`/mypage`);
                        } else if (response.data >= 400) {
                            alert(response.data.message);
                        }
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            },
        },
    };
</script>

<style>
</style>