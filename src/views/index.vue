<template>
  <div class>
      <router-view />
      <scmDialog v-model="warnInfoDialog" :option="dialogOption"></scmDialog>
  </div>
</template>

<script>
import WebSocketUtil from "@/commonjs/WebSocketUtil";
import router from '@/router/index'
import scmDialog from "@/common/dialog/dialog";
export default {
  data() {
    return {
      wsUtil : '',
      warnInfoDialog : false,
      dialogOption : {}
    };
  },
  created() {
    let userInfo = ''
    this.$http.get(this.$campus.userInfo).then(res=>{
      userInfo = res.data;
      let wsOption = {
        url : `/guestWs/mec?userId=${userInfo.id}`,
        onopen : this.open,
        onmessage : this.message,
        onclose : this.close
      }
      this.wsUtil = new WebSocketUtil(wsOption);
      
    }) 
    
  },
  mounted() {
    router.beforeEach((to, from, next) => {
      if(to.path == "/videoPlay"){
        this.wsUtil.send(JSON.stringify({equipId : to.query.equipInfo.id}));
      }
      if(from.path =="/videoPlay"){
        this.wsUtil.send(JSON.stringify({equipId : 0}));
      }
      next();
    })
  },
  computed: {},
  watch: {
    
  },
  methods: {
    open(){
       //this.wsUtil.send("hahahah我发送数据拉");
       //this.warnInfoDialog = true;
    },
    message(evt){
      let data = JSON.parse(evt.data);
      this.$store.commit("pushWsData",data);
      if(data.alarmType == 0){
        return;
      }
      this.warnInfoDialog = false;
      this.$nextTick(()=>{
        this.dialogOption = data;
        this.warnInfoDialog = true;
      })
    },
    close(){

    }
  },
  destroyed(){
    console.log('用户退出,开始销毁ws协议');
    this.wsUtil.close();
    console.log('用户退出,开始销毁ws协议');
  },
  components: {
    scmDialog
  }
};
</script>
<style lang='scss' scoped>
</style>