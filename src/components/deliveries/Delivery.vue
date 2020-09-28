<template>
    <div class="pa-5">
        <h3 class="pb-5">배송지 선택</h3>
        <v-row>
            <v-select
                    label="배송지 목록"
                    outlined
                    class="pr-2"
                    :items="this.orderInfo.accountDeliveries"
                    item-text="address"
                    item-value="id"
                    v-model="selectedAddress"
            ></v-select>
            <v-btn color="teal accent-4" dark style="height:50px" @click="registerDelivery=true">배송지 추가</v-btn>
        </v-row>

        <v-dialog v-if="registerDelivery" v-model="registerDelivery" width="600px">
            <v-card class="pa-5">
                <v-card-title>
                    <span class="headline">배송지 등록</span>
                </v-card-title>
                <v-form ref="form">
                    <v-text-field
                            label="deliveryKeyword"
                            v-model="newAddress"
                            required
                            :rules="[v => !!v || '주소지는 필수입력사항입니다.']"
                    ></v-text-field>
                    <div class="text-center">
                        <v-btn class="mr-1" color="teal accent-4" dark @click="addDelivery">등록</v-btn>
                        <v-btn color="teal accent-4" dark @click="registerDelivery = false">돌아가기</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        data() {
            return {
                selectedAddress: {},
                registerDelivery: false,
                newAddress: "",
            };
        },
        computed: {
            ...mapState({orderInfo: state => state.orders.orderInfo}),
        },
        watch: {
            selectedAddress() {
                this.$emit("selectDelivery", this.selectedAddress);
            },
        },
        methods: {
            ...mapActions(["ADD_ADDRESS", "FETCH_ADDRESS_BY_ACCOUNT"]),

            validate() {
                return this.$refs.form.validate();
            },

            addDelivery() {
                if (!this.validate()) {
                    return;
                }
                this.ADD_ADDRESS({address: this.newAddress})
                    .then(() => {
                        this.registerDelivery = false;
                        this.FETCH_ADDRESS_BY_ACCOUNT().then(({data}) => {
                            this.orderInfo.accountDeliveries = data.addresses;
                        });
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