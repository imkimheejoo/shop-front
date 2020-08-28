<template>
  <div>
    <div v-for="c in this.carts.contents" :key="c.id">
      <v-row class="pa-5">
        <v-col cols="1" class="ma-0 pr-0 pl-5 text-center">
          <v-checkbox></v-checkbox>
        </v-col>
        <v-col cols="1" class="ma-0 pa-0">
          <v-img :src="c.imageUrl" height="100px" width="100px"></v-img>
        </v-col>
        <v-col class="pt-0">
          <v-row>
            <v-col cols="11">
              <h4>
                <router-link
                  style="text-decoration:none;"
                  :to="`/products/${c.productId}`"
                >{{c.productName}}</router-link>
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CartView",
  data() {
    return {
      page: 1,
      size: 5,
    };
  },
  created() {
    this.FETCH_ACCOUNT_CARTS();
  },
  computed: {
    ...mapState(["carts"]),
  },
  methods: {
    ...mapActions(["FETCH_ACCOUNT_CARTS", "DELETE_CART_ITEM"]),

    deleteCartItem(id) {
      this.DELETE_CART_ITEM(id)
        .then(() => {
          this.FETCH_ACCOUNT_CARTS().then(() => {
            alert("삭제가 완료되었습니다.");
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>

<style>
</style>