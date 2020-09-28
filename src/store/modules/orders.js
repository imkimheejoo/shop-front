import {addPayOrder, cancelOrder, fetchMyOrderLog, fetchOrderInfo, fetchOrderLog} from "../../api";

const state = {
    orderInfo: {},
    payInfo: {},
    orderLog: {},
};

const mutations = {
    SET_ORDER_INFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
    SET_PAY_INFO(state, payInfo) {
        state.payInfo = payInfo;
    },
    SET_ORDER_LOG(state, orderLog) {
        state.orderLog = orderLog;
    },
};

const actions = {
    async FETCH_ORDERLOG(_, payload) {
        const response = await fetchOrderLog(payload);
        return response;
    },
    async FETCH_ORDER_INFO({commit}, payload) {
        const response = await fetchOrderInfo(payload);
        commit('SET_ORDER_INFO', response.data);
        return response;
    },
    async ADD_PAY_ORDER(_, payload) {
        const response = await addPayOrder(payload);
        return response;
    },
    async FETCH_MY_ORDER_LOG({commit}, payload) {
        const response = await fetchMyOrderLog(payload);
        commit('SET_ORDER_LOG', response.data);
        return response;
    },
    async CANCEL_ORDER(_, payload) {
        const response = await cancelOrder(payload);
        return response;
    },
};

export default {
    state,
    mutations,
    actions
}