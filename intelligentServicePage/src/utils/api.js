import axios from 'axios'
import { Message, Loading } from 'element-ui'

axios.defaults.timeout = 50000//默认请求超时时间
// //请求拦截
// axios.interceptors.request.use((config) => {
//   //请求之前重新拼装url
//   config.url = process.env.publicPath + config.url;
//   return config;
// });

// module.exports={
const api = {
  get(url, params = {}) {
    // 创建动画mint-ui
    let loading = Loading.service({
      text: '加载中...',
      spinner: 'el-icon-loading'
    })
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(response => {
        loading.close() // // 关闭动画
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(err => {
        loading.close() // // 关闭动画
        reject(err)
      })
    })
  },

  post(url, data = {}) {
    let loading = Loading.service({
      text: '加载中...',
      spinner: 'el-icon-loading'
    })
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(response => {
        loading.close() // // 关闭动画
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(err => {
        loading.close() // // 关闭动画
        reject(err)
      })
    })
  },
  json2Form(json) {
    let str = [];
    for (let p in json) {
      let value = encodeURIComponent(json[p]);
      if (value == 'null' || value == 'undefined') {
        value = '';
      }
      str.push(encodeURIComponent(p) + "=" + value);
    }
    return str.join("&");
  },

  json2Options(json) {
    let str = [];
    let pre = false;
    for (let p in json) {
      let value = json[p];
      if (value == null) {
        value = '';
      }
      str.push(p + '=' + value);
    }
    if (str.length > 0) {
      pre = true
    }
    return (pre ? '?' : '') + str.join("&");
  }

}
export default api
