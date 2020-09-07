<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <!-- <img :src="require('@/assets/img/frame/top_my.png')" slot="left" class="scm-head-icon" /> -->
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" />
      <span slot="title" class="scm-head-title">人员详情</span>
    </van-nav-bar>
    <div class="scm-body">
      <div class="list">
        <div>
          <span>头像</span>
          <van-image round width="2rem" height="2rem" :src="blackList.src" />
        </div>
        <div>
          <span>姓名</span>
          <span>{{blackList.name}}</span>
        </div>
        <div>
          <span>人员类型</span>
          <span>{{blackList.type}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blackList: {
        name: "",
        type: "",
        id: "",
        src: ""
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
      this.blackList.id = newId;
      console.log(newId);
      this.$http.get(this.$guest.info + newId).then(res => {
        let data = res.data.blacklist;
        console.log(data);
        this.blackList.name = data.name;
        this.blackList.id = data.blackId;
        this.blackList.type = data.type;
        this.blackList.src = data.blackFaces[0].facePicture;
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

.list {
  background: white;
  div {
    padding: 0.5rem;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
}
</style>