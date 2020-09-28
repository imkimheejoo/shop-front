import {addReview, fetchReview, fetchReviews} from "../../api";

const state = {
    reviews: {},
    review: {},
};

const mutations = {
    SET_REVIEWS(state, reviews) {
        state.reviews = reviews;
    },
    SET_REVIEW(state, review) {
        state.review = review;
    },
};

const actions = {
    async FETCH_REVIEWS({commit}, payload) {
        const response = await fetchReviews(payload);
        commit('SET_REVIEWS', response.data);
        return response;
    },
    async FETCH_REVIEW({commit}, reviewId) {
        const response = await fetchReview(reviewId);
        commit('SET_REVIEW', response.data);
        return response;
    },
    async ADD_REVIEW(_, payload) {
        const response = await addReview(payload);
        return response;
    },
};

export default {
    state,
    mutations,
    actions
}

