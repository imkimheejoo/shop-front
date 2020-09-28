<template>
  <div>
    <div v-for="d in myAddresses.addresses" :key="d.id">
      <v-row class="pa-5">
        <v-col>
          <h4>{{d.address}}</h4>
        </v-col>
        <v-col class="text-right">
          <v-icon color="teal accent-4" @click="deleteAddress(d.id)">mdi-delete</v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
    <v-btn block @click="dialog = true" class="pt-3">배송지 추가</v-btn>

    <v-pagination
      color="teal accent-4"
      v-model="page"
      :length="myAddresses.totalPages"
      total-visible="7"
      class="pt-5"
    ></v-pagination>

    <v-dialog v-if="dialog" v-model="dialog" width="600px">
      <v-card class="pa-5">
        <v-card-title>
          <span class="headline">배송지 등록</span>
        </v-card-title>
        <v-form ref="form">
          <v-text-field
            label="deliveryKeyword"
            v-model="newAddress"
            required
            :rules="[v => !!v || '주소지는 필수입력사항입니다.']"
          ></v-text-field>
          <div class="text-center">
            <v-btn class="mr-1" color="teal accent-4" dark @click="addAddress">등록</v-btn>
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

    this.FETCH_ADDRESS_BY_ACCOUNT({ page, size }).then(({ data }) => {
      this.SET_MY_ADDRESSES(data);
    });
  },
  computed: {
    ...mapState({myAddresses: state => state.addresses.myAddresses}),
  },
  methods: {
    ...mapMutations(["SET_MY_ADDRESSES"]),
    ...mapActions([
      "FETCH_ADDRESS_BY_ACCOUNT",
      "ADD_ADDRESS",
      "DELETE_ADDRESS",
    ]),

    deleteAddress(deliveryId) {
      this.DELETE_ADDRESS({ deliveryId }).then((response) => {
        if (response.status === 200) {
          alert("배송지를 식제하였습니다.");
          const { page, size } = this;
          this.FETCH_ADDRESS_BY_ACCOUNT({ page, size }).then(({ data }) => {
            this.SET_MY_ADDRESSES(data);
          });
        } else {
          alert(response.data.message);
        }
      });
    },

    addAddress() {
      this.ADD_ADDRESS({ address: this.newAddress }).then((response) => {
        if (response.status === 200) {
          alert("주소를 등록하였습니다.");
          this.dialog = false;
          const { page, size } = this;
          this.FETCH_ADDRESS_BY_ACCOUNT({ page, size });
        } else {
          alert(response.data.message);
        }
      });
    },
  },
};
</script>

<style>
</style>