<template>
    <div class="pa-5">
        <h3 class="pb-5">쿠폰 할인</h3>
        <v-row>
            <v-select
                    label="쿠폰 목록"
                    outlined
                    class="pr-2"
                    :items="this.orderInfo.accountCupons"
                    item-text="cuponName"
                    return-object
                    v-model="selectedCupon"
            ></v-select>
            <v-btn color="teal accent-4" dark style="height:50px" @click="registerCupon=true">할인쿠폰 추가</v-btn>
        </v-row>

        <v-dialog v-if="registerCupon" v-model="registerCupon" width="600px">
            <v-card class="pa-5">
                <v-card-title>
                    <span class="headline">쿠폰등록</span>
                </v-card-title>
                <v-form ref="form">
                    <v-text-field label="cuponNumber" required :rules="[v => !!v || '쿠폰번호는 필수입력사항입니다.']"></v-text-field>
                    <div class="text-center">
                        <v-btn class="mr-1" color="teal accent-4" dark @click="addCupon">등록</v-btn>
                        <v-btn color="teal accent-4" dark @click="registerCupon = false">돌아가기</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        data() {
            return {
                cupons: [],
                selectedCupon: {},
                registerCupon: false,
            };
        },
        watch: {
            selectedCupon() {
                this.$emit("selectCupon", this.selectedCupon);
            },
        },
        computed: {
            ...mapState({orderInfo: state => state.orders.orderInfo}),
        },
        methods: {
            ...mapMutations(["SET_CUPONS"]),
            ...mapActions(["ADD_CUPON", "FETCH_CUPONS_BY_ACCOUNT"]),

            validate() {
                return this.$refs.form.validate();
            },
            addCupon(cuponNumber) {
                if (!this.validate()) {
                    return;
                }

                this.ADD_CUPON({cuponNumber})
                    .then((response) => {
                        if (response.status === 200) {
                            alert("쿠폰이 정상적으로 등록되었습니다!");
                            this.registerCupon = false;
                            this.FETCH_CUPONS_BY_ACCOUNT().then(({data}) => {
                                this.SET_CUPONS(data.cupons);
                            })

                        } else {
                            alert(response.message);
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