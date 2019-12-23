/**
 *  个人中心路由
 * */
export default [
    {
        path: '/personal',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/personal/index'], resolve),
        children:[
            {
                path:'',
                name:'default',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/personal/default'], resolve),
            },
            {
                path:'orders',
                name:'MyOrders',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/personal/orders'], resolve),
            },
            {
                path: 'wallet',
                name: 'Wallet',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/wallet'], resolve),
            },
            {
                path: 'integral',
                name: 'Integral',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/integral'], resolve),
            },
            {
                path: 'coupon',
                name: 'Coupon',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/coupon'], resolve),
            },
            {
                path: 'collect',
                name: 'Collect',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/collect'], resolve),
            },
            {
                path: 'address',
                name: 'Address',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/address'], resolve),
            },
            {
                path: 'support',
                name: 'Support',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/support'], resolve),
            },
            {
                path: 'aboutUS',
                name: 'AboutUs',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/aboutUs'], resolve),
            },
            {
                path: 'feedback',
                name: 'Feedback',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/feedback'], resolve),
            },
            {
                path: 'questionDetail',
                name: 'QuestionDetail',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/questionDetail'], resolve),
            },
            {
                path: 'password',
                name: 'password',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/password'], resolve),
            },
            {
                path: 'changePassword',
                name: 'paymentPassword',
                meta: {requireAuth: true},
                component: resolve => require(['@/views/personal/paymentPassword'], resolve),
            },
            {
                path:'enquiry',
                name:'EnquiryList',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/personal/enquiry'], resolve),
            },
            {
                path:'inquiryDet',
                name:'InquiryDetails',
                meta: {requireAuth: true},
                component:resolve => require(['@/views/personal/inquiryDetails'], resolve),
            },
        ]
    },
    {
        //询价
        path: '/enquiry',
        name: 'Enquiry',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/enquiry/index'], resolve),
    },
]