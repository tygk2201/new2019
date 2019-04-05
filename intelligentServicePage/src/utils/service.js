// const api=require('./api.js');
const HOST='/acs';
import to from "./to";
import api from './api.js'
import { Message, Loading } from 'element-ui'

const service= {
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
    }
}
export default service