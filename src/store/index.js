import Vue from 'vue';
import Vuex from 'vuex';
import {account, setAuthInHeader} from '../api'
import {
    addAdress, fetchAdressByAccount, deleteAddress
} from '../api/index'
import products from "./modules/products";
import reviews from "./modules/reviews";
import questions from "./modules/questions";
import orders from "./modules/orders";
import carts from "./modules/carts";
import cupons from "./modules/cupons";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        reviews,
        products,
        questions,
        orders,
        carts,
        cupons
    },
    state: {
        account: {},
        accessToken: null,
        myAddresses: {},
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

        SET_MY_ADDRESSES(state, myAddresses) {
            state.myAddresses = myAddresses;
        },

    },
    actions: {
        async LOGIN({commit}, payload) {
            const response = await account.login(payload);
            commit('LOGIN', response.data);
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