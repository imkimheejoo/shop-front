import axios from 'axios';
import { router } from '../routes/index.js'
const domain = "http://localhost:9090";

const Unauthorized = 401;
const onUnauthorized = () => {
    router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`)
};

export const setAuthInHeader = accessToken => {
    axios.defaults.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : null
};

const request = {
    get(path) {
        try {
            return axios.get(`${domain + path}`);
        } catch ({ response }) {
            const { status } = response
            if (status === Unauthorized) return onUnauthorized();
            if (status >= 400 && status <= 500) alert(response.data.message);
            throw Error(response)
        }
    },
    post(path, data) {
        try {
            return axios.post(`${domain + path}`, data);
        } catch (error) {
            alert(error);
        }
    },
    put(path, data) {
        try {
            return axios.put(`${domain + path}`, data);
        } catch (error) {
            window.alert(error);
        }
    },
    delete(path) {
        try {
            return axios.delete(`${domain + path}`);
        } catch (error) {
            window.alert(error);
        }
    }
};


export const account = {
    login(payload) {
        return request.post('/api/accounts/login', payload);
    }
};


function fetchProducts() {
    try {
        return axios.get(`/api/products`);
    } catch (error) {
        window.alert(error);
    }
}

function fetchProduct(productId) {
    try {
        console.log(productId, "번 상품 가져옴");
        return axios.get(`/api/products/1`); //todo
    } catch (error) {
        window.alert(error);
    }
}

function fetchReviews(payload) {
    try {
        return axios.get(`/api/reviews/product/${payload.productId}?page=${payload.page - 1}&size=${payload.size}`);
    } catch (error) {
        window.alert(error);
    }
}

function fetchReview(reviewId) {
    try {
        return axios.get(`/api/reviews/${reviewId}`);
    } catch (error) {
        window.alert(error);
    }
}


function fetchQnas(payload) {
    try {
        return axios.get(`/api/questions/product/${payload.productId}?page=${payload.page - 1}&size=${payload.size}`);
    } catch (error) {
        window.alert(error);
    }
}

function fetchQna(questionId) {
    try {
        return axios.get(`/api/questions/${questionId}`);
    } catch (error) {
        alert(error);
    }
}

function addReview(payload) {
    try {
        return axios.post(`/api/reviews`, payload);
    } catch (error) {
        alert(error);
    }
}

function fetchOrderLog(payload) {
    try {
        return axios.get(`/api/orders/state/product`, payload);
    } catch (error) {
        alert(error);
    }
}

function addQuestion(payload) {
    try {
        return axios.post(`/api/questions`, payload);
    } catch (error) {
        alert(error);
    }
}

function fetchAccountCarts(payload) {
    try {
        return axios.get(`/api/carts?page=${payload.page-1}&size=${payload.size}`)
    } catch (error) {
        alert(error);
    }
}

export {
    fetchProducts,
    fetchProduct,
    fetchReviews,
    fetchReview,
    fetchQnas,
    fetchQna,
    addReview,
    fetchOrderLog,
    addQuestion,
    fetchAccountCarts
}
