import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import search from './modules/search'
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
    modules:{
        user,
        search
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
export default store