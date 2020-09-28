import {account, setAuthInHeader} from "../../api";

const state = {
    account: {},
    accessToken: null,
};

const getters = {
    isAuthenticated(state) {
        return !!state.accessToken;
    },
};

const mutations = {
    LOGIN(state, {accessToken}) {
        console.log(accessToken);
        if (!accessToken) return;
        state.accessToken = accessToken;
        localStorage.accessToken = accessToken;
        setAuthInHeader(accessToken);
    },
    LOGOUT(state) {
        console.log('logout');
        state.accessToken = null;
        delete localStorage.accessToken;
        setAuthInHeader(null);
    },
};

const actions = {
    async LOGIN({commit}, payload) {
        const response = await account.login(payload);
        commit('LOGIN', response.data);
        return response;
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}
