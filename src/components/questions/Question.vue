<template>
    <div class="ma-5">
        <h2>Q&A</h2>
        <v-col class="text-right">
            <v-btn color="teal accent-4" dark @click="formDialog = true">문의하기</v-btn>
        </v-col>
        <div v-for="q of this.qnas.contents" :key="q.id">
            <v-row class="ma-5">
                <v-col cols="1" class="pa-0 ma-0"></v-col>
                <v-col cols="7" class="pt-1">
                    <p style="cursor:pointer;" @click="show(q.id)">{{q.title}}</p>
                </v-col>
                <v-col cols="3" sm="3" md="3" xl="3" class="pt-1">
                    <v-row class="mx-auto">{{q.author}}</v-row>
                    <v-row class="mx-auto">{{q.questionDate}}</v-row>
                </v-col>
            </v-row>
            <v-divider/>
        </div>

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

        <v-row justify="center">
            <v-dialog v-model="formDialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">문의내역</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-row>
                                <v-text-field
                                        v-model="inputTitle"
                                        label="문의 제목"
                                        :rules="[v => !!v || '제목은 필수입력사항입니다.']"
                                ></v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field
                                        v-model="inputContent"
                                        label="문의내용"
                                        :rules="[v => !!v || '내용은 필수입력사항입니다.']"
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
                        <v-btn color="blue darken-1" text @click="addQuestion()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-row>
            <v-col class="text-center mt-5">
                <v-pagination
                        color="teal accent-4"
                        v-model="page"
                        :length="qnas.totalPages"
                        total-visible="7"
                ></v-pagination>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default {
        data() {
            return {
                dialog: false,
                page: 1,
                size: 5,
                formDialog: false,
                inputTitle: "",
                inputContent: "",
                inputImage: {},
            };
        },
        created() {
            const {page, size} = this;
            this.FETCH_QNAS({page, size, productId: this.$route.params.id});
        },
        watch: {
            page() {
                const {page, size} = this;
                this.FETCH_QNAS({page, size, productId: this.$route.params.id});
            },
        },
        computed: {
            ...mapState({
                qnas: state => state.questions.qnas,
                qna: state => state.questions.qna
            }),
        },
        methods: {
            ...mapActions(["FETCH_QNA", "FETCH_QNAS", "ADD_QUESTION"]),

            show(questionId) {
                this.FETCH_QNA({questionId})
                    .then(() => {
                        this.dialog = !this.dialog;
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            },

            addQuestion() {
                const {inputTitle, inputContent, inputImage} = this;
                this.ADD_QUESTION({
                    inputTitle,
                    inputContent,
                    inputImage,
                    productId: this.$route.params.id,
                })
                    .then(() => {
                        alert(
                            "문의가 완료되었습니다! 최소 답변은 1-2일정도 소요될 예정입니다."
                        );
                        this.formDialog = !this.formDialog;
                        this.clearReviewForm();
                        const {size} = this;
                        this.FETCH_QNAS({
                            page: 1,
                            size,
                            productId: this.$route.params.id,
                        }).then((response) => {
                            this.page = response.data.pageable.pageNumber;
                        });
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            },

            clearReviewForm() {
                (this.inputTitle = ""), (this.inputContent = ""), (this.inputImage = {});
            },
        },
    };
</script>

<style>
</style>