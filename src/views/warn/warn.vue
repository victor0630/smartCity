<template>
  <div class="scm-warn">
    <div class="search">
      <van-field
        :value="showTime"
        placeholder="请选择时间"
        :readonly="true"
        @click="showCalendar"
        class="timeShow scm-input"
      >
        <van-icon name="clock-o" slot="left-icon" color="#fff" />
        <van-icon name="arrow" slot="right-icon" color="#fff" />
      </van-field>
      <van-calendar v-model="show" type="range" @confirm="selectDate" :min-date="new Date(2010, 0, 1)" :max-date="new Date()" color="#F6B400"/>


      <van-field
        :value="showDeviceName"
        placeholder="请选择设备"
        :readonly="true"
        @click="showDevice"
        class="timeShow scm-input"
      >
        <van-icon name="browsing-history-o" slot="left-icon" color="#fff" />
        <van-icon name="arrow" slot="right-icon" color="#fff" />
      </van-field>
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          
          @cancel="showPicker = false"
          @confirm="selectDevice"
        />
      </van-popup>
    </div>

    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="loadNext"
      >
        <scmCell v-for="(item,index) in warnInfoData" :key="index"  class="item" :option="item" @click.native="openDialog(item)"/>
      </van-list>
    </div>
    <scmDialog v-model="warnInfoDialog" :option="dialogOption"></scmDialog>
   
        
  </div>
</template>

<script>
import scmCell from './component/scmCell';
import scmDialog from '@/common/dialog/dialog';
export default {
  data() {
    return {
      form: { // 请求表单数据
        startTime: "",
        endTime: "",
        equipId: "",
        pageSize:20,
        pageNo : 1,
      },
      // minDate: new Date(2010, 0, 1),
      // maxDate: new Date(),
      dialogOption: {},
      warnInfoData:[],
      warnInfoDialog : false,
      show: false,
      showPicker:false,
      showDeviceName : '',
      columns:[],
      deviceData : [],//设备信息
      finished : false,
      loading : false,
      currentPage : 1
    };
  },
  created() {},
  mounted() {
    this.getWarnInfo();
    this.getDeviceInfo();
  },
  computed: {
      //动态回显选中的时间信息
      showTime : function(){
          let showTime = '';
          if(!this.form.startTime || !this.form.endTime){
              return showTime ;
          }
          showTime = this.form.startTime + " - " + this.form.endTime;
          return showTime;
      }
  },
  watch: {},
  methods: {
    //历史告警数据获取
    getWarnInfo(isSearch = false){
      if(isSearch){
        this.warnInfoData = [];
      } 
      this.$http.get(this.$guest.alarm,this.form).then(res=>{
        this.loading = false;
        let infos = res.data.data || [];
        this.warnInfoData = [...this.warnInfoData,...infos];
        if(this.form.pageNo < res.data.totalPages){
          this.finished = false;
        }else{
          this.finished = true;
        }
      })
    },

    //获取设备数据
    getDeviceInfo(){
      this.$http.get(this.$guest.deviceList).then(res=>{
        let data = res.data;
        data.forEach(item => {
          this.deviceData = [...this.deviceData , ...item.equipInfoList];
          item.equipInfoList.forEach(equip =>{
            this.columns.push(equip.name);
          });
        });
      });
    },

    //时间选择器事件触发
    showCalendar() {
      this.show = true;
    },
    //时间组件选中事件
    selectDate(date) {
      this.form.startTime = this.$util.formatDateByArg(date[0],"yyyy-MM-dd");
      this.form.endTime = this.$util.formatDateByArg(date[1],"yyyy-MM-dd");
      this.form.pageNo = 1;
      this.getWarnInfo(true);
      this.show = false;
    },
    //下拉组件事件监听
    showDevice(){
        this.showPicker = true;
    },
    //设备下拉框选中事件
    selectDevice(value, index){
        this.showDeviceName = value;
        this.form.equipId = this.deviceData[index].id;
        console.log(this.form.equipId)
        this.form.pageNo = 1;
        this.getWarnInfo(true);
        this.showPicker = false;
    },
    //下拉分页加载新数据
    loadNext(){
      this.form.pageNo++;
      this.getWarnInfo();
    },

    openDialog(warnInfo){
      this.dialogOption = warnInfo;
      this.warnInfoDialog = true;
    },

    closeDialog(){
      this.warnInfoDialog = false;
    }
  },
  components: {
    scmCell,
    scmDialog
  }
};
</script>

<style lang="scss" scoped>
.scm-warn{
  height:100%;
}
.scm-input-icon {
  width: 1rem;
  height: 1rem;
}
.search {
  display: flex;
  height: 2.2rem;
  margin-top:0.475rem;
  .timeShow {
    width: 8.725rem;
    // margin-left:0.4rem;
    flex: 1;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    
  }
}
.list{
  text-align:center;
  height:calc(100% - 3.2rem);
  margin-top: 0.525rem;
  overflow: auto;
  .item{
    margin-bottom: 0.425rem;
  }
}
</style>
