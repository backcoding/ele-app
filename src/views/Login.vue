<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt=" my login image" />
    </div>
    <!-- 手机号 -->
    <input-group
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    ></input-group>
    <!-- 验证码 -->
    <input-group type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code"></input-group>
    <!-- 用户协议服务 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="handleLogin">登陆</button>
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/inputGroup'
import { Toast } from 'mint-ui'
export default {
  name: 'Login',
  components: {
    InputGroup
  },
  data() {
    return {
      phone: '', // 手机号：18810306704 验证码：850544
      verifyCode: '',
      errors: {},
      btnTitle: '获取验证码',
      disabled: false,
      yzm: '' // 测试验证码提示
    }
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) return true
      else false
    }
  },
  methods: {
    // 登陆
    handleLogin() {
      // 取消错误提醒
      this.errors = {}
      // 发送请求
      this.$axios
        .post('/api/posts/sms_back', {
          phone: this.phone,
          code: this.verifyCode
        })
        .then(res => {
          // console.log(res);
          // 检验成功 设置登陆状态并且跳转到home页面
          localStorage.setItem('ele_login', res.data.user._id)
          this.$router.push('/')
        })
        .catch(err => {
          //返回错误信息
          this.errors = {
            code: err.response.data.msg
            //code: err.response
          }
        })
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn()
        // 发送网络请求
        this.$axios
          .post('/api/posts/sms_send', {
            tpl_id: '215179',
            key: '62b4ba3de6eca73f7bd57b888d748ef0',
            phone: this.phone
          })
          .then(res => {
            // console.log(res)
            let str = res.data.msg
            let num = str.replace(/[^0-9]/gi, '')
            // console.log(num);
            this.verifyCode = num
            // this.handleLogin()
            this.yzm = res.data.msg
            this.showMsg(this.yzm)
          })
      }
    },
    // 测试 验证码提示
    showMsg(msg) {
      Toast({
        message: msg,
        position: 'bottom',
        duration: 5000
      })
    },
    // 获取验证码
    validateBtn() {
      let time = 60
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer)
          this.btnTitle = '获取验证码'
          this.disabled = false
        } else {
          // 倒计时
          this.btnTitle = time + '秒后重试'
          this.disabled = true
          time--
        }
      }, 1000)
    },
    // 验证手机号码
    validatePhone() {
      if (!this.phone) {
        this.errors = {
          phone: '手机号码不能为空'
        }
        return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请填写正确的手机号码'
        }
        return false
      } else {
        this.errors = {}
        return true
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>