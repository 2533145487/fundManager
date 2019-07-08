import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Login from './views/login'
import Register from './views/register'
import notFound from './views/404'
import Home from './views/home'
import ShowInfo from './views/showInfo'
import FundList from './views/fundlist'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                { path: '', component: Home },
                { path: '/home', name: 'home', component: Home },
                { path: '/showInfo', name: 'showInfo', component: ShowInfo },
                { path: '/fundlist', name: 'fundlist', component: FundList }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '*',
            component: notFound
        },
    ]
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == '/login' || to.path == '/register') {
        next()
    } else {
        isLogin ? next() : next('/login');
    }
})

export default router;