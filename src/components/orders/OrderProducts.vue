<template>
  <div>
    <div v-for="p in this.orderInfo.orderProducts" :key="p.id">
      <v-row class="pa-5">
        <v-col cols="1" class="ma-0 pa-0">
          <v-img :src="p.imageUrl" height="100px" width="100px"></v-img>
        </v-col>
        <v-col class="pt-0">
          <v-row>
            <v-col cols="11" class="pt-0">
              <h4>
                <router-link
                  style="text-decoration:none;"
                  :to="`/products/${p.productId}`"
                >{{p.productName}}</router-link>
              </h4>
            </v-col>
          </v-row>
          <span
            v-for="option in p.options"
            :key="option.option"
          >옵션: {{option.option}} / 수량: {{option.count}}</span>
          <h4 class="text-right">{{p.totalPrice}}원</h4>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["orderInfo"]),
  },
};
</script>

<style>
</style>