import Vue from 'vue';
import Vuex from 'vuex';
import { account, setAuthInHeader } from '../api'
import { fetchProducts } from '../api/index'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: {},
        accessToken: null,
        products: {},
        product:{
            'id': 1,
            'title': '상품1',
            'description': '이 상품1은 어쩌구저쩌구 블라블라',
            'price' : 15000,
            'options':['ivory', 'black'],
            'thumbnailUrl' :  'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
            'content' : '이 상품은 어쩌구 저쩌구 뭐가 어떻고 저쩧고...'
        }
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
        async FETCH_PRODUCTS({ commit }) {
            console.log('zzz')
            const response = await fetchProducts();
            commit('SET_PRODUCTS', response.data);
            return response;
        },
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