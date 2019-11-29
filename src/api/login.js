import request from '@/utils/request'
// 登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
// 登出
export function logout() {
    return request({
        url: '/user/loginOut',
        method: 'post'
    })
}
