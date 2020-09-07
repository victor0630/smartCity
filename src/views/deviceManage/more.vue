<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" />
      <span slot="title" class="scm-head-title">抓拍历史</span>
    </van-nav-bar>
    <div class="scm-body">
      <div class="scm-warn">
        <div class="search">
          <div class="con">
            <van-cell-group :border="false">
              <van-field
                v-model="starttime"
                clearable
                placeholder="请输入开始时间"
                @click="start"
                :readonly="true"
              />
              <van-field
                v-model="endtime"
                clearable
                placeholder="请输入结束时间"
                @click="end"
                :readonly="true"
              />
            </van-cell-group>
          </div>
          <van-popup v-model="show" position="bottom">
            <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="confirm"
              @cancel="cancel"
              :formatter="formatter"
            />
          </van-popup>
          <!-- 结束时间控件 -->
          <van-popup v-model="show1" position="bottom">
            <van-datetime-picker
              v-model="currentDate1"
              type="datetime"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="confirm1"
              @cancel="cancel1"
              :formatter="formatter"
            />
          </van-popup>
          <div v-for="(item,index) in data" :key="index" class="buttonBox">
            <div class="btn1" :class="{active : active == '0'}" @click="showClass()">
              {{week[6]}}
              <br />
              {{day[6]}}
            </div>
            <div class="btn2" :class="{active : active == '1'}" @click="showClass()">
              {{week[5]}}
              <br />
              {{day[5]}}
            </div>
            <div class="btn3" :class="{active : active == '2'}" @click="showClass()">
              {{week[4]}}
              <br />
              {{day[4]}}
            </div>
            <div class="btn4" :class="{active : active == '3'}" @click="showClass()">
              {{week[3]}}
              <br />
              {{day[3]}}
            </div>
            <div class="btn5" :class="{active : active == '4'}" @click="showClass()">
              {{week[2]}}
              <br />
              {{day[2]}}
            </div>
            <div class="btn6" :class="{active : active == '5'}" @click="showClass()">
              {{week[1]}}
              <br />
              {{day[1]}}
            </div>
            <div class="btn7" :class="{active : active == '6'}" @click="showClass()">
              {{week[0]}}
              <br />
              {{day[0]}}
            </div>
          </div>
        </div>
        <div class="title">
          <p>人脸抓拍</p>
        </div>
        <div class="listBox">
          <!-- <van-list v-model="loading" :finished="finished" @load="loadNext"> -->
            <!-- <van-checkbox-group v-model="result"> -->
            <van-cell-group @touchstart="touchstart()" @touchend="touchend()">
              <div v-if="showlabel" class="ischeck">
                <van-list v-model="loading" :finished="finished" @load="loadNext" >
                <div class="list" v-for="(item,index) in list" :key="index">
                  <van-image width="2rem" height="2rem" :src="item.capturePicture" />
                  <p>
                    <span>{{item.name}}</span>
                    <span>{{item.captureTime}}</span>
                  </p>
                </div>
                </van-list>
              </div>
              <van-notify v-model="showChecked" type="success">
                <van-nav-bar left-text right-text="完成" left-arrow @click-right="onClickRight">
                  <span slot="title" class="scm-head-title">抓拍历史</span>
                </van-nav-bar>
              </van-notify>

              <van-checkbox-group
                v-model="result"
                v-if="showChecked"
                ref="checkBoxGroup"
                class="showChecked listBoxs"
              >
                <!-- <div v-if="showChecked" class="showChecked listBoxs"> -->
                  <van-list v-model="loading" :finished="finished" @load="loadNext" :offset=50 style="height:18.1rem">
                <div class="list" v-for="(item,index) in list" :key="index">
                  <van-image width="2rem" height="2rem" :src="item.capturePicture" />
                  <p>
                    <span>{{item.name}}</span>
                    <span>{{item.captureTime}}</span>
                  </p>
                  <van-checkbox :name="item" ref="checkboxes" @click="toggle" />
                </div>
                </van-list>

                <div class="buttonBox2">
                  <div class="cancel orange" @click="addBlacklist(5)">设为可疑人物</div>
                  <div class="cancel red" @click="addBlacklist(6)">设为惯偷惯犯</div>
                  <div class="cancel green" @click="addWhiteList">设为VIP客户</div>
                  <div class="selectAll" @click="toggleall">全选</div>
                </div>
                <!-- </div> -->
              </van-checkbox-group>
            </van-cell-group>
            <!-- </van-checkbox-group> -->
          <!-- </van-list> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getDate from "../../commonjs/moment.js";

export default {
  data() {
    return {
      show: false, //开始时间弹窗
      show1: false, //结束时间弹窗
      minHour: 10,
      maxHour: 20,
      minDate: new Date(2010, 11, 31),
      maxDate: new Date(),
      currentDate: new Date(), //开始标准时间
      currentDate1: new Date(), //结束标准时间
      starttime: "", //开始时间
      starttime1: "", //开始时间时间戳
      endtime: "", //结束时间
      endtime1: "", //结束时间时间戳
      week: [],
      day: [],
      active: "",
      data: [{ title: "1" }],
      form: {
        // 请求表单数据
        startTime: "",
        endTime: "",
        equipId: "",
        time: "",
        pageSize: 20,
        pageNo: 1
      },
      list: [],
      show2: false,
      showPicker: false,
      currentPage: 1,
      finished: false,
      loading: false,
      showChecked: false,
      showlabel: true,
      checked: true,
      result: []
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
  created() {
    this.selected("6");
    this.getYesterday();
  },
  mounted() {
    this.select();
    this.getWeekday();
  },
  methods: {
    toggle() {
      console.log(this.result);
    },
    addBlacklist(type) {
      let requests = [];
      if (type == 5) {
        name = "可疑人员";
      }
      if (type == 6) {
        name = "惯偷惯犯";
      }
      console.log(type);
      for (let i = 0; i < this.result.length; i++) {
        let param = {};
        param.type = type;
        param.name = this.result[i].name || name;
        param.tenantId = this.$route.query.tenantId;
        param.blackFaces = [
          {
            imageContent: this.result[i].capturePicture
          }
        ];
        requests.push(
          this.$http
            .post(this.$guest.addBlackList, param));
      }
      this.$http.all(requests,() => {
        this.$toast.success("添加成功");
        this.showChecked = false;
              this.showlabel = true;
              this.result = [];
      })
    },
    addWhiteList() {
      let params = [];
      let serialNumber = Date.parse(new Date());
      for (let i = 0; i < this.result.length; i++) {
        let param = {};
        param.roleId = 3;
        param.realName = this.result[i].name;
        param.tenantId = this.$route.query.tenantId;
        param.serialNumber = serialNumber + i;
        param.photoList = [
          {
            imageContent: this.result[i].capturePicture
          }
        ];
        params.push(param);
      }
      console.log(params);
      this.$http
        .post(this.$campus.addWhiteList, { userList: params })
        .then(res => {
          this.$toast.success("添加成功");
          this.showChecked = false;
          this.showlabel = true;
          this.result = [];
          this.select(true)
        })
        .catch(e => {
          this.$toast.fail("添加失败");
          this.showChecked = false;
          this.showlabel = true;
          this.result = [];
        });
    },
    onClickRight() {
      this.showChecked = false;
      this.showlabel = true;
    },
    toggleall() {
      if (this.result.length) {
        this.$refs.checkBoxGroup.toggleAll(false);
      } else {
        this.$refs.checkBoxGroup.toggleAll(true);
      }
    },
    touchstart() {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          //这里是长按以后需要触发的事件
          this.showChecked = true;
          this.showlabel = false;
        }.bind(this),
        1000
      );
    },
    touchend(index) {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    },
    //获取list
    select(isSearch = false) {
      if (isSearch) {
        this.list = [];
      }
      // console.log(this.form);
      this.form.equipId = this.$route.query.id;
        this.$http.get(this.$guest.face, this.form).then(res => {
          this.loading = false;
          let infos = res.data.data || [];
          // console.log(infos);
          this.list = [...this.list, ...infos];
          if (this.form.pageNo < res.data.totalPages) {
            this.finished = false;
          } else {
            this.finished = true;
          }
        });
      
    },
    back() {
      this.$router.push({
        path: "/videoPlay",
        query: {
          id: this.$route.query.id,
          tenantId: this.$route.query.tenantId,
          equipInfo: this.$route.query.equipInfo
        }
      });
    },
    // 选择开始时间
    start() {
      this.show = true;
    },
    // 选择结束时间
    end() {
      this.show1 = true;
    },
    // 点击确定
    confirm() {
      this.show = false;
      this.starttime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate() +
        "-" +
        this.currentDate.getHours() +
        ":" +
        this.currentDate.getMinutes();
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
      this.form.startTime = this.starttime;
    },
    // 点击取消
    cancel() {
      this.show = false;
    },
    confirm1() {
      this.show1 = false;
      this.endtime =
        this.currentDate1.getFullYear() +
        "-" +
        (Number(this.currentDate1.getMonth()) + 1) +
        "-" +
        this.currentDate1.getDate() +
        "-" +
        this.currentDate1.getHours() +
        ":" +
        this.currentDate1.getMinutes();
      this.endtime1 = new Date(this.currentDate1).getTime() / 1000;
      this.form.endTime = this.endtime;
      console.log(this.form);
      this.select(true);
    },
    cancel1() {
      this.show1 = false;
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    },
    selected(name) {
      this.active = name;
    },
    //获取昨天日期
    getYesterday() {
      let day = getDate.getOne();
      this.form.startTime = day.starttime;
      this.form.endTime = day.endtime;
    },
    //星期按钮点击事件
    showClass(e) {
      console.log(event.target.className);
      if (
        event.target.className == "btn1" ||
        event.target.className == "btn1 active"
      ) {
        this.selected("0");
        let day = getDate.getSix();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.starttime = day.starttime;
        this.endtime = day.endtime;
        console.log(this.starttime, this.endtime);
        this.select(true);
      }
      if (
        event.target.className == "btn2" ||
        event.target.className == "btn2 active"
      ) {
        this.selected("1");
        let day = getDate.getFive();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.starttime = day.starttime;
        this.endtime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn3" ||
        event.target.className == "btn3 active"
      ) {
        this.selected("2");
        let day = getDate.getFour();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.starttime = day.starttime;
        this.endtime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn4" ||
        event.target.className == "btn4 active"
      ) {
        this.selected("3");
        let day = getDate.getThree();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.starttime = day.starttime;
        this.endtime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn5" ||
        event.target.className == "btn5 active"
      ) {
        this.selected("4");
        let day = getDate.getTwo();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.starttime = day.starttime;
        this.endtime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn6" ||
        event.target.className == "btn6 active"
      ) {
        this.selected("5");
        let day = getDate.getOne();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.starttime = day.starttime;
        this.endtime = day.endtime;
        this.select(true);
      }
      if (
        event.target.className == "btn7" ||
        event.target.className == "btn7 active"
      ) {
        this.selected("6");
        let day = getDate.getThis();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
        this.starttime = day.starttime;
        this.endtime = day.endtime;
        this.select(true);
      }
    },
    //下拉加载
    loadNext() {
      this.form.pageNo++;
      this.select();
    },
    //获取星期日期
    getWeekday() {
      let day1 = getDate.getThis();
      this.week.push(day1.week);
      this.day.push(day1.day);
      let day2 = getDate.getOne();
      this.week.push(day2.week);
      this.day.push(day2.day);
      let day3 = getDate.getTwo();
      this.week.push(day3.week);
      this.day.push(day3.day);
      let day4 = getDate.getThree();
      this.week.push(day4.week);
      this.day.push(day4.day);
      let day5 = getDate.getFour();
      this.week.push(day5.week);
      this.day.push(day5.day);
      let day6 = getDate.getFive();
      this.week.push(day6.week);
      this.day.push(day6.day);
      let day7 = getDate.getSix();
      this.week.push(day7.week);
      this.day.push(day7.day);
      console.log(this.day);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-checkbox {
  width: 100%;
  position: absolute;
  padding-left: 16rem;
  height: 100%;
}
/deep/.van-nav-bar__text {
  color: black;
}
/deep/.van-icon-success::before {
  color: white;
}
/deep/.van-notify--success {
  background: white;
  padding: 0;
  /deep/ .van-nav-bar {
    width: 100%;
  }
}
/deep/ .van-field__control {
  text-align: center;
  color: white;
}
.con {
  background: white;
  .van-cell-group {
    width: 15rem;
    margin: auto;
  }
  .van-cell-group[data-v-24c9ea5f] {
    display: flex;
  }
  /deep/.van-cell {
    background: #f6b400;
    width: 7rem;
  }
  /deep/.van-cell:nth-child(1) {
    margin-right: 1rem;
  }
}

/deep/ input::-webkit-input-placeholder {
  color: white !important;
}
.search {
  background: white;
  padding: 0.75rem 0;
}
.scm-input {
  background: lightgray;
  width: 7.2rem;
  border-radius: 8px;
  margin: auto;
}
/deep/ .scm-input input {
  color: black;
}
.listBox {
  padding: 0.5rem 0;
  overflow: scroll;
  height: 19.93rem;
  background: white;
  .list {
    height: 2rem;
    background: white;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0.25rem;
    display: flex;
    margin-bottom: 0.25rem;
    position: relative;

    p {
      margin: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.2rem 0.5rem;
      span {
        font-size: 12px;
        text-align: left;
      }
      span:nth-child(1) {
        color: red;
      }
    }
  }
}
.title {
  height: 2.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f6b400;
  border-bottom: 3px solid #f6b400;
  margin-top: 0.5rem;
}
.buttonBox {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  padding: 0 0.5rem;
  div {
    width: 2rem;
    border: 1px solid lightgray;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    line-height: 14px;
    padding: 0.2rem 0;
  }
  .active {
    border: 1px solid #f6b400;
    background-color: #f6b400;
    color: white;
  }
}
/deep/ .van-icon {
  color: black !important;
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
  margin-top: 0.5rem;
}
.ischeck {
  padding: 0 0.5rem;
}
.showChecked {
  // height: 16rem;
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0 0.5rem;
}
.buttonBox2 {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  width: 17.75rem;
  position: fixed;
  bottom: 0;
  background: white;
  div {
    background: rgb(246, 179, 1);
    cursor: pointer;
    font-size: 12px;
    padding: 0.15rem 0.5rem;
  }
  .cancel {
    background: white;
    border-radius: 15px;
    font-size: 0.5rem;
  }
  .red {
    color: red;
    border: 1px solid red;
  }
  .orange {
    color: #f6b400;
    border: 1px solid #f6b400;
  }
  .green {
    color: green;
    border: 1px solid green;
  }
}
.scm-body {
  overflow: scroll;
}
</style>
