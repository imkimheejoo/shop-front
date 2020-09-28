import Vue from 'vue';
import Vuex from 'vuex';
import {account, setAuthInHeader} from '../api'
// import {
//     fetchProducts, fetchProduct, fetchReviews, fetchReview,
//     fetchQnas, fetchQna, addReview, fetchOrderLog,
//     addQuestion, fetchAccountCarts, deleteCartItem, addOrderItems,
//     fetchProductsByKeyword, fetchProductsByCategory, fetchOrderInfo, addCupon, fetchCuponsByAccount,
//     addAdress, fetchAdressByAccount, addPayOrder, fetchMyOrderLog, cancelOrder, fetchQuestionsByAccount,
//     deleteQuestion, deleteAddress
// } from '../api/index'
import {
    fetchOrderLog, fetchAccountCarts, deleteCartItem, addOrderItems,
    fetchOrderInfo, addCupon, fetchCuponsByAccount,
    addAdress, fetchAdressByAccount, addPayOrder, fetchMyOrderLog, cancelOrder, deleteAddress
} from '../api/index'
import products from "./modules/products";
import reviews from "./modules/reviews";
import questions from "./modules/questions";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        reviews,
        products,
        questions
    },
    state: {
        account: {},
        accessToken: null,
        carts: {},
        orderInfo: {},
        payInfo: {},
        orderLog: {},
        myAddresses: {},
        myCupons: {}
    },
    mutations: {
        LOGIN(state, {accessToken}) {
            console.log(accessToken);
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
        SET_ORDER_LOG(state, orderLog) {
            state.orderLog = orderLog;
        },
        SET_MY_ADDRESSES(state, myAddresses) {
            state.myAddresses = myAddresses;
        },
        SET_MY_CUPONS(state, myCupons) {
            state.myCupons = myCupons;
        }
    },
    actions: {
        async LOGIN({commit}, payload) {
            const response = await account.login(payload);
            commit('LOGIN', response.data);
            return response;
        },
        // async FETCH_QNAS({commit}, productId) {
        //     const response = await fetchQnas(productId);
        //     commit('SET_QNAS', response.data);
        //     return response;
        // },
        // async FETCH_QNA({commit}, payload) {
        //     const response = await fetchQna(payload);
        //     commit('SET_QNA', response.data);
        //     return response;
        // },
        async FETCH_ORDERLOG(_, payload) {
            const response = await fetchOrderLog(payload);
            return response;
        },
        async FETCH_ACCOUNT_CARTS({commit}) {
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
        async FETCH_ORDER_INFO({commit}, payload) {
            const response = await fetchOrderInfo(payload);
            commit('SET_ORDER_INFO', response.data);
            return response;
        },
        async ADD_CUPON(_, payload) {
            const response = await addCupon(payload);
            return response;
        },
        async FETCH_CUPONS_BY_ACCOUNT(payload) {
            const response = await fetchCuponsByAccount(payload);
            return response;
        },
        async ADD_ADDRESS(_, payload) {
            const response = await addAdress(payload);
            return response;
        },
        async FETCH_ADDRESS_BY_ACCOUNT(payload) {
            const response = await fetchAdressByAccount(payload);
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
        // async FETCH_QUESTIONS_BY_ACCOUNT({commit}, payload) {
        //     const response = await fetchQuestionsByAccount(payload);
        //     commit('SET_MY_QUESTIONS', response.data);
        //     return response;
        // },
        // async DELETE_QUESTION(_, payload) {
        //     const response = await deleteQuestion(payload);
        //     return response;
        // },
        async DELETE_ADDRESS(_, payload) {
            const response = await deleteAddress(payload);
            return response;
        }

    },
    getters: {
        isAuthenticated(state) {
            return !!state.accessToken;
        },
    }
});

const {accessToken} = localStorage;
store.commit('LOGIN', {accessToken});

export default store;