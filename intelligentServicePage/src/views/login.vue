<template>
<div class="background_class">
  <div class="login-container">
       <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" class="login_form" auto-complete="on" label-position="left" label-width="50px">
             <el-form-item label="账号" prop="account" >
                <el-input type="primary" v-model="ruleForm2.acc" placeholder="username"></el-input>
            </el-form-item>
           <el-form-item label="密码" prop="password">
               <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" ></el-input>
            </el-form-item>
             <el-form-item label-width="0">
                 <el-button type="primary" @click="submitForm('ruleForm2')" class="width_btn">登录</el-button>
            </el-form-item>
       </el-form>
  </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
      //校验
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
       var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空不能为空'));
        }
      };
      return {
          //参数
           ruleForm2: {
               pass: '',
               acc:'admin'
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          acc: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      }
  },
  watch: {
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    submitForm(formName) {
        let self=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.loading = true
              this.$store.dispatch('Login',self.ruleForm2).then((res)=>{
                this.loading = false
                self.$router.replace({ path: 'home' })
              }).catch(() => {
            this.loading = false
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>

<style>
.login-container{
  background-color: #FFF;
  border-radius: 4px;
  border:1px solid #DCDFE6;
  padding: 15px;
  padding-top: 50px;
  /* width: 20%; */
  position: absolute;
  margin-left: 70%;
  margin-top:10%
}
.background_class{
  width: 100%;
  height: 100%;
  background-color: rgb(48, 65, 86)
}
.login_form{
  width: 300px;
  height: 200px;
}
.width_btn{
  width: 80%;
  margin-left: 10%
}

</style>
