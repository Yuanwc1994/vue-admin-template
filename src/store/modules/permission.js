import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true //没有设置roles的都不需要权限
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], //所有路由
  addRoutes: [] //动态添加的路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes //添加的动态路由
    state.routes = constantRoutes.concat(routes) //合并动态路由（即所有路由）
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) { //如果是管理账号，都把动态路由加到路由表
        accessedRoutes = asyncRoutes || []
      } else { //如果不是管理账号，把（过滤）有权限的动态路由加到路由表
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes) //设置路由状态
      resolve(accessedRoutes) //返回动态路由
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
