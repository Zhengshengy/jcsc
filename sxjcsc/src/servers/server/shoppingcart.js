import { callAPI,HTTP_VERBS } from '@/servers/http';
const cartServer = {
    //添加购物车
    addCate(data){
        return callAPI('shop/addCate',HTTP_VERBS.post,{ ...data })
    },
    //获取购物车列表
    cateList(data){
        return callAPI('shop/cateList',HTTP_VERBS.post,{ ...data })
    },
    //编辑购物车
    editList(data){
        return callAPI('shop/editList',HTTP_VERBS.post,{ ...data })
    },
    //购物车结算前请求
    setSelectShops(data){
        return callAPI('shop/setSelectShops',HTTP_VERBS.post,{ ...data })
    },
    //订单结算数据
    getSelectShops(data){
        return callAPI('shop/getSelectShops',HTTP_VERBS.post,{ ...data })
    },
    //下单接口
    place(data){
        return callAPI('Rock/place',HTTP_VERBS.post,{ ...data })
    },
    //余额数据获取
    getUserInfo(data){
        return callAPI('Rock/getUserInfos',HTTP_VERBS.post,{ ...data })
    },
    //支付接口
    index(data){
        return callAPI('Rock/index',HTTP_VERBS.post,{ ...data })
    },
    //订单详情
    userDetail(data){
        return callAPI('order/detail',HTTP_VERBS.post,{ ...data },{headers: {'isLoading': false}})
    },
    //获取购物车数量
    countCateList(){
        return callAPI('shop/countCateList',HTTP_VERBS.get)
    },
    //提醒发货
    alertSipping(data){
        return callAPI('order/alertSipping',HTTP_VERBS.post,{ ...data })
    },
    //延迟收货
    delayOrder(data){
        return callAPI('order/delayOrder',HTTP_VERBS.post,{ ...data })
    },
    //确认收货
    confirmOrder(data){
        return callAPI('order/confirmOrder',HTTP_VERBS.post,{ ...data })
    },
    //取消订单
    cancelOrder(data){
        return callAPI('order/cancelOrder',HTTP_VERBS.post,{ ...data })
    },

}
export default cartServer