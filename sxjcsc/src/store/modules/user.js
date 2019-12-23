import { setCookies,delCookies } from '@/utils/cookies'
const state = {
    token:'',
    isLogin: false,
};
const getters = {
    getToken(state){
        return state.token
    },
    getIsLogin(state){
        return state.isLogin
    }
};
const mutations = {
    set_token(state,token) {
        state.token = token
        state.isLogin = true
        setCookies('token',token)
    },
    del_token(state) {
        state.token = ''
        state.isLogin = false
        delCookies('token')
    }
};
const actions = {

};
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}