<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" size="1rem">
        <span>返回</span>
      </van-icon>
      <span slot="title" class="scm-head-title">修改密码</span>
    </van-nav-bar>
    <div class="scm-body">
      <van-form @submit="onSubmit">
        <van-field
          v-model="password"
          type="password"
          name="旧密码"
          label="旧密码"
          placeholder="请输入旧密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="newPassword"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="checkPassword"
          type="password"
          name="新密码确认"
          label="新密码确认"
          placeholder="请再次输入新密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="textBox">
          <p>密码规则:</p>
          <p>1.口令长度应至少8位。</p>
          <p>2.口令应包括数字、小写字母、大写字母、特殊符号4类中至少3类。</p>
          <p>3.口令应与用户名无相关性，口令中不得包含用户名的完整字符串、大小写变位或形似变换的字符串。</p>
          <p>4.应更换系统或设备的出厂默认口令。</p>
          <p>5.口令设置应避免键盘排序密码。</p>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#f6b400">保存</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      upr: {
        oldPassword: "",
        newPassword: ""
      },
      active: 0,
      username: "",
      password: "",
      newPassword: "",
      checkPassword: ""
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      console.log("submit", values);
      this.upr.oldPassword = this.password;
      this.upr.newPassword = this.newPassword;
      this.$http
        .patch(this.$campus.password, this.upr)
        .then(res => {
          this.$toast.success("修改成功");
          this.back;
        })
        .catch(e => {
          this.$toast.fail("修改失败");
        });
    }
  },
  components: {}
};
</script>
<style lang='scss' scoped>
.van-form {
  margin: 0.75rem;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  .textBox {
    width: 100%;
    height: 8rem;
    background: rgb(248, 248, 246);
    color: rgb(160, 160, 160);
    font-size: 12px;
    text-align: left;
    p {
      margin: 0;
      margin-top: 0.2rem;
    }
  }
  .van-cell {
    background: rgb(248, 248, 246);
    margin-bottom: 0.5rem;
    border-radius: 25px;
  }
}
/deep/.van-nav-bar .van-icon {
  color: black;
}
/deep/ .van-nav-bar__left {
  display: block;
}
.scm-index {
  height: 2.3rem;
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
  font-weight: bold;
  text-align: left;
  color: #1c1c1c;
  line-height: 0.7rem;
}

.scm-body {
  height: calc(100vh - 4.8rem);
  overflow: hidden;
}
</style>