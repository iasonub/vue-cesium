<template>
  <div class="login">
    <div class="login-system">
         <div class="title-login">
          <p style="text-align: center">WELCOME</p>
          <h4>春蚕系统  2.0</h4>
          <!-- 无人机低空公共航路规划与仿真验证系统 -->
        </div>
      <div class="map">
        <div class="map1"></div>
        <div class="map2"></div>
        <div class="map3"></div>
      </div>
    </div>
    <div class="login-box">
      <div class="login-box-content">
        <div class="login-box-content-title">登录 Login</div>
        <p>账户密码登录</p>
        <el-form label-width="40px" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
          <el-form-item prop="account">
            <i class="el-icon-s-custom" slot="label"></i>
            <el-input ref="username" autocomplete="on" v-model.trim="loginForm.account" placeholder="请输入账户"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i class="el-icon-lock" slot="label"></i>
            <el-input ref="password" autocomplete="on" type="password" v-model.trim="loginForm.password" placeholder="请输入密码" @keyup.enter.native="sumbit"></el-input>
          </el-form-item>
        </el-form>
        <div class="auto">
          <el-checkbox v-model="checked">忘记密码</el-checkbox>
        </div>
        <el-button type="primary" style="width: 100%" @click="sumbit" :loading="loading">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { loginTo } from "@/api/user";
import { setToken } from "@/utils/auth";
import { ElMessage } from 'element-plus';
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("账户不能为空！"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位！"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: "",
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      checked: false,
    };
  },
  // created(){
  //   loginx();
  // },  
  mounted () {
    if (this.loginForm.account === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    sumbit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let loginForm = this.loginForm;
          loginTo(loginForm)
            .then((res) => {
              if (res.success) {
                //setToken(res.data);
                this.loading = false;
                this.$router.push({ path: "/Home" });
              } else {
                ElMessage.error(res.data);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background: url("../assets/img/indexbc.png") no-repeat;
  background-size: 100% 100%;
  // background: #06164a;
  display: flex;
  &-system {
    flex: 1;
    color: #ffffff;
    font-size: 28px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 450px;
    &-content {
      width: 300px;
      padding: 30px;
      border-radius: 15px;
      background: #ffffff;
      color: #041759;
      &-title {
        text-align: center;
        font-size: 26px;
        padding-bottom: 10px;
      }
      .auto {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      p {
        text-align: center;
        font-size: 16px;
        padding-bottom: 10px;
      }
    }
  }
  .title-login {
    position: absolute;
    // top: 14rem;
    z-index: 999;
    h4{
        font-size: 2.4rem;
    }
  }
}

.map {
  position: relative;
  height: 32rem;
  width: 32rem;
}
.map .map1,
.map .map2,
.map .map3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28rem;
  height: 28rem;
  background: url("../assets/img/login/map.png") no-repeat;
  background-size: 100% 100%;
  opacity: 0.8;
}
.map .map2 {
  width: 32rem;
  height: 32rem;
  background-image: url("../assets/img/login/lbx.png");
  opacity: 1;
  animation: rotate 15s linear infinite;
  z-index: 2;
}
.map .map3 {
  width: 31.5rem;
  height: 31.5rem;
  background-image: url("../assets/img/login/jt.png");
  animation: rotate1 10s linear infinite;
}
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>