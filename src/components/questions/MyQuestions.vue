<template>
  <div>
    <div v-for="q in myQuestions.contents" :key="q.id">
      <v-row class="pa-5">
        <v-col cols="1" class="ma-0 pa-0">
          <v-img :src="q.imageUrl" height="100px" width="100px"></v-img>
        </v-col>
        <v-col class="pt-0">
          <v-row @click="show(q.id)">
            <v-col cols="10">
              <h4>{{q.title}}</h4>
            </v-col>
            <v-col
              cols="2"
              v-bind:class="[q.answerState === '답변완료' ? 'green--text' : 'grey-text']"
              class="text-right"
            >
              <strong>{{q.answerState}}</strong>
            </v-col>
          </v-row>
          <v-row>
            <v-col>{{q.content}}</v-col>
          </v-row>
        </v-col>
        <v-icon color="teal accent-4" @click="deleteQuestion(q.id)">mdi-delete</v-icon>
      </v-row>
      <v-divider></v-divider>
    </div>

    <v-pagination
      color="teal accent-4"
      v-model="page"
      :length="myQuestions.totalPages"
      total-visible="7"
      class="pt-5"
    ></v-pagination>

    <v-dialog v-if="this.qna" v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Q&A</span>
        </v-card-title>
        <v-card-text>
          <h3>{{this.qna.title}}</h3>
          <div v-if="this.qna.imageUrl">
            <v-img ref="imageUrl" :src="this.qna.imageUrl" height="400px" width="550px"></v-img>
          </div>
          {{this.qna.content}}
        </v-card-text>
        <h3 class="ml-4 mt-3">답변</h3>
        <v-card-text v-if="this.qna.answer">
          <v-row>
            <v-col cols="10">{{this.qna.answer}}</v-col>
            <v-col cols="2">{{this.qna.answerDate}}</v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>아직 답변이 등록되지 않았습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">돌아가기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      page: 1,
      size: 5,
      dialog: false,
    };
  },
  created() {
    const { page, size } = this;
    this.FETCH_QUESTIONS_BY_ACCOUNT({ page, size });
  },
  computed: {
    ...mapState(["myQuestions", "qna"]),
  },
  methods: {
    ...mapActions([
      "FETCH_QUESTIONS_BY_ACCOUNT",
      "FETCH_QNA",
      "DELETE_QUESTION",
    ]),

    deleteQuestion(questionId) {
      this.DELETE_QUESTION({ questionId }).then((response) => {
        if (response.status === 200) {
          alert("문의내역을 식제하였습니다.");
          const { page, size } = this;
          this.FETCH_QUESTIONS_BY_ACCOUNT({ page, size });
        } else {
          alert(response.data.message);
        }
      });
    },

    show(questionId) {
      this.FETCH_QNA({ questionId })
        .then(() => {
          this.dialog = true;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style>
</style>