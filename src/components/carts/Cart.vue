<template>
    <div>
        <v-treeview>
            <div v-for="c in this.carts.contents" :key="c.id">
                <v-row class="pa-5">
                    <v-col cols="1" class="ma-0 pr-0 pl-5 text-center">
                        <v-checkbox v-model="selected" :value="c.id"></v-checkbox>
                    </v-col>
                    <v-col cols="1" class="ma-0 pa-0">
                        <v-img :src="c.imageUrl" height="100px" width="100px"></v-img>
                    </v-col>
                    <v-col class="pt-0">
                        <v-row class="pa-5">
                            <v-col cols="11">
                                <h4>
                                    <router-link
                                            style="text-decoration:none;"
                                            :to="`/products/${c.productId}`"
                                    >{{c.productName}}
                                    </router-link>
                                </h4>
                            </v-col>
                            <v-col cols="1">
                                <v-btn color="teal accent-4" dark @click="deleteCartItem(c.id)">삭제</v-btn>
                            </v-col>
                        </v-row>

                        <span
                                v-for="option in c.options"
                                :key="option.option"
                        >옵션: {{option.option}} / 수량: {{option.count}}</span>
                        <h4 class="text-right">{{c.totalPrice}}원</h4>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
        </v-treeview>
        <div>
            <v-row>
                <v-col cols="9">
                    <h2 class="pa-5">결제예정 금액</h2>
                </v-col>
                <v-col cols="3">
                    <h2 class="text-right pa-5">{{this.price}} 원</h2>
                </v-col>
            </v-row>
            <v-btn block color="teal accent-4" dark class="mb-5" @click="prepareOrderWithItems">
                <h3>구매하기</h3>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "Cart",
        data() {
            return {
                price: 0,
                selected: [],
            };
        },
        created() {
            this.FETCH_ACCOUNT_CARTS().then(() => {
                this.checked = new Array(this.carts.contents.length);
                this.checked.fill(false);
            });
        },
        computed: {
            ...mapState({carts: state => state.carts.carts}),
        },
        watch: {
            selected() {
                this.price = this.carts.contents
                    .filter((i) => this.selected.includes(i.id))
                    .map((i) => i.totalPrice)
                    .reduce((a, b) => a + b, 0);
            },
        },
        methods: {
            ...mapActions([
                "FETCH_ACCOUNT_CARTS",
                "DELETE_CART_ITEM",
                "ADD_ORDER_ITEMS",
            ]),

            deleteCartItem(id) {
                this.DELETE_CART_ITEM({cartId: id})
                    .then(() => {
                        this.FETCH_ACCOUNT_CARTS().then(() => {
                            alert("삭제가 완료되었습니다.");
                            this.deleteSelectedItem(id);
                        });
                    })
                    .catch((error) => {
                        alert(error);
                    });
            },

            deleteSelectedItem(id) {
                for (let i = 0; this.selected.length; i++) {
                    if (this.selected[i] === id) {
                        this.selected.splice(i, 1);
                        break;
                    }
                }
            },

            prepareOrderWithItems() {
                this.ADD_ORDER_ITEMS({cartItems: this.selected})
                    .then(({data}) => {
                        this.$router.push(`/orders/${data.orderId}`);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            },
        },
    };
</script>

<style>
</style>