import axios from 'axios'
import qs from "qs"
import { Message} from 'element-ui'

// axios.defaults.headers = '请求头'

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor  拦截器设置
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const status=response.status
    if(status==200){
      // return Promise.resolve(res)
      if(!!res.status){
        return Promise.resolve(res)
    }else{
      return Promise.reject(res)
    }
    }else{
      Message({
        message: '请求出错！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service