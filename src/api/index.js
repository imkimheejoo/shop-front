import axios from 'axios';

const config = {
    baseUrl: 'http://localhost:8080'
};

export {
    fetchProducts
}

function fetchProducts(pageName, param) {
    try {
        return axios.get(`${config.baseUrl}/products/${pageName}/${param}`);
    } catch (error) {
        window.alert(error);
    }
}