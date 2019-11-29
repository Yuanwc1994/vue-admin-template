import Cookies from 'js-cookie'

const TokenKey = 'TokenKey'
const UserInfoKey = 'UserInfo'
// 获取用户token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置用户token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 移除用户token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取用户信息
export function getUserInfo() {
  if (Cookies.get(UserInfoKey)) {
    return JSON.parse(Cookies.get(UserInfoKey))
  }else {
    console.log('没有获取到用户信息');
  }
}
// 设置用户信息
export function setUserInfo(UserInfo) {
  return Cookies.set(UserInfoKey, UserInfo)
}
// 移除用户信息
export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}