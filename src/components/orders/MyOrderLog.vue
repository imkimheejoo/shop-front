<template>
  <div>
    <div v-for="o in orderLog.orderLog" :key="o.id" class="mb-3">
      <v-row>
        <v-col>
          <h3 class="mb-5">
            <router-link to="#">{{o.orderTitle}}</router-link>
          </h3>
        </v-col>
        <v-col class="text-right">
          <v-btn>주문취소</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>배송지: {{o.address}}</v-col>
        <v-col class="text-right">
          <strong>{{o.orderState}}</strong>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>

    <v-pagination
      color="teal accent-4"
      v-model="page"
      :length="orderLog.totalPages"
      total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "MyOrderLog",
  data() {
    return {
      page: 1,
      size: 5,
    };
  },
  created() {
    const { page, size } = this;
    this.FETCH_MY_ORDER_LOG({ page, size });
  },
  computed: {
    ...mapState(["orderLog"]),
  },

  watch: {
    page() {
      const { page, size } = this;
      this.FETCH_MY_ORDER_LOG({ page, size });
    },
  },

  methods: {
    ...mapActions(["FETCH_MY_ORDER_LOG"]),
  },
};
</script>

<style>
</style>