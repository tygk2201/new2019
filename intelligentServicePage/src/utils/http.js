import axios from 'axios'
import qs from "qs"
import { Message} from 'element-ui'
import store from './../store'
import { getToken } from '@/utils/auth' // getToken from cookie

// axios.defaults.headers.common["token"]  = 'ffffff'

const service = axios.create({
  baseURL: 'http://47.105.33.160:8888', // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor  拦截器设置
axios.interceptors.request.use(
  config => {
    // 让每个请求携带token-- ['token']
    var xtoken = getToken()
    var url=config.url
    if(xtoken!=null&&url!='http://47.105.33.160:8888/acs/contact/addContact'){
      config.headers['token'] = xtoken
    }
    return config
  },
  error => {
    // Do something with request error
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