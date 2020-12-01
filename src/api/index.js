import axios from 'axios';
import { router } from '../routes/index.js';
const domain = 'http://localhost:9090';

const Unauthorized = 401;
const onUnauthorized = () => {
  router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`);
};

const setAuthInHeader = (accessToken) => {
  axios.defaults.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : null;
};

const request = {
  get(path) {
    try {
      return axios.get(`${domain + path}`);
    } catch ({ response }) {
      const { status } = response;
      if (status === Unauthorized) return onUnauthorized();
      if (status >= 400 && status <= 500) alert(response.data.message);
      throw Error(response);
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
  },
};

export const account = {
  login(payload) {
    return request.post('/api/accounts/login', payload);
  },
};

function fetchProducts(payload) {
  try {
    return request.get(
      `/api/products?page=${payload.page === null ? 0 : payload.page - 1}&size=${payload.size}`
    );
  } catch (error) {
    alert(error);
  }
}

function fetchProductsByKeyword(payload) {
  try {
    return request.get(
      `/api/products/search/${payload.keyword}?page=${
        payload.page === null ? 0 : payload.page - 1
      }&size=${payload.size}`
    );
  } catch (error) {
    alert(error);
  }
}

function fetchProductsByCategory(payload) {
  try {
    return request.get(
      `/api/products/category/${payload.category}?page=${
        payload.page === null ? 0 : payload.page - 1
      }&size=${payload.size}`
    );
  } catch (error) {
    alert(error);
  }
}

function fetchProduct(productId) {
  try {
    console.log(productId, '번 상품 가져옴');
    return axios.get(`/api/products/1`); //todo
  } catch (error) {
    window.alert(error);
  }
}

function fetchReviews(payload) {
  try {
    return axios.get(
      `/api/reviews/product/${payload.productId}?page=${payload.page - 1}&size=${payload.size}`
    );
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
    return axios.get(
      `/api/questions/product/${payload.productId}?page=${payload.page - 1}&size=${payload.size}`
    );
  } catch (error) {
    window.alert(error);
  }
}

function fetchQna(payload) {
  try {
    return axios.get(`/api/questions/${payload.questionId}`);
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

function fetchAccountCarts() {
  try {
    return axios.get(`/api/carts`);
  } catch (error) {
    alert(error);
  }
}

function deleteCartItem(cartId) {
  try {
    return axios.delete(`/api/carts/${cartId}`);
  } catch (error) {
    alert(error);
  }
}

function addOrderItems(payload) {
  try {
    return axios.post(`/api/orders/items`, payload);
  } catch (error) {
    alert(error);
  }
}

function fetchOrderInfo(payload) {
  try {
    return axios.get(`/api/orders/${payload.orderId}`);
  } catch (error) {
    alert(error);
  }
}

function addCupon(payload) {
  try {
    return axios.post(`/api/cupons`, payload);
  } catch (error) {
    alert(error);
  }
}

function fetchCuponsByAccount(payload) {
  try {
    if (payload) {
      return axios.get(`/api/cupons?${payload.page - 1}&size=${payload.size}`);
    }
    return axios.get(`/api/cupons`);
  } catch (error) {
    alert(error);
  }
}

function addAdress(payload) {
  try {
    return axios.post(`/api/deliveries`, payload);
  } catch (error) {
    alert(error);
  }
}

function fetchAdressByAccount(payload) {
  try {
    if (payload) {
      return axios.get(`/api/deliveries?${payload.page - 1}&size=${payload.size}`);
    }
    return axios.get(`/api/deliveries`);
  } catch (error) {
    alert(error);
  }
}

function addPayOrder() {
  try {
    return axios.post(`/api/pay`);
  } catch (error) {
    alert(error);
  }
}

function fetchMyOrderLog(payload) {
  try {
    return axios.get(`/api/orders?page=${payload.page - 1}&size=${payload.size}`);
  } catch (error) {
    alert(error);
  }
}

function cancelOrder(payload) {
  try {
    return axios.patch(`/api/orders/${payload.orderLogId}`);
  } catch (error) {
    alert(error);
  }
}

function fetchQuestionsByAccount(payload) {
  try {
    return axios.get(`/api/questions?page=${payload.page - 1}&size=${payload.size}`);
  } catch (error) {
    alert(error);
  }
}

function deleteQuestion(payload) {
  try {
    return axios.patch(`/api/questions/${payload.questionId}`);
  } catch (error) {
    alert(error);
  }
}

function deleteAddress(payload) {
  try {
    return axios.patch(`/api/deliveries/${payload.deliveryId}`);
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
  fetchAccountCarts,
  deleteCartItem,
  addOrderItems,
  fetchProductsByKeyword,
  fetchProductsByCategory,
  fetchOrderInfo,
  addCupon,
  fetchCuponsByAccount,
  addAdress,
  fetchAdressByAccount,
  addPayOrder,
  fetchMyOrderLog,
  cancelOrder,
  fetchQuestionsByAccount,
  deleteQuestion,
  deleteAddress,
  setAuthInHeader,
};
