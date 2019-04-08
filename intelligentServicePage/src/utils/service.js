// const api=require('./api.js');
const HOST='http://47.105.33.160:8888/acs';
import to from "./to";
import api from './api.js'
import { Message, Loading } from 'element-ui'

const service= {
  // 用户登录
    async login(params){
        const sendData = params;
        const url =HOST+'/userManage/login';
        const [err, res] =await to(api.post(url,sendData))
          if (err) {
            console.log('ERROR: Location: login, Reason:' + err.errMsg);
            Message({
                message: '网络异常，请稍后再试！',
                type: 'error',
                duration: 5 * 1000
              })
          }
          //身份过期暂时不做
        //   if (!res.data.status) {
        //     if (res.data.description === '身份认证无效或已过期' || res.data.description === 'accountToken认证失败') {
        //       self.cleanStorage();
        //       self.goBackToLogin();
        //       return;
        //     }
        //     return res;
        //   }
          return res;
    },
    //加盟申请
    async addContent(params){
      const sendData = params;
      const url =HOST+'/contact/addContact';
      const [err, res] =await to(api.post(url,sendData))
        if (err) {
          console.log('ERROR: Location: login, Reason:' + err.errMsg);
          Message({
              message: '网络异常，请稍后再试！',
              type: 'error',
              duration: 5 * 1000
            })
        }
        return res;
  },
  //获取消息列表
  async getJoinList(params){
    const sendData = params;
    const url =HOST+'/contact/listContact';
    const [err, res] =await to(api.post(url,sendData))
      if (err) {
        console.log('ERROR: Location: login, Reason:' + err.errMsg);
        Message({
            message: '网络异常，请稍后再试！',
            type: 'error',
            duration: 5 * 1000
          })
      }
      return res;
},
//修改消息状态
async updateContactState(params){
  const sendData = params;
  const url =HOST+'/contact/updateContactState';
  const [err, res] =await to(api.post(url,sendData))
    if (err) {
      console.log('ERROR: Location: login, Reason:' + err.errMsg);
      Message({
          message: '网络异常，请稍后再试！',
          type: 'error',
          duration: 5 * 1000
        })
    }
    return res;
},
}
export default service