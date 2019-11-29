// import { login, logout, getInfo } from '@/api/user'
import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    UserInfo: getUserInfo(),
    name: '',
    avatar: '',
    roles: [],
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERINFO: (state, UserInfo) => {
        state.UserInfo = UserInfo
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }

}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ userName: username.trim(), password: password }).then(response => {
                console.log('登录成功：', response);
                const { body } = response
                commit('SET_TOKEN', body.token)
                commit('SET_USERINFO', body.user)
                setToken(body.token) //登录成功后将token存储在cookie之中
                setUserInfo(body.user) //登录成功后将user存储在cookie之中
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    /* // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar, introduction } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_ROLES', roles)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }, */
    setUser({ commit, state }) {
        return new Promise(resolve => {
            commit('SET_NAME', state.UserInfo.userName)
            commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
            commit('SET_ROLES', [state.UserInfo.userName])
            resolve()
        })
    },
    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_NAME', '')
                commit('SET_AVATAR', '')
                commit('SET_ROLES', [])
                commit('SET_USERINFO', '')
                removeToken()
                removeUserInfo()
                resetRouter()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            removeUserInfo()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

