import { callAPI,HTTP_VERBS } from '@/servers/http';
const UserServe = {
    //判断是否注册
    Index(data){
        return callAPI('filter/index',HTTP_VERBS.post,{ ...data })
    },
    //发送验证码
    Register(data){
        return callAPI('filter/register',HTTP_VERBS.post,{ ...data })
    },
    //验证码验证是否正确
    ActionCode(data){
        return callAPI('filter/actionCode',HTTP_VERBS.post,{ ...data })
    },
    //注册
    Information(data){
        return callAPI('filter/information',HTTP_VERBS.post,{ ...data })
    },
    //短信验证码登录
    Verification(data){
        return callAPI('filter/verification_login',HTTP_VERBS.post,{ ...data })
    },
    //用户账号密码登录
    Account_login(data){
        return callAPI('filter/account_login',HTTP_VERBS.post,{ ...data })
    },
    // 忘记密码
    Retrieve_password(data){
        return callAPI('filter/retrieve_password',HTTP_VERBS.post,{ ...data })
    },
    //获取用户信息
    User_information(){
        return callAPI('filter/user_information',HTTP_VERBS.get)
    },
    //微信登录
    WxLogin(data){
        return callAPI('wx/get_access_token',HTTP_VERBS.post,{ ...data })
    }
}
export default UserServe