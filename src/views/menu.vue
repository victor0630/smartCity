<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <img
        :src="require('@/assets/img/frame/top_my.png')"
        slot="left"
        class="scm-head-icon"
        @click="jump"
      />
      <span slot="title" class="scm-head-title">智慧城市</span>
      <van-icon
        name="plus"
        v-show="this.$store.state.show"
        slot="right"
        class="scm-head-icon addEquip"
        @click="go"
        size="1.2rem"
      />
      <img :src="require('@/assets/img/frame/msg.png')" slot="right" class="scm-head-icon" @click="jump2()"/>
    </van-nav-bar>
    <div class="scm-body">
      <router-view />
    </div>
    <div class="scm-footer">
      <van-tabbar v-model="active" class="footer">
        <van-tabbar-item icon="bulb-o" @click="selectMenu('warn')">告警</van-tabbar-item>
        <van-tabbar-item icon="browsing-history-o" @click="selectMenu('device')">设备</van-tabbar-item>
        <van-tabbar-item icon="friends-o" @click="selectMenu('bottomSet')">底库设置</van-tabbar-item>
        <van-tabbar-item icon="chart-trending-o" @click="selectMenu('count')">客流量统计</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // active: 0,
      add: false
    };
  },

  created() {},
  mounted() {},
  computed: {
    active:{
      get(){
        return this.$store.state.active
      },
      set(){

      }
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal === "/warn") {
        this.$store.commit("account")
      }
      if (newVal === "/deviceManage") {
        this.$store.commit("add");
        this.$store.commit("account1")
      } else {
        this.$store.commit("delete");
      }
      if (newVal === "/library") {
        this.$store.commit("account2")
      }
      if (newVal === "/statistics") {
        this.$store.commit("account3")
      }
    },
  },
  methods: {
    selectMenu(menu) {
      switch (menu) {
        case "warn":
          this.$router.push({ path: "/warn" });
          break;
        case "device":
          this.$router.push({ path: "/deviceManage" });
          break;
        case "bottomSet":
          this.$router.push({ path: "/library" });
          break;
        case "count":
          this.$router.push({ path: "/statistics" });
          break;
      }
    },
    jump() {
      this.$router.push({
        path: "/personal"
      });
    },
    jump2() {
      this.$router.push({
        path: "/warn"
      });
    },
    go() {
      this.$router.push({ path: "/addEquipment" });
    }
  },
  components: {}
};
</script>
<style lang='scss' scoped>
.addEquip{
  color: black;
  margin-right: 0.7rem;
}
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
  font-size: 0.95rem;
  font-weight: bold;
  text-align: left;
  color: #1c1c1c;
  // line-height: 0.7rem;
}

.scm-body {
  height: calc(100vh - 4.8rem);
  overflow: hidden;
}

.footer {
  height: 2.5rem;
}

/deep/ .van-tabbar-item--active {
  color: #f6b400;
}
</style>