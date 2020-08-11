import Vue from 'vue';
import VueRouter from 'vue-router';
import AccountView from "../views/AccountView";
import LoginView from "../views/LoginView";
import CartView from "../views/CartView";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/mypage',
            name: 'mypage',
            component: AccountView,

            // todo token 없으면 /login으로 리다이렉
            beforeEnter: (to, from, next) => {
                console.log('to', to);
                console.log('from', from);
                next();
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
    ]

});