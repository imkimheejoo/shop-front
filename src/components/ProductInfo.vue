<template>
  <div class="text-center mt-5">
    <v-row>
      <v-img :src="product.thumbnailUrl" height="250px" width="200"></v-img>
      <v-list-item-content>
        <v-list-item-title class="mb-1">{{product.title}}</v-list-item-title>
        <v-list-item-subtitle>{{convertOptions(product.options)}}</v-list-item-subtitle>
        <v-list-item-subtitle class="black--text text--darken-5">{{product.price}} 원</v-list-item-subtitle>
      </v-list-item-content>
      <v-form ref="form">
        <v-select
          :items="product.options"
          label="옵션"
          no-data-text="품절입니다."
          outlined
          :rules="[v => !!v || '옵션을 꼭 선택해주세요.']"
          v-model="option"
        ></v-select>
        <v-select
          :items="counts"
          label="수량"
          no-data-text="품절입니다."
          outlined
          :rules="[v => v > 0 || '수량을 꼭 선택해주세요.']"
          v-model="count"
        ></v-select>

        <v-btn class="mr-4" color="teal accent-4" dark @click="addCart">cart</v-btn>
        <v-btn class="mr-4" color="teal accent-4" dark @click="submit">submit</v-btn>
      </v-form>
    </v-row>
    <div>{{product.content}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {convertOptions} from '../util/util.js'

export default {
  data: () => ({
    counts: [...Array(10).keys()].map((i) => i + 1),
    option: "",
    count: 0,
  }),
  computed: {
    ...mapState(['product']),
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    submit() {
      if (!this.validate()) {
        return;
      }
      console.log(this.option, this.count, "submit");
    },
    addCart() {
      if (!this.validate()) {
        return;
      }
      console.log("addCart");
    },
    convertOptions
  },
};
</script>

<style>
</style>