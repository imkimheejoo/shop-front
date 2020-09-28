import {addCupon, fetchCuponsByAccount} from "../../api";

const state = {
    myCupons: {}
};

const mutations = {
    SET_CUPONS(state, cupons) {
        this.store.state.orders.orderInfo.accountCupons = cupons;
    },
    SET_MY_CUPONS(state, myCupons) {
        state.myCupons = myCupons;
    }
};

const actions = {
    async ADD_CUPON(_, payload) {
        const response = await addCupon(payload);
        return response;
    },
    async FETCH_CUPONS_BY_ACCOUNT(payload) {
        const response = await fetchCuponsByAccount(payload);
        return response;
    },
};

export default {
    state,
    mutations,
    actions
}