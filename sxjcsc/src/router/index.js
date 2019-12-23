import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { getCookies } from '@/utils/cookies'
import PERSONAL from './models/personal'
import MERCHANT from './models/merchant'
import PAY from './models/pay'
import PUBLIC from './models/public'
import SUBWEBSITE from './models/subwebsite'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...PUBLIC,
        ...PERSONAL,
        ...MERCHANT,
        ...PAY,
        ...SUBWEBSITE
    ]
})

router.beforeEach((to, from, next) => {
    let token = getCookies('token')
    let code = Vue.prototype.JCutils.getUrlParam('code')
    if (code && !token){
        Vue.prototype.JCService.UserServer.WxLogin({code:code}).then(e=>{
            store.commit('user/set_token',e.token)
            next()
        })
    }else {
        if(to.meta.requireAuth) {
            if(token) {
                window.scroll(0, 0);
                next()
            } else {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            }
        } else {
            window.scroll(0, 0);
            next()
        }
    }
})

export default router
