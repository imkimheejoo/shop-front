import Vue from 'vue';
import Vuex from 'vuex';
import { account, setAuthInHeader } from '../api'
import { fetchProducts } from '../api/index'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: {},
        accessToken: null,
        products: []
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
        }
    },
    actions: {
        async LOGIN({ commit }, payload) {
            const response = await account.login(payload);
            commit('LOGIN', response.data);
            return response;
        },
        async FETCH_PRODUCT({ commit }, pageName, param) {
            const response = await fetchProducts(pageName, param);
            commit('SET_PRODUCTS', response.data);
            return response;
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.accessToken;
        }
    }
});

const { accessToken } = localStorage;
store.commit('LOGIN', { accessToken });

export default store;