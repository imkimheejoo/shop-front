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
    addOrderItems,
    addCupon, fetchCuponsByAccount,
    addAdress, fetchAdressByAccount, deleteAddress
} from '../api/index'
import products from "./modules/products";
import reviews from "./modules/reviews";
import questions from "./modules/questions";
import orders from "./modules/orders";
import carts from "./modules/carts";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        reviews,
        products,
        questions,
        orders,
        carts
    },
    state: {
        account: {},
        accessToken: null,
        // carts: {},
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
        // SET_CARTS(state, carts) {
        //     state.carts = carts;
        // },
        SET_CUPONS(state, cupons) {
            state.orderInfo.accountCupons = cupons;
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
        // async FETCH_ACCOUNT_CARTS({commit}) {
        //     const response = await fetchAccountCarts();
        //     commit('SET_CARTS', response.data);
        //     return response;
        // },
        // async DELETE_CART_ITEM(_, payload) {
        //     const response = await deleteCartItem(payload.cartId);
        //     return response;
        // },
        async ADD_ORDER_ITEMS(_, payload) {
            const response = await addOrderItems(payload);
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