import Vue from 'vue';
import Vuex from 'vuex';
import {fetchProducts} from '../api/index'

Vue.use(Vuex);

export const store = new Vuex.Store({
    store: {
        products: []
    },
    mutations: {
      SET_PRODUCTS(state, products) {
          state.products = products;
      }
    },
    actions: {
        async FETCH_PRODUCT({commit}, pageName, param) {
            const response = await fetchProducts(pageName, param);
            commit('SET_PRODUCTS', response.data);
            return response;
        }
    }
});