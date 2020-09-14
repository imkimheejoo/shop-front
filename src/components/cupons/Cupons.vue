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
      <v-btn color="teal accent-4" dark style="height:50px">할인쿠폰 추가</v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      cupons: [],
      selectedCupon: {},
    };
  },
  watch: {
    selectedCupon() {
      this.$emit('selectCupon', this.selectedCupon);
    }
  },
  computed: {
    ...mapState(["orderInfo"]),
  },
};
</script>

<style>
</style>