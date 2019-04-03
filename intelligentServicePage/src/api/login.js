import request from '@/utils/http'

export function fetchList(query) {
    return request({
      url: '/api/home.json',
      method: 'get',
      params: {}
    })
}

export function login(username,password) {
    // return request({
    //   url: '/api/user/login',
    //   method: 'post',
    //   data: {username,password}
    // })
    return request({
      url: '/api/userManage/login',
      method: 'post',
      data: {username,password}
    })
}

export function logout() {
    return request({
      url: '/api/user/logout',
      method: 'post'
    })
  }

  export function getInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: { token }
    })
  }