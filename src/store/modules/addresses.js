import {addAdress, deleteAddress, fetchAdressByAccount} from "../../api";

const state = {
    myAddresses: {},
};

const mutations = {
    SET_MY_ADDRESSES(state, myAddresses) {
        state.myAddresses = myAddresses;
    },
};

const actions = {
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
};

export default {
    state,
    mutations,
    actions
}