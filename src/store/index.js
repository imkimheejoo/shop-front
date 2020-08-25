import Vue from 'vue';
import Vuex from 'vuex';
import { account, setAuthInHeader } from '../api'
import { fetchProducts, fetchProduct, fetchReviews, fetchReview, fetchQnas, fetchQna} from '../api/index'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: {},
        accessToken: null,
        products: {},
        product:{},
        reviews: {},
        review:{},
        qnas:{},
        qna:{}
    },
    mutations: {
        LOGIN(state, { accessToken }) {
            console.log(accessToken)
            if (!accessToken) return;
            state.accessToken = accessToken;
            localStorage.accessToken = accessToken;
            setAuthInHeader(accessToken);
        },
        LOGOUT(state) {
            state.accessToken = null;
            delete localStorage.accessToken;
            setAuthInHeader(null);
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_PRODUCT(state, product) {
            state.product = product;
        },
        SET_REVIEWS(state, reviews) {
            state.reviews = reviews;
        },
        SET_REVIEW(state, review) {
            state.review = review;
        },
        SET_QNAS(state, qnas) {
            state.qnas = qnas;
        },
        SET_QNA(state, qna) {
            state.qna = qna;
        }
    },
    actions: {
        async LOGIN({ commit }, payload) {
            const response = await account.login(payload);
            commit('LOGIN', response.data);
            return response;
        },
        async FETCH_PRODUCTS({ commit }) {
            const response = await fetchProducts();
            commit('SET_PRODUCTS', response.data);
            return response;
        },
        async FETCH_PRODUCT({ commit }, id) {
            const response = await fetchProduct(id);
            commit('SET_PRODUCT', response.data);
            return response;
        },
        async FETCH_REVIEWS({commit}, payload) {
            const response = await fetchReviews(payload);
            commit('SET_REVIEWS', response.data);
            return response;
        },
        async FETCH_REVIEW({commit}, reviewId) {
            const response = await fetchReview(reviewId);
            commit('SET_REVIEW', response.data);
            return response;
        },
        async FETCH_QNAS({commit}, productId) {
            const response = await fetchQnas(productId);
            commit('SET_QNAS', response.data);
            return response;
        },
        async FETCH_QNA({commit}, questionId) {
            const response = await fetchQna(questionId);
            commit('SET_QNA', response.data);
            return response;
        }

    },
    getters: {
        isAuthenticated(state) {
            return !!state.accessToken;
        },
    }
});

const { accessToken } = localStorage;
store.commit('LOGIN', { accessToken });

export default store;