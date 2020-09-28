<template>
  <div>
    <div v-for="c in myCupons.cupons" :key="c.id">
      <div class="pl-3">
        <h4 class="pb-5 pt-3">{{c.cuponName}}</h4>
        <div class="pb-2">할인금액: {{c.salePrice}}</div>
        <div class="pb-2">유효기간: {{c.expireDate}}</div>
      </div>
      <v-divider></v-divider>
    </div>
    <v-btn block @click="dialog = true" class="pt-3">쿠폰 추가</v-btn>

    <v-pagination
      color="teal accent-4"
      v-model="page"
      :length="myCupons.totalPages"
      total-visible="7"
      class="pt-5"
    ></v-pagination>

    <v-dialog v-if="dialog" v-model="dialog" width="600px">
      <v-card class="pa-5">
        <v-card-title>
          <span class="headline">쿠폰등록</span>
        </v-card-title>
        <v-form ref="form">
          <v-text-field label="cuponNumber" required :rules="[v => !!v || '쿠폰번호는 필수입력사항입니다.']"></v-text-field>
          <div class="text-center">
            <v-btn class="mr-1" color="teal accent-4" dark @click="addCupon">등록</v-btn>
            <v-btn color="teal accent-4" dark @click="dialog = false">돌아가기</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      page: 1,
      size: 5,
      dialog: false,
      newAddress: "",
    };
  },
  created() {
    const { page, size } = this;
    this.FETCH_CUPONS_BY_ACCOUNT({ page, size }).then(({ data }) => {
      this.SET_MY_CUPONS(data);
    });
  },
  computed: {
    ...mapState({myCupons : state => state.cupons.myCupons}),
  },
  methods: {
    ...mapMutations(["SET_MY_CUPONS"]),
    ...mapActions(["FETCH_CUPONS_BY_ACCOUNT", "ADD_CUPON"]),

    addCupon(cuponNumber) {
      this.ADD_CUPON({ cuponNumber })
        .then((response) => {
          if (response.status === 200) {
            alert("쿠폰이 정상적으로 등록되었습니다!");
            this.dialog = false;
            const { page, size } = this;
            this.FETCH_CUPONS_BY_ACCOUNT({ page, size }).then(({ data }) => {
              this.SET_MY_CUPONS(data);
            });
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