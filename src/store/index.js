import Vue from 'vue';
import Vuex from 'vuex';
import { account, setAuthInHeader } from '../api'
import {
    fetchProducts, fetchProduct, fetchReviews, fetchReview,
    fetchQnas, fetchQna, addReview, fetchOrderLog,
    addQuestion, fetchAccountCarts, deleteCartItem, addOrderItems,
    fetchProductsByKeyword, fetchProductsByCategory, fetchOrderInfo, addCupon, fetchCuponsByAccount,
    addAdress, fetchAdressByAccount, addPayOrder, fetchMyOrderLog, cancelOrder, fetchQuestionsByAccount,
    deleteQuestion
} from '../api/index'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: {},
        accessToken: null,
        products: {},
        product: {},
        reviews: {},
        review: {},
        qnas: {},
        qna: {},
        carts: {},
        orderInfo: {},
        payInfo: {},
        orderLog: {},
        myQuestions: {}
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
        },
        SET_CARTS(state, carts) {
            state.carts = carts;
        },
        SET_ORDER_INFO(state, orderInfo) {
            state.orderInfo = orderInfo;
        },
        SET_PAY_INFO(state, payInfo) {
            state.payInfo = payInfo;
        },
        SET_CUPONS(state, cupons) {
            state.orderInfo.accountCupons = cupons;
        },
        SET_DELICERIES(state, deliveries) {
            state.orderInfo.accountDeliveries = deliveries;
        },
        SET_ORDER_LOG(state, orderLog) {
            state.orderLog = orderLog;
        },
        SET_MY_QUESTIONS(state, myQuestions) {
            state.myQuestions = myQuestions;
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
        async FETCH_PRODUCTS_BY_SEARCH_KEYWORD({ commit }, payload) {
            const response = await fetchProductsByKeyword(payload);
            commit('SET_PRODUCTS', response.data);
            return response;
        },
        async FETCH_PRODUCTS_BY_CATEGORY({ commit }, payload) {
            const response = await fetchProductsByCategory(payload);
            commit('SET_PRODUCTS', response.data);
            return response;
        },
        async FETCH_PRODUCT({ commit }, id) {
            const response = await fetchProduct(id);
            commit('SET_PRODUCT', response.data);
            return response;
        },
        async FETCH_REVIEWS({ commit }, payload) {
            const response = await fetchReviews(payload);
            commit('SET_REVIEWS', response.data);
            return response;
        },
        async FETCH_REVIEW({ commit }, reviewId) {
            const response = await fetchReview(reviewId);
            commit('SET_REVIEW', response.data);
            return response;
        },
        async FETCH_QNAS({ commit }, productId) {
            const response = await fetchQnas(productId);
            commit('SET_QNAS', response.data);
            return response;
        },
        async FETCH_QNA({ commit }, payload) {
            const response = await fetchQna(payload);
            commit('SET_QNA', response.data);
            return response;
        },
        async ADD_REVIEW(_, payload) {
            const response = await addReview(payload);
            return response;
        },
        async FETCH_ORDERLOG(_, payload) {
            const response = await fetchOrderLog(payload);
            return response;
        },
        async ADD_QUESTION(_, payload) {
            const response = await addQuestion(payload);
            return response;
        },
        async FETCH_ACCOUNT_CARTS({ commit }) {
            const response = await fetchAccountCarts();
            commit('SET_CARTS', response.data);
            return response;
        },
        async DELETE_CART_ITEM(_, payload) {
            const response = await deleteCartItem(payload.cartId);
            return response;
        },
        async ADD_ORDER_ITEMS(_, payload) {
            const response = await addOrderItems(payload);
            return response;
        },
        async FETCH_ORDER_INFO({ commit }, payload) {
            const response = await fetchOrderInfo(payload);
            commit('SET_ORDER_INFO', response.data);
            return response;
        },
        async ADD_CUPON(_, payload) {
            const response = await addCupon(payload);
            return response;
        },
        async FETCH_CUPONS_BY_ACCOUNT({commit}) {
            const response = await fetchCuponsByAccount();
            commit('SET_CUPONS', response.data.accountCupons);
            return response;
        },
        async ADD_ADDRESS(_, payload) {
            const response = await addAdress(payload);
            return response;
        },
        async FETCH_ADDRESS_BY_ACCOUNT({ commit }) {
            const response = await fetchAdressByAccount();
            commit('SET_DELICERIES', response.data.accountDeliveries);
            return response;
        },
        async ADD_PAY_ORDER(_, payload) {
            const response = await addPayOrder(payload);
            return response;
        },
        async FETCH_MY_ORDER_LOG({commit}, payload) {
            const response = await fetchMyOrderLog(payload);
            commit('SET_ORDER_LOG', response.data);
            return response;
        },
        async CANCEL_ORDER(_, payload) {
            const response = await cancelOrder(payload);
            return response;
        },
        async FETCH_QUESTIONS_BY_ACCOUNT({commit}, payload) {
            const response = await fetchQuestionsByAccount(payload);
            commit('SET_MY_QUESTIONS', response.data);
            return response;
        },
        async DELETE_QUESTION(_, payload) {
            const response = await deleteQuestion(payload);
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