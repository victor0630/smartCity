<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" size="1rem">
        <span>返回</span>
      </van-icon>
      <span slot="title" class="scm-head-title">我的</span>
    </van-nav-bar>
    <div class="info">
      <van-image round width="3.6rem" height="3.6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span>pasp</span>
    </div>
    <div class="scm-body">
      <van-cell title="修改密码" icon="location-o" is-link @click="jump()"></van-cell>
      <van-button type="primary" color="#f6b400" @click="toLogin()">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // value: "",
      person: {
        serialNumber: "",
        realName: "",
        role: "",
        src: "",
        orgName: ""
      }
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    toLogin() {
      window.sessionStorage.clear();
      this.$router.push({
        path: "/Login"
      });
    },
    jump() {
      this.$router.push({
        path: "/password"
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.van-cell {
  margin-top: 0.75rem;
}
.van-button--normal {
  width: 17rem;
  position: absolute;
  bottom: 1rem;
  left: 0.875rem;
}
.van-cell__title {
  text-align: left;
  font-size: 12px;
}
/deep/ .van-cell__right-icon {
  color: lightgray;
}
.van-image--round {
  margin: auto;
}
/deep/ .van-nav-bar__left {
  display: block;
}
.info {
  position: absolute;
  top: 3.5rem;
  z-index: 99;
  width: 100%;
  span {
    color: white;
    margin-top: 0.5rem;
    display: inline-block;
  }
}
/deep/ .van-image--round {
  display: block;
}
/deep/.van-nav-bar .van-icon {
  color: white;
}
.scm-index {
  position: relative;
}
.scm-head-icon {
  width: 5rem;
  height: 1.2rem;
  margin-top: 0.5rem;
  text-align: left;
  display: flex;
  align-items: center;
  span {
    font-size: 0.7rem;
    display: block;
    height: 100%;
    line-height: 1rem;
  }
}
.scm-head-title {
  width: 6.1rem;
  height: 0.95rem;
  font-size: 0.8rem;
  display: inline-block;
  margin-top: 0.8rem;
  color: white;
  line-height: 0.7rem;
}
/deep/.van-nav-bar {
  background-image: url("../../assets/img/personal/my_bg.png");
  background-position: center;
  background-size: cover;
  height: 10.63rem;
  display: block;
}

.scm-body {
  height: calc(100vh - 10.63rem);
  overflow: hidden;
  position: relative;
}
</style>