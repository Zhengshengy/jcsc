import { callAPI,HTTP_VERBS } from '@/servers/http';
const SubWebsiteServer = {
    //产品查询
    product(data){
        return callAPI('shops/product',HTTP_VERBS.post,{ ...data })
    },
    //获取商铺信息
    getShops(data){
        return callAPI('shops/getShops',HTTP_VERBS.post,{ ...data })
    },
    //获取推荐商品
    getRecProduct(data){
        return callAPI('shops/getRecProduct',HTTP_VERBS.post,{ ...data })
    },
    //获取商铺联系方式
    getShopsPhone(data){
        return callAPI('shops/getShopsPhone',HTTP_VERBS.post,{ ...data })
    },
    //获取商品详情
    getProductDetail(data){
        return callAPI('shops/getProductDetail',HTTP_VERBS.post,{ ...data })
    },
    //收藏店铺
    setCollect(data){
        return callAPI('shops/setCollect',HTTP_VERBS.post,{ ...data })
    },
}
export default SubWebsiteServer