import Vue from 'vue';
import Vuex from 'vuex';
import { account, setAuthInHeader } from '../api'
import { fetchProducts } from '../api/index'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: {},
        accessToken: null,
        products: [
            {
                "id":1,
                "title":"제목1",
                "price":"10000",
                "options":[
                    "ivory","black"
                ],
                "thumbnailUrl" : "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            },
            {
                "id":2,
                "title":"제목2",
                "price":"20000",
                "options":[
                    "ivory","black"
                ],
                "thumbnailUrl" : "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            },
            {
                "id":3,
                "title":"제목3",
                "price":"30000",
                "options":[
                    "ivory","black"
                ],
                "thumbnailUrl" : "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            }
            ,   {
                "id":4,
                "title":"제목4",
                "price":"40000",
                "options":[
                    "ivory","black"
                ],
                "thumbnailUrl" : "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            }
        ]
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
        },
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