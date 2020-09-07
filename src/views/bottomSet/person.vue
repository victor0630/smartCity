<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <!-- <img :src="require('@/assets/img/frame/top_my.png')" slot="left" class="scm-head-icon" /> -->
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" />
      <span slot="title" class="scm-head-title">人员详情</span>
      
    </van-nav-bar>
    <div class="scm-body">
      <div class="module">
        <van-image round width="4rem" height="4rem" :src="person.src" />
        <van-field label="人员编号：" :value="person.serialNumber" readonly />
        <van-field label="姓名：" :value="person.realName" readonly />
        <van-field label="角色：" :value="person.role" readonly />
        <van-field label="所属组织：" :value="person.orgName" readonly />
        <van-button round type="info">删除</van-button>
      </div>
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
      },
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (!from) {
          // 对路由变化作出响应...
          this.getData();
        }
      },
      immediate: true
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getData() {
      let newId = this.$route.query.id;
      this.person.id = newId;
      console.log(newId);
      this.$http.get(this.$campus.userId + newId).then(res => {
        console.log(res.data);
        let role = res.data.roleList[0];
        this.person.serialNumber = res.data.serialNumber;
        this.person.realName = res.data.realName;
        this.person.orgName = res.data.org.name;
        this.person.role = role.name;
        this.person.src = res.data.photoList[0].photoUrl;
        console.log(res.data.photoList[0].photoUrl);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.van-nav-bar .van-icon{
  color: black;
}
.scm-index{
  height: 2.3rem;
}
.scm-head-icon{
  width:1.2rem;
  height:1.2rem;
  margin-top: 0.5rem;
}
.scm-head-title{
  width: 6.1rem;
  height: 0.95rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: left;
  color: #1c1c1c;
  line-height: 0.7rem;
}

.scm-body{
  height:calc(100vh - 4.8rem);
  overflow: hidden;
}

.van-button {
  width: 14rem;
  background: rgb(255, 94, 30);
  border-color: rgb(255, 94, 30);
}
.module {
  margin: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  .van-image {
    margin-bottom: 1rem;
  }
  .van-cell::after {
    border-bottom: 0;
  }
  .van-cell {
    margin-bottom: 1rem;
    background: rgb(248, 248, 246);
    border-radius: 20px;
    /deep/ .van-field__control:read-only {
      color: rgb(162, 162, 161);
    }
    /deep/ .van-field__label {
      font-family: SimHei;
      font-weight: 400;
      color: black;
    }
  }
}
</style>