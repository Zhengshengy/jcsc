import { callAPI,HTTP_VERBS } from '@/servers/http';
const PersonalServer = {
    //全网询价
    Inquiry(data){
        return callAPI('personal/inquiry',HTTP_VERBS.post,{ ...data })
    },
    //全网询价删除
    Inquiry_delete(data){
        return callAPI('personal/inquiry_delete',HTTP_VERBS.post,{ ...data })
    },
    //全网询价详情
    Inquiry_details(data){
        return callAPI('personal/inquiry_details',HTTP_VERBS.post,{ ...data })
    },
    Balance_num(data){
        return callAPI('personal/balance', HTTP_VERBS.get,{ ...data });
    },
    Integral_num(data){
        return callAPI('personal/integral', HTTP_VERBS.get,{ ...data });
    },
    Integral_detail(data){
        return callAPI('personal/integral_detailed', HTTP_VERBS.get,{ ...data });
    },
    Address_list(data){
        return callAPI('personal/receiving_address', HTTP_VERBS.get,{ ...data });
    },
    Address_del(data){
        return callAPI('personal/action_address', HTTP_VERBS.get,{ ...data });
    },
    Address_add(data){
        return callAPI('personal/create_address', HTTP_VERBS.get,{ ...data });
    },
    Address_edit(data){
        return callAPI('personal/edit_address', HTTP_VERBS.get,{ ...data });
    },
    Feedback_help(){
        return callAPI('personal/help', HTTP_VERBS.get);
    },
    Feedback(data){
        return callAPI('personal/feedback', HTTP_VERBS.post,{ ...data });
    },
    Feedback_add(data){
        return callAPI('personal/add_feedback', HTTP_VERBS.post,data);
    },
    Question_detail(data){
        return callAPI('personal/when_article', HTTP_VERBS.get,{ ...data });
    },
    About_us(){
        return callAPI('personal/about', HTTP_VERBS.get);
    },
    Collect(data){
        return callAPI('personal/collect', HTTP_VERBS.post,{ ...data });
    },
    Collect_top(data){
        return callAPI('personal/top', HTTP_VERBS.post,{ ...data });
    },
    Collect_cancel(data){
        return callAPI('personal/cancel', HTTP_VERBS.post,{ ...data });
    },
    //获取商铺优惠券
    getShopCoupon(data){
        return callAPI('coupon/getShopCoupon', HTTP_VERBS.post,{ ...data });
    },
    //查询用户商铺运费卷和优惠券
    getUserCoupon (data){
        return callAPI('coupon/getUserCoupon', HTTP_VERBS.post,{ ...data });
    },
    //获取用户所有优惠券
    getUserAllCoupon (data){
        return callAPI('coupon/getUserAllCoupon', HTTP_VERBS.post,{ ...data });
    },
    //领取优惠券
    addUserCoupon(data){
        return callAPI('coupon/addUserCoupon', HTTP_VERBS.post,{ ...data });
    },
    // 订单
    orderIndex(data){
        return callAPI('order/index', HTTP_VERBS.post,{ ...data });
    },
    //订单总数
    conum(data){
        return callAPI('order/conum', HTTP_VERBS.post,{ ...data });
    },
    //收藏
    Recommend_collect(){
        return callAPI('personal/recommend_collect', HTTP_VERBS.get);
    },
    //充值
    Recharge(data){
        return callAPI('Rock/recharge ', HTTP_VERBS.post,{ ...data });
    },
    //获取充值图片
    GetRecharge(data){
        return callAPI('Rock/getRecharge ', HTTP_VERBS.post,{ ...data });
    },
    //钱包明细
    getBillData(data){
        return callAPI('order/getBillData ', HTTP_VERBS.post,{ ...data });
    },
}
export default PersonalServer