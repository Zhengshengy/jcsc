/**
 * 支付路由
 * */
export default [
    {
        //充值
        path: '/recharge',
        name: 'RechargeIndex',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/recharge/index'], resolve),
    },
    {
        // 支付
        path: '/paying',
        name: 'Paying',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/recharge/paying'], resolve),
    },
    {
        // 支付成功
        path: '/successPayment',
        name: 'Success',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/recharge/success'], resolve),
    },


    {
        //赞助结算页
        path: '/supportPay',
        name: 'SupportPay',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/personal/supportPay'], resolve),
    },
    {
        //订单结算页
        path: '/payment',
        name: 'payment',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/personal/supportPayment'], resolve),
    },
    {
        //订单详情
        path: '/order/detail',
        name: 'orderDetail',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/personal/orderDetail'], resolve),
    },
    {
        path: '/shoppingCart',
        name: 'shoppingCart',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/shoppingcart/index'], resolve),
    },
    {
        //订单结算页
        path: '/confirmOrder',
        name: 'confirmOrder',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/shoppingcart/confirmOrder'], resolve),
    },
    {
        //订单结算页
        path: '/orderPay',
        name: 'orderPay',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/shoppingcart/orderPay'], resolve),
    },
    {
        path: '/successOrder',
        name: 'successOrder',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/shoppingcart/successOrder'], resolve),
    },
    {
        path: '/shop/orderDetail',
        name: 'ordersDetail',
        meta: {requireAuth: true},
        component: resolve => require(['@/views/merchant/orderDetail'], resolve),
    },
]