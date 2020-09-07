<template>
  <div class="scm-main">
    <div style="display:flex; justify-content: space-around;">
      <van-field
        :value="showTime"
        placeholder="请选择时间"
        :readonly="true"
        @click="showCalendar"
        class="timeShow"
      ></van-field>
      <van-calendar
        v-model="show"
        type="range"
        @confirm="selectDate"
        :min-date="new Date(2010, 0, 1)"
        :max-date="new Date()"
        color="#F6B400"
      />
      <van-field
        :value="showDeviceName"
        placeholder
        :readonly="true"
        @click="showDevice"
        class="timeShow"
      ></van-field>
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="selectDevice"
        />
      </van-popup>
    </div>
    <div class="buttonBox">
      <div class="btn1" :class="{active : active == '0'}" @click="showClass()">昨天</div>
      <div class="btn2" :class="{active : active == '1'}" @click="showClass()">近3天</div>
      <div class="btn3" :class="{active : active == '2'}" @click="showClass()">近7天</div>
      <div class="btn4" :class="{active : active == '3'}" @click="showClass()">本月</div>
      <div class="btn5" :class="{active : active == '4'}" @click="showClass()">上月</div>
    </div>
    
    <ve-ring :data="chartData" :settings="chartSettings" :extend="extend">
      <div class="count">
        档案数量
        <p>{{sum}}(人)</p>
      </div>
    </ve-ring>
    <ve-histogram :data="ageDate" :settings="histogramSettings" :extend="histogram"></ve-histogram>
  </div>
</template>
<script>
import getDate from "../../commonjs/moment.js";
export default {
  data() {
    this.histogramSettings = {
      metrics: ["user"],
      labelMap: {
        user: "人数"
      }
    };
    this.chartSettings = {
      metrics: ["user"],
      labelMap: {
        user: "人数"
      },
      radius: [70, 100],
      offsetY: 150,
      hoverAnimation: false,
      labelLine: {
        show: false
      },
      label: {
        show: false
      }
    };
    return {
      extend: {
        legend: {
          orient: "vertical",
          left: 15
        }
      },
      histogram: {
        grid: {
          show: true, //
          borderWidth: "1", //边框宽度
          borderColor: "lightgray", //边框颜色
          x: 20,
          y: 50,
          x2: 20,
          y2: 50
        },
        legend: {
          orient: "vertical",
          left: 15
        }
      },
      chartData: {
        columns: ["date", "user"],
        rows: [
          { date: "", user: "" },
          { date: "", user: "" }
        ]
      },
      ageDate: {
        columns: ["date", "user"],
        rows: [
          { date: "0~6岁", user: "" },
          { date: "7~17岁", user: "" },
          { date: "18~40岁", user: "" },
          { date: "41~65岁", user: "" },
          { date: "65岁以上", user: "" }
        ]
      },
      data: [{ title: "1" }],
      form: {
        startTime: "",
        endTime: "",
        time: "",
        deptId: ""
      },
      active: "",
      showCheck: false,
      show: false,
      showPicker: false,
      showDeviceName: "",
      columns: [],
      deviceData: [],
      sum: ""
    };
  },
  computed: {
    //动态回显选中的时间信息
    showTime: function() {
      let showTime = "";
      if (!this.form.startTime || !this.form.endTime) {
        return showTime;
      }
      showTime = this.form.startTime + " - " + this.form.endTime;
      return showTime;
    }
  },
  methods: {
    //下拉组件事件监听
    showDevice() {
      this.showPicker = true;
    },
    //下拉框选中事件
    selectDevice(value, index) {
      this.showDeviceName = value;
      this.showPicker = false;
      this.form.deptId = this.deviceData[index].tenantId;
      console.log(this.form.deptId);
      this.select(true);
    },
    //时间选择器事件触发
    showCalendar() {
      this.show = true;
    },
    //时间组件选中事件
    selectDate(date) {
      this.form.startTime = this.$util.formatDateByArg(date[0], "MM-dd");
      this.form.endTime = this.$util.formatDateByArg(date[1], "MM-dd");
      this.show = false;
      console.log(this.form.startTime, this.form.endTime);
      this.select(true);
    },
    //根据条件获取数据
    getlist() {
      this.$http.get(this.$guest.tenantList).then(res => {
        let data = res.data;
        // console.log(data);
        this.deviceData = [...this.deviceData, ...data];
        // console.log(this.deviceData);
        data.forEach(item => {
          // this.form.deptId = item.tenantId;
          this.columns.push(item.tenantName);
        });
      });
    },
    //获取echarts数据
    select(isSearch = false) {
      if (isSearch) {
        this.person = [];
      }
      this.$http.post(this.$guest.vcharts, this.form).then(res => {
        let data = res.data.data;
        console.log(data);
        let man = 0;
        let woman = 0;
        let lessSix = 0;
        let seven2Seventeen = 0;
        let eighteen2Fourty = 0;
        let fourtyone2Sixtyfive = 0;
        let moreSixtysix = 0;
        data.forEach(item => {
          man += item.profile.gender.female;
          woman += item.profile.gender.male;
          lessSix += item.profile.age.lessSix;
          seven2Seventeen += item.profile.age.seven2Seventeen;
          eighteen2Fourty += item.profile.age.eighteen2Fourty;
          fourtyone2Sixtyfive += item.profile.age.fourtyone2Sixtyfive;
          moreSixtysix += item.profile.age.moreSixtysix;
          this.chartData.rows[0].date = "男生（" + man + "）";
          this.chartData.rows[1].date = "女生（" + woman + "）";
          this.chartData.rows[0].user = man;
          this.chartData.rows[1].user = woman;
          this.ageDate.rows[0].user = lessSix;
          this.ageDate.rows[1].user = seven2Seventeen;
          this.ageDate.rows[2].user = eighteen2Fourty;
          this.ageDate.rows[3].user = fourtyone2Sixtyfive;
          this.ageDate.rows[4].user = moreSixtysix;
          this.sum = man + woman;
        });
      });
    },
    //添加CLASS触发高亮
    selected(name) {
      this.active = name;
    },
    //五个时间按钮对应的事件
    showClass(e) {
      console.log(event.target.className);
      if (
        event.target.className == "btn1" ||
        event.target.className == "btn1 active"
      ) {
        this.selected("0");
        let day = getDate.getYesterday();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn2" ||
        event.target.className == "btn2 active"
      ) {
        this.selected("1");
        let day = getDate.getThreedays();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn3" ||
        event.target.className == "btn3 active"
      ) {
        this.selected("2");
        let day = getDate.getSevendays();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn4" ||
        event.target.className == "btn4 active"
      ) {
        this.selected("3");
        let day = getDate.getCurrMonthDays();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn5" ||
        event.target.className == "btn5 active"
      ) {
        this.selected("4");
        let day = getDate.getLastMonthDays();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.select(true);
      }
    },
    //获取昨天开始时间、结束时间
    getYesterday() {
      let day = getDate.getYesterday();
      this.form.startTime = day.starttime;
      this.form.endTime = day.endtime;
    },
    name() {
      this.showDeviceName = "全部";
    }
  },

  created() {
    this.getYesterday();
    this.selected("0");
  },
  mounted() {
    this.select();
    this.getlist();
    this.name();
  }
};
</script>
<style lang="scss" scoped>
.count {
  position: absolute;
  top: 7rem;
  width: 100%;
  font-size: 1rem;
  p {
    margin: 0;
    font-size: 0.8rem;
  }
}
.scm-main {
  overflow: scroll;
  height: 100%;
  padding: 0 0.5rem;
}
/deep/ .van-cell {
  width: 8.5rem;
  height: 1.8rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  background: #f6b301;
  border: #f6b301;
  color: white;
  display: flex;
  align-items: center;
}
/deep/ .van-field__control:read-only {
  color: white;
  text-align: center;
}
/deep/ .ve-ring {
  width: 17.5rem !important;
  height: 14rem !important;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  padding: 0.5rem 0;
}
/deep/ .ve-histogram {
  width: 17.5rem !important;
  height: 20rem !important;
  background-color: white;
  margin: auto;
  margin-top: 1rem;
  padding: 0.5rem 0;
  border-radius: 5px;
}

.buttonBox {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
  div {
    width: 3rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    text-align: center;
    font-size: 12px;
  }
  .active {
    border: 1px solid #3e87f6;
    background-color: rgb(236, 244, 252);
    color: rgb(62, 135, 246);
  }
}

/deep/ .van-button--primary {
  width: 9rem;
  height: 1.8rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  background: rgb(246, 179, 1);
  border: #f6b301;
}
.van-button--primary:nth-child(1) {
  margin-right: 0.5rem;
}
.overlay {
  height: 10rem;
  width: 15rem;
  label {
    display: block;
    text-align: left;
  }
  label > input {
    float: right;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 16rem;
  height: 14rem;
  background-color: #fff;
}
.van-tabs {
  /deep/ .van-tab__pane > .van-cell:nth-child(1) {
    background: rgb(246, 179, 1);
    margin: 10px 16px;
    padding: 0;
    width: 91%;
    border-radius: 7px;
    height: 1.7rem;
  }
  /deep/ .van-tab__pane > .van-cell:nth-child(1) > .van-cell__right-icon {
    color: white;
    padding-right: 0.2rem;
    font-size: 12px;
  }
  /deep/ .van-cell__value--alone {
    text-align: center;
    color: white;
  }
  /deep/ .van-tabs__content--animated {
    overflow: visible;
  }
  .van-cell__title {
    text-align: left;
    padding-left: 10px;
  }
  /deep/ .van-tab--active {
    color: rgb(255, 210, 0);
  }
  /deep/ .van-tabs__line {
    z-index: 0;
    width: 50% !important;
    background: rgb(255, 210, 0);
  }
  .van-tab__pane {
    /deep/ .van-overlay {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .van-cell {
    align-items: center;
  }
  /deep/ .van-overlay {
    height: 33rem;
  }
}
</style>