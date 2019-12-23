/**
 *  公共路由
 * */
export default [
    {
        path: '/',
        name: 'Index',
        component: ()=>import ('@/views/index')
    },
    {
        path: '/search',
        name: 'SearchIndex',
        component: resolve => require(['@/views/search/index'], resolve)
    },
    {
        path: '/search_shops',
        name: 'SearchShops',
        component: resolve => require(['@/views/search/shops'], resolve)
    },
    {
        path: '/spot',
        name: 'SpotIndex',
        component: resolve => require(['@/views/spot/index'], resolve),
    },
    {
        path: '/spot/main',
        name: 'SpotMain',
        component: resolve => require(['@/views/spot/main'], resolve),
    },
    {
        path: '/bargain',
        name: 'Bargain',
        component: resolve => require(['@/views/bargain/index'], resolve),
    },
    {
        path: '/trends',
        name: 'Trends',
        component: resolve => require(['@/views/trends/index'], resolve),
    },
    {
        path: '/trends/main',
        name: 'TrendsMain',
        component: resolve => require(['@/views/trends/main'], resolve),
    },
    {
        path: '/snapshot',
        name: 'Snapshot',
        component: resolve => require(['@/views/snapshot/index'], resolve),
    },
    {
        path: '/finershops',
        name: 'Finershops',
        component: resolve => require(['@/views/finershops/index'], resolve),
    },
    {
        path: '/tariff',
        name: 'Fariff',
        component: resolve => require(['@/views/tariff/index'], resolve),
    },
    {
        path: '/logistics',
        name: 'Logistics',
        component: resolve => require(['@/views/logistics/index'], resolve),
    },
    {
        path: '/logistics/detail',
        name: 'LogisticsDetail',
        component: resolve => require(['@/views/logistics/detail'], resolve),
    },
    {
        path: '/market',
        name: 'Market',
        component: resolve => require(['@/views/market/index'], resolve),
    },
    {
        path: '/login',
        name: 'Login',
        component: resolve => require(['@/views/user/login'], resolve),
    },
    {
        path: '/password_login',
        name: 'PasswordLogin',
        component: resolve => require(['@/views/user/passwordLogin'], resolve),
    },
    {
        path: '/register',
        name: 'Register',
        component: resolve => require(['@/views/user/register'], resolve),
    },
    {
        path: '/forgot_password',
        name: 'ForgotPassword',
        component: resolve => require(['@/views/user/forgotPassword'], resolve),
    },
    {
        path: '/demand',
        name: 'Demand',
        component: resolve => require(['@/views/demand/index'], resolve),
    },
    {
        path: '/demand/main',
        name: 'DemandMain',
        component: resolve => require(['@/views/demand/main'], resolve),
    },
    {
        path: '/lease',
        name: 'Lease',
        component: resolve => require(['@/views/lease/index'], resolve),
    },
    {
        path: '/map',
        name: 'Map',
        component: resolve => require(['@/views/map/index'], resolve),
    },
    {
        path: '/404',
        name: 'NoFind',
        component: resolve => require(['@/views/serve/404'], resolve),
    },
    {
        path: '*',
        redirect : '/404'
    },
]