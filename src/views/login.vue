<template>
  <div class="scm-login">
    <div class="scm-bg"></div>
    <div class="scm-loginForm">
      <div class="scm-title">
        <img :src="require('@/assets/img/login/login_logo.png')" />
        <div class="scm-appName">智慧城市</div>
      </div>
      <div class="scm-content">
          <van-field v-model="loginForm.account" placeholder="请输入帐号" >
            <img :src="require('@/assets/img/login/login_user.png')" slot="left-icon" class="scm-input-icon"/>
          </van-field>
          <van-field v-model="loginForm.password" placeholder="请输入密码" type="password" class="scm-password">
             <img :src="require('@/assets/img/login/login_ Password.png')" slot="left-icon" class="scm-input-icon"/>
          </van-field>

          <van-button class="scm-loginBtn" @click="login">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm:{
        account : '',
        password :'',
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    login(){
      this.$http.post(this.$api.login,this.loginForm).then(res=>{
        sessionStorage.setItem("token", res.data.token);
        this.$router.push({path:'/warn'});
      });
    }
  },
  components: {}
};
</script>
<style lang='scss' scoped>
.scm-login {
  position: relative;
  text-align: center;
}
.scm-bg {
  background-image: url("../assets/img/login/login_bg.png");
  width: 18.75rem;
  height: 18rem;
  background-size: 100% 100%;
}
.scm-loginForm {
  width: 15.5rem;
  height: 20.4rem;
  background: #ffffff;
  box-shadow: 0rem 0.575rem 1.75rem 0rem rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 6.54rem;
  left: 1.625rem;
  img{
    height: 3.3rem;
    margin-top: 1.457rem;
  }
  .scm-appName {
    font-size: 0.9rem;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    text-align: left;
    color: #333333;
    margin-top: 0.1rem;
    text-align: center;
  }
  .scm-content{
    margin-top: 1.475rem;
  }
  .scm-input-icon{
    width:1rem;
    height:1rem;
    margin-top:0rem;
  }
  .scm-password{
    margin-top:1.2rem;
  }
  .scm-loginBtn{
    width:12rem;
    height:2.2rem;
    background:#F6B400;
    color:#fff;
    margin-top:1.2rem;
  }
}
</style>