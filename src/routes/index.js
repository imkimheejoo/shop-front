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
}

export const router = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: IndexView,
            // beforeEnter: (to, from, next) => {
            //     console.log('to', to);     //to: 이동할 url의 라우팅 정보
            //     console.log('from', from); //from: 현재 url의 라우팅 정보
            //     console.log('next', next); //next:
            //     store.dispatch('FETCH_PRODUCT') 
            //         .then(() => {
            //             console.log('success');
            //             next();
            //         }).catch((error) => {
            //         console.log(error);
            //     });
            // }
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
        }
    ]

});
