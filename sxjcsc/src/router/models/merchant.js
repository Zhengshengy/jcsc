/**
 *  商铺路由
 * */
export default [
    {
        path: '/merchant',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/merchant/index'], resolve),
        children:[
            {
                path:'',
                name:'Browse',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/browse'], resolve),
            },
            {
                path:'setting',
                name:'Setting',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/setting'], resolve),
            },
            {
                path:'set',
                name:'Set',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/set'], resolve),
            },
            {
                path:'transfer',
                name:'Transfer',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/transfer'], resolve),
            },
            {
                path:'glist',
                name:'GoodsList',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/goodsList'], resolve),
            },
            {
                path:'addgoods',
                name:'AddGoods',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/addGoods'], resolve),
            },
            {
                path:'leaselist',
                name:'LeaseList',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/leaseList'], resolve),
            },
            {
                path:'bargain',
                name:'ShopBrgain',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/bargain'], resolve),
            },
            {
                path:'addlease',
                name:'AddLease',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/addLease'], resolve),
            },
            {
                path:'addressMang',
                name:'AddressMang',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/addressMang'], resolve),
            },
            {
                path:'renewal',
                name:'Renewal',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/renewal'], resolve),
            },
            {
                path:'priceList',
                name:'PriceList',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/priceList'], resolve),
            },
            {
                path:'shopOrder',
                name:'ShopOrder',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/shopOrder'], resolve),
            },
            {
                path:'delivery',
                name:'Delivery',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/delivery'], resolve),
            },
            {
                path:'recycle',
                name:'Recycle',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/recycle'], resolve),
            },
            {
                path:'brandManag',
                name:'BrandManag',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/brandManag'], resolve),
            },
            {
                path:'promGoods',
                name:'PromGoods',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/merchant/promGoods'], resolve),
            },
        ]
    },
]