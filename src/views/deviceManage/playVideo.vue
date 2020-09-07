<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <!-- <img :src="require('@/assets/img/frame/top_my.png')" slot="left" class="scm-head-icon" /> -->
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" />
      <span slot="title" class="scm-head-title">云录像</span>
    </van-nav-bar>
    <div class="scm-body">
      <video :src="this.uri" style="width:100%" autoplay="autoplay" controls="controls"></video>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uri: ""
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (!from) {
          // 对路由变化作出响应...
          
        }
      },
      immediate: true
    }
  },
  mounted(){
    this.getUri()
  },
  methods: {
      getUri(){
          this.uri = this.$route.query.uri;
          console.log(this.uri)
      },
    back() {
      this.$router.go(-1);
    },
  }
};
</script>
<style lang="scss" scoped>
.scm-index {
  height: 2.3rem;
}
.scm-head-icon {
  width: 1.2rem;
  height: 1.2rem;
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