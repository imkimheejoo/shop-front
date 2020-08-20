<template>
  <div class="text-center mt-5">
    <v-row>
      <v-img :src="thumbnailUrl" height="250px" width="200"></v-img>
      <v-list-item-content>
        <v-list-item-title class="mb-1">상품명</v-list-item-title>
        <v-list-item-subtitle>상품설명</v-list-item-subtitle>
        <v-list-item-subtitle class="black--text text--darken-5">가격</v-list-item-subtitle>
        <v-list-item-subtitle>옵션들</v-list-item-subtitle>
      </v-list-item-content>
      <v-form ref="form" v-model="lazy" :lazy-validation="lazy">
        <v-select
          :items="items"
          label="옵션"
          no-data-text="품절입니다."
          outlined
          :rules="[v => !!v || '옵션을 꼭 선택해주세요.']"
          required
          v-model="option"
        ></v-select>
        <v-select
          :items="counts"
          label="수량"
          no-data-text="품절입니다."
          outlined
          :rules="[v => v > 0 || '수량을 꼭 선택해주세요.']"
          required
          v-model="count"
        ></v-select>

        <v-btn class="mr-4" color="teal accent-4" dark @click="addCart">cart</v-btn>
        <v-btn class="mr-4" color="teal accent-4" dark @click="submit">submit</v-btn>
      </v-form>
    </v-row>
    <div>상품 상세설명</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    thumbnailUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    valid: true,
    lazy: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    counts: [...Array(10).keys()].map((i) => i + 1),
    option: "",
    count: 0,
  }),
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
  },
};
</script>

<style>
</style>