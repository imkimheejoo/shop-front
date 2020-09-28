import {deleteCartItem, fetchAccountCarts} from "../../api";

const state = {
    carts: {},
};

const mutations = {
    SET_CARTS(state, carts) {
        state.carts = carts;
    },
};

const actions = {
    async FETCH_ACCOUNT_CARTS({commit}) {
        const response = await fetchAccountCarts();
        commit('SET_CARTS', response.data);
        return response;
    },
    async DELETE_CART_ITEM(_, payload) {
        const response = await deleteCartItem(payload.cartId);
        return response;
    },
};

export default {
    state,
    mutations,
    actions
}