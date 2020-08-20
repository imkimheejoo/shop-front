import Vue from 'vue';
import VueRouter from 'vue-router';
import AccountView from "../views/AccountView";
import LoginView from "../views/LoginView";
import CartView from "../views/CartView";
import ProductsView from "../views/ProductsView";
import IndexView from "../views/IndexView"
import store from '../store';

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
    store.state.accessToken ?
        next() :
        next(`/login?returnPath=${encodeURIComponent(from.path)}`)
};

export const router = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: IndexView,
            beforeEnter: (to, from, next) => {
                store.dispatch('FETCH_PRODUCTS')
                    .then(() => {
                        console.log('success');
                        next();
                    }).catch((error) => {
                        console.log(error);
                    });
            }
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: AccountView,
            beforeEnter: requireAuth()
        },

        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView,
            beforeEnter: requireAuth()
        },
        {
            path: '/products/:id',
            name: 'products',
            component: ProductsView,
            beforeEnter: (to, from, next) => {
                store.dispatch('FETCH_PRODUCT', to.params.id)
                    .then(() => {
                        next();
                    }).catch((error) => {
                        alert(error);
                })
            }
        }
    ]

});
