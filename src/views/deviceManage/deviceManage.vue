<template>
  <div class="scm-deviceManage">
    <div class="scm-device-search">
      <van-search
        class="searchComponet"
        v-model="form.deviceName"
        show-action
        placeholder="请输入关键字搜索"
        @search="search"
      >
        <template #action>
          <div @click="search" >搜索</div>
        </template>
      </van-search>
    </div>

    <div class="devicePath">
      <span @click="showTenant = true">全部 </span>
      <van-icon name="arrow" class="scm-arrow"/>
      <span v-if="!showTenant">{{selectTennant}}</span>
    </div>

    <div class="deviceList">
      <template v-if="showTenant">
        <van-cell :title="item.tenantName"  is-link  v-for="item in tenantDatas" :key="item.tenantId" @click="showEquipList(item)" @touchstart.native="beginClick()" @touchend.native="endClick()" v-if="!showOpt">
          <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-root.png')" width="1.45rem" height="1.35rem"></van-image>
        </van-cell>
        <van-checkbox-group v-model="checkDatas" ref="checkBoxGroup" v-else>
          <van-cell :title="item.tenantName" v-for="(item,index) in tenantDatas" :key="item.tenantId" @click="toggle(index)" >
            <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-root.png')" width="1.45rem" height="1.35rem"></van-image>
            <van-checkbox slot="right-icon" :name="item.tenantId" ref="checkBoxs"></van-checkbox>
          </van-cell>
        </van-checkbox-group>
      </template>
      <template v-else>
        <van-cell :title="item.name"  is-link  v-for="item in equipDatas" :key="item.id" @click="showDeviceInfo(item)"  @touchstart.native="beginClick()" @touchend.native="endClick()" v-if="!showOpt">
          <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-device-offline-off.png')" width="1.25rem" height="1.525rem" v-if="item.onlineStatus == 0"></van-image>
          <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-device-online-off.png')" width="1.25rem" height="1.525rem" v-if="item.onlineStatus != 0 && item.securityDutyCheck == 0"></van-image>
          <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-device-online-on.png')" width="1.625rem" height="1.75rem" v-if="item.onlineStatus != 0 && item.securityDutyCheck == 1"></van-image>
        </van-cell> 
        <van-checkbox-group v-model="checkDatas" v-if="showOpt" ref="checkBoxGroup">
          <van-cell :title="item.name" v-for="(item,index) in equipDatas" :key="item.id" @click="toggle(index)">
            <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-device-offline-off.png')" width="1.25rem" height="1.525rem" v-if="item.onlineStatus == 0"></van-image>
            <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-device-online-off.png')" width="1.25rem" height="1.525rem" v-if="item.onlineStatus != 0 && item.securityDutyCheck == 0"></van-image>
            <van-image slot="icon" :src="require('@/assets/img/deviceManage/icon-device-online-on.png')" width="1.625rem" height="1.75rem" v-if="item.onlineStatus != 0 && item.securityDutyCheck == 1"></van-image>
            <van-checkbox slot="right-icon" :name="item.id" ref="checkBoxs"></van-checkbox>
          </van-cell>
        </van-checkbox-group>
      </template>

      <div class="buttonBox" v-if="showOpt">
        <div class="opt">
          <span @click="startOrCloseSafe(1)">设为安防值守</span>
          <span @click="startOrCloseSafe(0)">关闭安防值守</span>
        </div>
        <div class="selectAll" @click="toggleCheckBoxGroup">全选</div>
      </div>

      <van-notify v-model="showOpt" type="success">
        <van-nav-bar class="scm-head" right-text="完成" @click-right="toggleOpt(false)">
          <img
            :src="require('@/assets/img/frame/top_my.png')"
            slot="left"
            class="scm-head-icon"
          />
          <span slot="title" class="scm-head-title">智慧城市</span>
        </van-nav-bar>
      </van-notify>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        deviceName: ""
      },
      selectTennant: '',
      showTenant : true,
      tenantDatas : [],
      showOpt : false,
      equipDatas : [],
      checkDatas:[],
      touchClock:0,//touch事件定时器
    };
  },
  created() {},
  mounted() {
    this.getTenantDatas();
  },
  computed: {},
  watch: {},
  methods: {
    search() {
      if(!this.form.deviceName){
        this.showTenant = true;
      }else{
        
        this.equipDatas = [];
        this.tenantDatas.forEach(item=>{
          item.equipInfoList.forEach(equip=>{
            if(equip.name.indexOf(this.form.deviceName) != -1){
              this.equipDatas.push(equip);
            }
          })
        })
        this.showTenant = false;
      }
    },
    getTenantDatas(){
      this.$http.get(this.$guest.deviceList).then(res=>{
        this.tenantDatas = res.data || [];
        
      })
    },

    showEquipList(tenant){
      this.equipDatas = tenant.equipInfoList || [];
      this.selectTennant = tenant.tenantName;
      this.showTenant = false;
    },

    showDeviceInfo(item){
      this.$router.push({path:'/videoPlay' , query:{equipInfo : item}});
    },

    beginClick(){
      this.checkDatas = [];
      this.touchClock = setTimeout(()=>{
        this.toggleOpt(true);
      },1000);
    },

    endClick(){
      clearTimeout(this.touchClock);
      this.touchClock = null;
    },

    toggle(index){
      this.$refs.checkBoxs[index].toggle();
    },

    toggleOpt(flag){
      this.showOpt = flag;
    },

    toggleCheckBoxGroup(){
      if(this.checkDatas.length){
        this.$refs.checkBoxGroup.toggleAll(false);
      }else{
        this.$refs.checkBoxGroup.toggleAll(true);
      }
    },

    startOrCloseSafe(flag){
      let equipIdList = [];
      if(this.showTenant){
        debugger;
        this.checkDatas.forEach(item =>{
          this.tenantDatas.forEach(tenant=>{
            if(tenant.tenantId == item){
              tenant.equipInfoList.forEach(equip=>{
                equipIdList.push(equip.id);  
              });
            }
          })
        })
        
      }else{
        this.equipDatas.forEach(item =>{
          equipIdList.push(item.id);
        })
      }
      this.$http.postForm(this.$guest.batchSecurityDutyChange ,{equipIdList:equipIdList , flag:flag}).then(res=>{
        this.securityDutyCheck = flag;
        this.$Toast('设置成功');
      })
    },
  },
  components: {}
};
</script>
<style lang='scss' scoped>
.scm-deviceManage {
  height: 100%;
  overflow: auto;
  .scm-device-search {
    
  }
  .devicePath{
    width: 18.75rem;
    height: 1.95rem;
    background: #f8f8f8;
    text-align: left;
    font-size: 0.7rem;
    line-height: 1.95rem;
    .scm-arrow{
      vertical-align: middle;
    }
    span{
      vertical-align: middle;
      &:first-child{
        margin-left : 0.65rem;
      }
      &:last-child{
        margin-left: 0.15rem;
      }
    }
    
  }
  .deviceList{
    .buttonBox{
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      width: 17.75rem;
      position: fixed;
      bottom: 2.5rem;
      background: white;
    }
  }
}
/deep/ .van-search__action{
  background: #F6B400;
  color: #fff;
}
/deep/ .van-cell__title{
  text-align: left;
  margin-left: 0.8rem;
  font-size: 0.75rem;
}
.buttonBox {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  width: 17.75rem;
  position: fixed;
  bottom: 2.5rem;
  background: white;
  .opt{
    span{
      margin-right: 1rem;
      font-size: 0.7rem;
      padding: 0.15rem 0.5rem;
      border-radius: 0.5rem;
      &:first-child{
        border: 0.05rem solid  #1EA838;
        color: #1EA838;
      }
      &:last-child{
        border: 0.05rem solid  #F6B400;
        color: #F6B400;
      }
    }
  }
  .selectAll {
    background: rgb(246, 179, 1);
    cursor: pointer;
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
  }
  .cancel {
    background: white;
    color: red;
    border: 1px solid red;
    border-radius: 15px;
  }
}
/deep/.van-nav-bar__text{
  color: black;
}
.scm-index{
  height: 2.3rem;
}
.scm-head-icon{
  width:1.2rem;
  height:1.2rem;
}
.scm-head-title{
  width: 6.1rem;
  height: 0.95rem;
  font-size: 0.95rem;
  font-weight: bold;
  text-align: left;
  color: #1c1c1c;
  // line-height: 0.7rem;
}
/deep/ .van-nav-bar{
  width: 100%;
}
/deep/ .van-notify--success{
  background: white;
  padding: 0;
}
</style>