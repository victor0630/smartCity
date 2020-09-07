<template>
  <div class="scm-index">
    <van-nav-bar class="scm-head">
      <van-icon name="arrow-left" slot="left" class="scm-head-icon" @click="back()" />
      <span slot="title" class="scm-head-title">云录像</span>
    </van-nav-bar>
    <div class="scm-body">
      <div class="shoukuan">
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
        <!-- 开始时间控件 -->
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
      </div>
      <div class="listBox">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="loadNext">
            <div class="list" v-for="(item,index) in list" :key="index" @click="jump(item.httpuri)">
              <video :src="item.httpuri"></video>
              <p>
                <span>{{item.playendtime}}</span>
              </p>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import getDate from "../../commonjs/moment.js";
export default {
  data() {
    return {
      name: "", //活动名称
      message: "", //活动详情
      show: false, //开始时间弹窗
      show1: false, //结束时间弹窗
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2020, 11, 31),
      currentDate: new Date(), //开始标准时间
      currentDate1: new Date(), //结束标准时间
      starttime: "", //开始时间
      starttime1: "", //开始时间时间戳
      endtime: "", //结束时间
      endtime1: "", //结束时间时间戳
      form: {
        // 请求表单数据
        startTime: "",
        endTime: "",
        id: "",
        limit: 10,
        pageNo: 1
      },
      list: [],
      show: false,
      showPicker: false,
      currPage: 1,
      finished: true,
      loading: false,
      isLoading: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
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
  methods: {
    select(isSearch = false) {
      if (isSearch) {
        this.list = [];
      }
      console.log(this.form);
      this.form.id = this.$route.query.id;
      this.$http.get(this.$guest.video, this.form).then(res => {
        this.loading = false;
        let data = res.data.data;
        this.list = data;
        console.log(data);
        this.list.forEach(item => {
          if (!item.httpuri) {
            item.httpuri = "";
          }
        });
        if (this.form.pageNo < res.data.totalPages) {
          this.finished = false;
        } else {
          this.finished = true;
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
      let year=this.currentDate.getFullYear();
      let months = (Number(this.currentDate.getMonth()) + 1) < 10 ? "0"+(Number(this.currentDate.getMonth()) + 1) : (Number(this.currentDate.getMonth()) + 1);
      let day = (this.currentDate.getDate() < 10 ? "0"+this.currentDate.getDate() : this.currentDate.getDate())
      let hour = (this.currentDate.getHours() < 10 ? "0"+this.currentDate.getHours() : this.currentDate.getHours());
      let minute = (this.currentDate.getMinutes() < 10 ? "0"+this.currentDate.getMinutes() : this.currentDate.getMinutes());
      this.starttime = year + "-" + months + "-" + day + " " + hour + ":" + minute + ":00"
        // this.currentDate.getFullYear() +
        // "-" +
        // (Number(this.currentDate.getMonth()) + 1) +
        // "-" +
        // this.currentDate.getDate() +
        // "-" +
        // this.currentDate.getHours() +
        // ":" +
        // this.currentDate.getMinutes();
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
      this.form.startTime = this.starttime;
      console.log(this.starttime);
      console.log(this.starttime1);
    },
    // 点击取消
    cancel() {
      this.show = false;
    },
    confirm1() {
      this.show1 = false;
      let year=this.currentDate1.getFullYear();
      let months = (Number(this.currentDate1.getMonth()) + 1) < 10 ? "0"+(Number(this.currentDate1.getMonth()) + 1) : (Number(this.currentDate1.getMonth()) + 1);
      let day = (this.currentDate1.getDate() < 10 ? "0"+this.currentDate1.getDate() : this.currentDate1.getDate())
      let hour = (this.currentDate1.getHours() < 10 ? "0"+this.currentDate1.getHours() : this.currentDate1.getHours());
      let minute = (this.currentDate1.getMinutes() < 10 ? "0"+this.currentDate1.getMinutes() : this.currentDate1.getMinutes());
      this.endtime = year + "-" + months + "-" + day + " " + hour + ":" + minute + ":00"
      // this.endtime =
      //   this.currentDate1.getFullYear() +
      //   "-" +
      //   (Number(this.currentDate1.getMonth()) + 1) +
      //   "-" +
      //   this.currentDate1.getDate() +
      //   "-" +
      //   this.currentDate1.getHours() +
      //   ":" +
      //   this.currentDate1.getMinutes();
      this.endtime1 = new Date(this.currentDate1).getTime() / 1000;
      this.form.endTime = this.endtime;
      console.log(this.form);
      this.select(true)
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
    jump(uri) {
      this.$router.push({
        path: "/playVideo",
        query: {
          uri: uri
        }
      });
    },
    back() {
      this.$router.push({
        path: "/videoPlay",
        query: {
          id:this.$route.query.id,
          tenantId:this.$route.query.tenantId,
          equipInfo:this.$route.query.equipInfo
        }
      });
    },
    loadNext() {
      this.form.pageNo++;
      //   this.getWarnInfo();
    },
    //刷新
    onRefresh() {
      setTimeout(() => {
        this.$Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    getTime() {
       let day = getDate.getVideoTime();
        this.form.startTime = day.starttime;
        this.form.endTime = day.endtime;
    }
  },
  created(){
    this.getTime()
  },
  mounted() {
    this.select();
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon{
  color: black;
}
/deep/ .van-field__control {
  text-align: center;
  color: white;
}
.con {
  background: white;
  padding: 0.75rem 0;
  /deep/.van-cell {
    background: #f6b400;
    width: 7rem;
  }
  /deep/.van-cell:nth-child(1){
    margin-right: 1rem;
  }
}
.van-cell-group {
  width: 15rem;
  margin: auto;
  display: flex;
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
  overflow: scroll;
}
.listBox {
  padding: 0 0.5rem;
  background: white;
  video {
    width: 5rem;
    height: 3rem;
  }
  .list {
    height: 3rem;
    border-bottom: 1px solid lightgray;
    padding: 0.25rem;
    display: flex;
    p {
      margin: 0;
      display: flex;
      align-items: center;
      padding: 0.2rem 0.5rem;
      span {
        font-size: 12px;
        text-align: left;
      }
    }
  }
}
</style>