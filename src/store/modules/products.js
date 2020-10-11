import {fetchProduct, fetchProducts, fetchProductsByCategory, fetchProductsByKeyword} from "../../api";

const state = {
    products: {},
    product: {},
};

const mutations = {
    SET_PRODUCTS(state, products) {
        console.log('set products', products);
        state.products = products;
    },
    SET_PRODUCT(state, product) {
        state.product = product;
    }
};

const actions = {
    async FETCH_PRODUCTS({ commit }, payload) {
        console.log('fetch products ', payload);
        const response = await fetchProducts(payload);
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
};

export default {
    state,
    mutations,
    actions
}