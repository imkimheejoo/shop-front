import Vue from 'vue';
import VueRouter from 'vue-router';
import AccountView from "../views/AccountView";
import LoginView from "../views/LoginView";
import CartView from "../views/CartView";
import ProductsView from "../views/ProductsView";
import store from '../store';

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
    store.state.accessToken ? 
      next() :
      next(`/login?returnPath=${encodeURIComponent(from.path)}`)
  }

export const router = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/mypage',
            name: 'mypage',
            component: AccountView,
            beforeEnter:requireAuth()
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
            beforeEnter:requireAuth()
        },
        {
            path: '/products',
            name: 'products',
            component: ProductsView,
        }
    ]

});
