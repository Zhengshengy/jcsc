const state = {
    classify:{
        name: '商品库',
        cid: null
    }

};
const getters = {
    getClassify(state){
        return state.classify
    }
};
const mutations = {
    setClassify(state,obj) {
        state.classify = obj
    }
};
const actions = {
    setClassify(context,obj) {
        console.log(context)
        context.commit('setClassify',obj);
    },
};
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}