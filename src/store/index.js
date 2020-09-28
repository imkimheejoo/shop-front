import Vue from 'vue';
import Vuex from 'vuex';

import products from "./modules/products";
import reviews from "./modules/reviews";
import questions from "./modules/questions";
import orders from "./modules/orders";
import carts from "./modules/carts";
import cupons from "./modules/cupons";
import addresses from "./modules/addresses";
import accounts from "./modules/accounts";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        reviews,
        products,
        questions,
        orders,
        carts,
        cupons,
        addresses,
        accounts
    },
});

const {accessToken} = localStorage;
store.commit('LOGIN', {accessToken});

export default store;