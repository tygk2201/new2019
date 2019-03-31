<template>
  <div class="login-container">
       <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" class="login-form" auto-complete="on" label-position="left">
             <el-form-item label="账号" prop="account" >
                <el-input type="primary" v-model="ruleForm2.acc" placeholder="username" ></el-input>
            </el-form-item>
           <el-form-item label="密码" prop="password">
               <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-form-item>
       </el-form>
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

<style rel="stylesheet/scss" lang="scss">

</style>
