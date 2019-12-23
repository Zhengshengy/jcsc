import Cookies from 'js-cookie'

export const setCookies = (key,value)=>{
    Cookies.set(key,value, { expires: 7 })
}

export const getCookies = (key)=>{
    return Cookies.get(key)
}

export const delCookies = (key)=>{
    Cookies.remove(key)
}