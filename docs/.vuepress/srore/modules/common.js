import * as $types from '../mutation-types'
const state = {
  navCollapse: COLLAPSE_STATUS.unfold,
}

const mutations = {
  [$types.COM_NAV_COLLAPSE] (state, data) {
    state.navCollapse = data
  }
}

const actions = {
  getUserInfo (state, params) { // 获取用户详情
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      // var data = {"id":54,"oid":"test","uin":"test","logintype":"oa","name":"test","head":"","phone":"0","level":100,"company":1,"status":100,"created_at":1531213731,"creator":"sys","updated_at":1531213731,"updator":"sys","last_login_at":1531213731}
      // state.commit($types.COM_USER_INFO, data)
      // resolve(data)
      kmAxios({
        url: $api.USER_API.getUserDetail
      }).then((res) => {
        if (res.code === 0) {
          res.data.headimg = res.data.head ? res.data.head : getUserheadimg(res.data.name)
          state.commit($types.COM_USER_INFO, res.data)
        }
        resolve(res)
      }).catch((res) => {
        reject(res)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
