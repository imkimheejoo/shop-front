<template>
  <div class="ma-5">
    <h2>Review</h2>
    <v-col class="text-right">
      <v-btn color="teal accent-4" dark @click="showReviewForm()">리뷰 추가하기</v-btn>
    </v-col>
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

    <v-row justify="center">
      <v-dialog v-model="formDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">리뷰 작성</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-text-field
                  v-model="inputTitle"
                  label="리뷰제목"
                  :rules="[v => !!v || '제목은 필수입력사항입니다.']"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="inputContent"
                  label="리뷰 내용"
                  :rules="[v => !!v || '리뷰내용은 필수입력사항입니다.']"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-file-input v-model="inputImage" label="image"></v-file-input>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="formDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addReview()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-col class="text-center mt-5">
        <v-pagination
          color="teal accent-4"
          v-model="page"
          :length="reviews.totalPages"
          total-visible="7"
        ></v-pagination>
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
      formDialog: false,
      page: 1,
      size: 5,
      inputTitle: "",
      inputContent: "",
      inputImage: {},
      isOrdered: Boolean,
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
    ...mapActions([
      "FETCH_REVIEW",
      "FETCH_REVIEWS",
      "ADD_REVIEW",
      "FETCH_ORDERLOG",
    ]),

    show(reviewId) {
      this.FETCH_REVIEW(reviewId)
        .then(() => {
          this.dialog = !this.dialog;
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    showReviewForm() {
      if (this.$store.state.account) {
        if (this.isOrdered === true) {
          this.formDialog = !this.formDialog;
        } else {
          const { productId } = this;
          this.FETCH_ORDERLOG({
            productId,
            accountId: this.$store.state.account.id,
          })
            .then((response) => {
              if (response.data.orderState === true) {
                this.isOrdered = response.data.orderState;
                this.formDialog = !this.formDialog;
              } else {
                throw new Error();
              }
            })
            .catch((error) => {
              if (error.code !== 404) {
                alert("해당 상품을 구매한 고객님만 리뷰를 등록할 수 있습니다.");
              }
            });
        }
      } else {
        alert("해당 상품을 구매한 고객님만 리뷰를 등록할 수 있습니다.");
      }
    },

    validate() {
      return this.$refs.form.validate();
    },

    addReview() {
      if (this.validate()) {
        const { inputTitle, inputContent, inputImage } = this;
        this.ADD_REVIEW({
          inputTitle,
          inputContent,
          inputImage,
          productId: this.$route.params.id,
        })
          .then(() => {
            alert("리뷰를 등록해주셔서 감사합니다!");
            this.formDialog = !this.formDialog;

            this.clearReviewForm();

            const { size } = this;
            this.FETCH_REVIEWS({
              page: 1,
              size,
              productId: this.$route.params.id,
            }).then((response) => {
              this.page = response.data.pageable.pageNumber;
            });
          })
          .catch((error) => {
            console.log(error.message);
            alert("리뷰 등록에 실패하였습니다. 다시시도해주세요.");
          });
      }
    },

    clearReviewForm() {
      (this.inputTitle = ""), (this.inputContent = ""), (this.inputImage = {});
    },
  },
};
</script>

<style>
</style>