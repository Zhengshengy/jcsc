/**
 * 副站路由
 * */
export default [
    {
        path: '/subwebsite',
        component: resolve => require(['@/views/subwebsite/index'], resolve),
        children:[
            //副站首页
            {
                path:'',
                name:'subwebsiteIndex',
                component:resolve => require(['@/views/subwebsite/main'], resolve),
            },
            //全部商品
            {
                path:'products',
                name:'allProds',
                component:resolve => require(['@/views/subwebsite/allProds'], resolve),
            },
            //特价商品
            {
                path:'specials',
                name:'specials',
                component:resolve => require(['@/views/subwebsite/specials'], resolve),
            },
            //价格表
            {
                path:'pricelist',
                name:'pricelist',
                component:resolve => require(['@/views/subwebsite/pricelist'], resolve),
            },
            //公司介绍
            {
                path:'introduce',
                name:'introduce',
                component:resolve => require(['@/views/subwebsite/introduce'], resolve),
            },
            //联系我们
            {
                path:'contact',
                name:'contact',
                component:resolve => require(['@/views/subwebsite/contact'], resolve),
            },
            //商品详情
            {
                path:'productdetail',
                name:'productdetail',
                component:resolve => require(['@/views/subwebsite/productdetail'], resolve),
            },
        ]
    },
]