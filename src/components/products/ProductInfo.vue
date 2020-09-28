<template>
  <v-row class="mt-5" align="center" justify="center">
    <v-col>
      <v-img :src="product.thumbnailUrl" height="250px" width="200" class="mx-auto"></v-img>
    </v-col>
    <v-col class="justify-center">
      <v-row>
        <h3 class="mb-1">
          <b>{{product.title}}</b>
        </h3>
        <v-list-item-subtitle
          class="mb-5 grey--text"
        >{{convertOptions(extractOptionNames(product.options))}}</v-list-item-subtitle>
        <div class="mt-0 pt-0 pb-2 mb-5" />
        <b style="margin-top:15px" class="black--text text--darken-5 mb-3">{{product.price}} 원</b>
      </v-row>
      <v-row>
        <v-form ref="form">
          <v-row>
            <v-col class="pt-0">
              <v-select
                dense
                style="max-width:100px"
                :items="extractOptionNames(product.options)"
                label="옵션"
                no-data-text="품절입니다."
                outlined
                :rules="[v => !!v || '옵션을 꼭 선택해주세요.']"
                v-model="option"
              ></v-select>
            </v-col>
            <v-col class="pt-0">
              <v-select
                dense
                style="max-width:100px"
                :items="counts"
                label="수량"
                no-data-text="품절입니다."
                outlined
                :rules="[v => v > 0 || '수량을 꼭 선택해주세요.']"
                v-model="count"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn class="mr-4" color="teal accent-4" dark @click="addCart">cart</v-btn>
          <v-btn class="mr-4" color="teal accent-4" dark @click="submit">Pay</v-btn>
        </v-form>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { convertOptions } from "../../util/util.js";

export default {
  data: () => ({
    counts: [...Array(10).keys()].map((i) => i + 1),
    option: "",
    count: 0,
  }),
  computed: {
    ...mapState({
      product: state => state.products.product
    }),
  },
  methods: {
    convertOptions,
    validate() {
      return this.$refs.form.validate();
    },
    submit() {
      if (!this.validate()) {
        return;
      }

      let optionId;
      for (let i = 0; i < this.product.options.length; i++) {
        if (this.product.options[i].name === this.option) {
          optionId = this.product.options[i].id;
          // todo 주문페이지로 가는 api 없음
          console.log(optionId, this.option);
          break;
        }
      }

      console.log(this.option, this.count, "submit");
    },
    addCart() {
      if (!this.validate()) {
        return;
      }
      // todo cart 추가 api 없음
      console.log("addCart");
    },
    extractOptionNames(options) {
      return options.map((o) => o.name);
    },
  },
};
</script>

<style>
</style>