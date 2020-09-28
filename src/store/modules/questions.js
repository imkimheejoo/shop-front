import {addQuestion, deleteQuestion, fetchQna, fetchQnas, fetchQuestionsByAccount} from "../../api";

const state = {
    qnas: {},
    qna: {},
    myQuestions: {}
};

const mutations = {
    SET_QNAS(state, qnas) {
        state.qnas = qnas;
    },
    SET_QNA(state, qna) {
        state.qna = qna;
    },
    SET_MY_QUESTIONS(state, myQuestions) {
        state.myQuestions = myQuestions;
    },
};

const actions = {
    async FETCH_QNAS({commit}, productId) {
        const response = await fetchQnas(productId);
        commit('SET_QNAS', response.data);
        return response;
    },
    async FETCH_QNA({commit}, payload) {
        const response = await fetchQna(payload);
        commit('SET_QNA', response.data);
        return response;
    },
    async FETCH_QUESTIONS_BY_ACCOUNT({commit}, payload) {
        const response = await fetchQuestionsByAccount(payload);
        commit('SET_MY_QUESTIONS', response.data);
        return response;
    },
    async ADD_QUESTION(_, payload) {
        const response = await addQuestion(payload);
        return response;
    },
    async DELETE_QUESTION(_, payload) {
        const response = await deleteQuestion(payload);
        return response;
    },
};

export default {
    state,
    mutations,
    actions
}