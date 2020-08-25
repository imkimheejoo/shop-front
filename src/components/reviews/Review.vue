<template>
  <div class="ma-5">
    <h2>Review</h2>
    <div v-for="r of this.reviews.contents" :key="r.id">
      <v-row class="ma-5">
        <v-col cols="1" class="pa-0 ma-0">
          <v-img :src="r.imageUrl" height="70px" width="70px"></v-img>
        </v-col>
        <v-col cols="7" class="pt-1">
          <p style="cursor:pointer;" @click="show(r.id)">{{r.title}}</p>
        </v-col>
        <v-col cols="3" sm="3" md="3" xl="3" class="pt-1">
          <v-row class="mx-auto">{{r.author}}</v-row>
          <v-row class="mx-auto">{{r.reviewDate}}</v-row>
        </v-col>
      </v-row>
      <v-divider />
    </div>

    <v-dialog v-if="this.review" v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Review</span>
        </v-card-title>
        <v-card-text>
          <h3>{{this.review.title}}</h3>
          <p v-if="this.review.products" class="mb-2">구매 상품 [{{showOrderProduct()}}]</p>
          <div v-if="this.review.imageUrl">
            <v-img ref="imageUrl" :src="this.review.imageUrl" height="400px" width="550px"></v-img>
          </div>
          {{this.review.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">돌아가기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col class="text-center mt-5">
        <v-pagination v-model="page" :length="reviews.totalPages" total-visible="7"></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      page: 1,
      size: 5,
    };
  },
  created() {
    const { page, size } = this;
    this.FETCH_REVIEWS({ page, size, productId: this.$route.params.id });
  },
  watch: {
    page() {
      const { page, size } = this;
      this.FETCH_REVIEWS({ page, size, productId: this.$route.params.id });
    },
  },
  computed: {
    ...mapState(["reviews", "review"]),
  },
  methods: {
    ...mapActions(["FETCH_REVIEW", "FETCH_REVIEWS"]),

    show(reviewId) {
      this.FETCH_REVIEW(reviewId)
        .then(() => {
          this.dialog = !this.dialog;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    showOrderProduct() {
      return (
        this.review.products.name + "/" + this.review.products.options.join()
      );
    },
  },
};
</script>

<style>
</style>