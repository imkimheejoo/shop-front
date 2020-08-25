<template>
  <div>
    <v-row class="ml-5 pl-5">
      <v-col cols="1" class="pa-0 ma-0">
        <img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="70px" width="70px" />
      </v-col>
      <v-col cols="7" class="pt-1">
        <v-row>
          <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on, attrs }">
              <div color="primary" dark v-bind="attrs" v-on="on">리뷰 제목</div>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Review</span>
              </v-card-title>
              <v-card-text>
                <h3>title</h3>
                <div>[상품명/옵션명 -> 리스트면 ,로 구분]</div>
                <!-- <div v-if="리뷰에 이미지가 있으면"> -->
                <img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="400px"
                  width="550px"
                />
                <!-- </div> -->
                내용~~~~~~~~~~~~
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">돌아가기</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
      <v-col cols="3" sm="3" md="3" xl="3" class="pt-1">
        <v-row class="mx-auto">작성자</v-row>
        <v-row class="mx-auto">작성시간</v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style>
</style>