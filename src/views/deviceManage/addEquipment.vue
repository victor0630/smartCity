<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" />
      <span slot="title" class="scm-head-title">添加设备</span>
    </van-nav-bar>
    <div class="scm-body">
      <van-cell-group>
        <van-cell required class="list">
          <div >请选择租户</div>
        <van-field :value="showDeviceName" :readonly="true" @click="showDevice" class="timeShow" style="padding:0"></van-field>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="selectDevice"
          />
        </van-popup>
        </van-cell>
        <van-field v-model="name" required label="设备名称" />
        <van-field v-model="id" required label="设备号"  />
        <van-cell required disabled>
          <div>员工库:</div>
          <select v-model="employeesActive" @change="changeProduct($event)">
            <option v-for="(item,index) in employeesRep" :key="index" :value="item.id">{{item.name}}</option>
          </select>
        </van-cell>
       
        <van-button type="primary" @click="add">添加设备</van-button>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form:{tenantId:"",type:"员工库"},
      deviceData: [],
      showPicker: false,
      showDeviceName: "",
      columns: [],
      checked: true,
      name: "",
      id: "",
      way: "福富设备管理平台",
      brand: "华为",
      type: "人脸门禁",
      longitude: "",
      latitude: "",
      rtmp: "",
      videoNum: "0021023824754",
      bitRate: "512kbps",
      describe: "",
      rtsp: "",
      time: "",
      faceDynamicsCheck: false,
      faceStructureCheck: false,
      fireCheck: false,
      heatCheck: false,
      whiteListCheck: true,
      blacklistCheck: true,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      frontEquip: false,
      productList: [
        { id: 0, title: "480i" },
        { id: 1, title: "720P" },
        { id: 2, title: "2080P" }
      ],
      ProductActive: "0",
      employeesRep: [],
      employeesActive: "0"
    };
  },
  methods: {
    changeProduct(event) {
      this.ProductActive = event.target.value; //获取option对应的value值
    },
    add() {
      let param = {};
      param.agreement = 7;
      param.equipName = this.name;
      param.equipNum = this.id;
      param.brand = 6;
      param.classification = 2;
      param.inOutFlag = 1;
      param.frontEquip = Number(this.frontEquip);
      param.equipOneMoreThreshold = 80;
      param.videoNum = this.videoNum;
      param.networktype = 1;
      param.rate = this.bitRate;
      param.resolution = this.ProductActive;
      param.employeesRepIds = this.employeesActive;
      param.whiteListCheck = Number(this.whiteListCheck);
      param.blacklistCheck = Number(this.blacklistCheck);
      console.log(param);
      this.$http
        .post(this.$guest.addEquipinfo, param)
        .then(res => {
          this.$toast.success("添加成功");
          this.back()
        })
        .catch(e => {
          this.$toast.fail("添加失败");
        });
    },
    //返回
    back() {
      this.$router.push("/deviceManage");
      this.$store.commit("add");
    },
    showDevice() {
      this.showPicker = true;
    },
    //租户下拉框
    selectDevice(value, index) {
      this.showDeviceName = value;
      this.showPicker = false;
      this.form.tenantId = this.deviceData[index].tenantId;
      console.log(this.form.tenantId);
      this.employeesRepIds()
    },
    //获取员工库
    employeesRepIds() {
      this.$http.get(this.$guest.employeesRepIds,this.form).then(res => {
        let data = res.data.data
        this.employeesRep = data
        console.log(this.employeesRep)
         this.employeesRep.forEach(item => {
            
          });
      });
    },
    //获取租户信息
    tenantList(){
      this.$http.get(this.$guest.tenantList).then(res => {
        let data = res.data;
        this.deviceData = [...this.deviceData, ...data];
        console.log(this.deviceData);
        data.forEach(item => {
          this.columns.push(item.tenantName);
        });
      });
    },
  },
  created(){
   
  },
  mounted(){
    this.tenantList()
  }
};
</script>
<style lang="scss" scoped>
.van-nav-bar .van-icon{
  color: black;
}
/deep/.van-popup--bottom{
  width: 100%!important;
}
.list>.van-cell__value{
  display: flex;
}
.list{
  .timeShow{
    width: 11rem;
  }
}
.van-checkbox {
  padding: 10px 16px;
  font-size: 0.5rem;
  width: 7rem;
  float: left;
}
/deep/.van-progress {
  width: 100% !important;
  display: block !important;
  margin-top: 0.5rem;
}
.van-cell__value > div {
  display: inline-block;
  width: 4.7rem;
  margin-right: 0.6rem;
}

select {
  width: 11rem;
  border-radius: 5px;
  height: 1.5rem;
  border-color: lightgray;
  padding-left: 0.5rem;
}
/deep/ .van-field__label {
  width: 4.7rem;
  margin-right: 0.6rem;
}
/deep/.van-field__control {
  width: 11rem;
  border-radius: 5px;
  height: 1.5rem;
  border: 1px solid lightgray;
  padding-left: 0.5rem;
}

.van-button--normal {
  width: 16rem;
  margin: 0.5rem 0;
  background: #f6b301;
  border-color: #f6b301;
}
.scm-index {
  height: 2.3rem;
}
.scm-head-icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.5rem;
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
  height: calc(100vh - 2.45rem);
  overflow: scroll;
}
</style>