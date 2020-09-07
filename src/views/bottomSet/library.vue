<template>
  <div class="scm-library">
    <van-tabs v-model="active">
      <van-tab title="白名单">
        <van-field :value="showDeviceName" :readonly="true" @click="showDevice" class="timeShow"></van-field>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="selectDevice"
          />
        </van-popup>
        <!-- <van-list v-model="loading" :finished="finished" @load="loadNext"> -->
        <!-- <van-checkbox-group v-model="result"> -->
        <van-cell-group @touchstart="touchstart()" @touchend="touchend()">
          <div v-show="showlabel" class="listBox">
            <van-list v-model="loading" :finished="finished" @load="loadNext" :offset=50>
              <van-cell
                v-for="(item) in person"
                class="item"
                :key="item.serialNumber"
                :title="item.realName"
                is-link
                @click="jump(item.id)"
              >
                <template #icon>
                  <van-image round width="2rem" height="2rem" :src="item.src" />
                </template>
              </van-cell>
            </van-list>
          </div>
          <van-notify v-model="showChecked" type="success">
            <van-nav-bar class="scm-head" right-text="完成" @click-right="cancel">
              <img
                :src="require('@/assets/img/frame/top_my.png')"
                slot="left"
                class="scm-head-icon"
              />
              <span slot="title" class="scm-head-title">智慧城市</span>
            </van-nav-bar>
          </van-notify>

          <van-checkbox-group
            v-model="result"
            v-if="showChecked"
            ref="checkBoxGroup"
            class="showChecked"
          >
            <!-- <div v-show="showChecked" class="showChecked listBox"> -->
            <van-list v-model="loading" :finished="finished" @load="loadNext" :offset=50>
              <van-cell
                v-for="(item) in person"
                class="item"
                :key="item.serialNumber"
                :title="item.realName"
                is-link
              >
                <template #icon>
                  <van-image round width="2rem" height="2rem" :src="item.src" />
                </template>
                <template #right-icon>
                  <van-checkbox :name="item.id" ref="checkboxes" @click="check()" />
                </template>
              </van-cell>
            </van-list>
            <div class="buttonBox">
              <div class="cancel" @click="deleteMore">删除</div>
              <div class="selectAll" @click="toggleall">全选</div>
            </div>
            <!-- </div> -->
          </van-checkbox-group>
        </van-cell-group>
        <!-- </van-checkbox-group> -->
        <!-- </van-list> -->
      </van-tab>

      <van-tab title="黑名单">
        <van-field :value="showBlackName" :readonly="true" @click="showDevice" class="timeShow"></van-field>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="blackColumns"
            @cancel="showPicker = false"
            @confirm="selectBlack"
          />
        </van-popup>
        <!-- <van-list v-model="loading" :finished="finished" @load="loadNext"> -->
        <!-- <van-checkbox-group v-model="result"> -->
        <van-cell-group @touchstart="touchstart()" @touchend="touchend()">
          <div v-if="showlabel" class="listBox">
            <van-list v-model="loading" :finished="finished" @load="loadNext" :offset=50>
              <van-cell
                v-for="(item) in blackList"
                class="item"
                :key="item.blackId"
                :title="item.name"
                is-link
                @click="jump2(item.id)"
              >
                <template #icon>
                  <van-image round width="2rem" height="2rem" :src="item.src" />
                </template>
              </van-cell>
            </van-list>
          </div>

          <van-notify v-model="showChecked" type="success">
            <van-nav-bar class="scm-head" right-text="完成" @click-right="cancel">
              <img
                :src="require('@/assets/img/frame/top_my.png')"
                slot="left"
                class="scm-head-icon"
              />
              <span slot="title" class="scm-head-title">智慧城市</span>
            </van-nav-bar>
          </van-notify>

          <van-checkbox-group
            v-model="result"
            v-if="showChecked"
            ref="checkBoxGroup2"
            class="showChecked"
          >
            <!-- <div v-if="showChecked" class="showChecked listBox"> -->
            <van-list v-model="loading" :finished="finished" @load="loadNext" :offset=50>
              <van-cell
                v-for="(item) in blackList"
                class="item"
                :key="item.blackId"
                :title="item.name"
                is-link
              >
                <template #icon>
                  <van-image round width="2rem" height="2rem" :src="item.src" />
                </template>
                <template #right-icon>
                  <van-checkbox :name="item.id" @click="check()" />
                </template>
              </van-cell>
            </van-list>
            <div class="buttonBox">
              <div class="cancel" @click="deleteBlack">删除</div>
              <div class="selectAll" @click="toggleall2">全选</div>
            </div>
          </van-checkbox-group>
          <!-- </div> -->
        </van-cell-group>
        <!-- </van-checkbox-group> -->
        <!-- </van-list> -->
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deviceData: [],
      showChecked: false,
      showlabel: true,
      checked: true,
      result: [],
      loading: false,
      finished: false,
      active: 0,
      show: false,
      shwoBlack: false,
      showPicker: false,
      showDeviceName: "",
      showBlackName: "",
      columns: [],
      blackColumns: [],
      form: {
        // 请求表单数据
        pageSize: 20,
        pageNo: 1,
        id: ""
      },
      person: [],
      blackList: []
    };
  },
  methods: {
    //白名单删除
    deleteMore() {
      let sum = this.result.toString();
      this.$http
        .delete(this.$campus.deleteMore + sum)
        .then(res => {
          let data = res.data;
          console.log(this.data);
          this.$toast.success("删除成功");
          this.result = [];
          this.showChecked = false;
          this.showlabel = true;
          this.select(true);
        })
        .catch(e => {
          this.$toast.fail("删除失败");
          this.showChecked = false;
          this.showlabel = true;
        });
    },
    //黑名单删除
    deleteBlack() {
      let sum = this.result.toString();
      this.$http
        .delete(this.$guest.delete + sum)
        .then(res => {
          this.$toast.success("删除成功");
          this.result = [];
          this.showChecked = false;
          this.showlabel = true;
          this.selectBlackList(true);
        })
        .catch(e => {
          this.$toast.fail("删除失败");
          this.showChecked = false;
          this.showlabel = true;
        });
    },
    //打印选中的ID
    check() {
      console.log(this.result);
    },
    getId() {
      console.log(this.id);
    },
    //全选
    toggleall() {
      // for (let i = 0; i < this.person.length; i++) {
      //   this.$refs.checkboxes[i].toggle();
      // }
      if (this.result.length) {
        this.$refs.checkBoxGroup.toggleAll(false);
      } else {
        this.$refs.checkBoxGroup.toggleAll(true);
      }
    },
    toggleall2() {
      if (this.result.length) {
        this.$refs.checkBoxGroup2.toggleAll(false);
      } else {
        this.$refs.checkBoxGroup2.toggleAll(true);
      }
    },
    //关闭长按出现的页面
    cancel() {
      this.showChecked = false;
      this.showlabel = true;
    },
    touchstart() {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          //这里是长按以后需要触发的事件
          this.show = true;
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
    //下拉组件事件监听
    showDevice() {
      this.showPicker = true;
    },
    //白名单下拉框选中事件
    selectDevice(value, index) {
      this.showDeviceName = value;
      this.showPicker = false;
      this.form.id = this.deviceData[index].tenantId;
      console.log(this.form.id);
      this.select(true);
    },
    //黑名单下拉框选中事件
    selectBlack(value, index) {
      this.showBlackName = value;
      this.showPicker = false;
      this.form.id = this.deviceData[index].tenantId;
      console.log(this.form.id);
      this.selectBlackList(true);
    },
    name() {
      this.showBlackName = "全部";
      this.showDeviceName = "全部";
    },

    //商户按需获取
    getlist() {
      this.$http.get(this.$guest.tenantList).then(res => {
        let data = res.data;
        this.deviceData = [...this.deviceData, ...data];
        console.log(this.deviceData);
        data.forEach(item => {
          this.form.id = item.tenantId;
          this.columns.push(item.tenantName);
          this.blackColumns.push(item.tenantName);
          // console.log(this.form.id);
        });
      });
    },
    //黑名单全部获取
    selectBlackList(isSearch = false) {
      if (isSearch) {
        this.person = [];
      }
      this.$http.get(this.$guest.list, this.form).then(res => {
        let data = res.data.data;
        this.blackList = data;
        this.blackList.forEach(item => {
          item.id = item.blackId;
          // console.log(item)
          if (item.blackFaces && item.blackFaces.length) {
            item.src = item.blackFaces[0].facePicture;
          } else {
            item.src = "";
          }
        });
        if (this.form.pageNo < res.data.totalPages) {
          this.finished = false;
        } else {
          this.finished = true;
        }
      });
    },
    //白名单全部获取
    select(isSearch = false) {
      if (isSearch) {
        this.person = [];
      }
      this.$http.get(this.$campus.user, this.form).then(res => {
        this.loading = false;
        let data = res.data.data;
        this.person = data;
        // console.log(data)
        this.person.forEach(item => {
          item.orgName = item.org.name;
          if (item.photoList && item.photoList.length) {
            item.src = item.photoList[0].photoUrl;
          } else {
            item.src = "";
          }
        });
        if (this.form.pageNo < res.data.totalPages) {
          this.finished = false;
        } else {
          this.finished = true;
        }
      });
    },
    //下拉分页加载新数据
    loadNext() {
      this.form.pageNo++;
      this.select();
      this.selectBlackList();
    },

    //白名单跳转
    jump(id) {
      this.$router.push({
        path: "/person",
        query: {
          id: id
          // id
        }
      });
    },
    //黑名单跳转
    jump2(id) {
      this.$router.push({
        path: "/blackList",
        query: {
          id: id
          // id
        }
      });
    }
  },
  mounted() {
    this.name();
    this.select();
    this.selectBlackList();
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>
/deep/.van-cell--clickable{
  align-items: center;
}
/deep/.van-checkbox {
  width: 100%;
  position: absolute;
  padding-left: 16rem;
  height: 100%;
}
/deep/.van-nav-bar__text {
  color: black;
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
  line-height: 0.7rem;
}
/deep/ .van-nav-bar {
  width: 100%;
}
/deep/ .van-notify--success {
  background: white;
  padding: 0;
}

.listBox {
  overflow: scroll;
  height: 23.37rem;
}
.finish {
  background: white;
  z-index: 9;
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
}
.showChecked {
  height: 21.1rem;
  position: relative;
  overflow: scroll;
}
.buttonBox {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  width: 17.75rem;
  position: fixed;
  bottom: 2.5rem;
  background: white;
  div {
    background: rgb(246, 179, 1);
    cursor: pointer;
    font-size: 12px;
    padding: 0.15rem 0.5rem;
  }
  .cancel {
    background: white;
    color: red;
    border: 1px solid red;
    border-radius: 15px;
  }
}
/deep/ .van-field__control:read-only {
  text-align: center;
  color: white;
}
.scm-library {
  height: 100%;
  // overflow: scroll;
}
/deep/ .van-button--primary {
  width: 17rem;
  height: 1.8rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  background: rgb(246, 179, 1);
  border: #f6b301;
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
  label {
    display: flex;
    position: relative;
    align-items: center;
    text-align: left;
    height: 2rem;
    border-bottom: 1px solid lightgray;
  }
  input {
    position: relative;
    left: 14rem;
  }
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
  // .listBox{
  //   height: 23.5rem;
  //   overflow: scroll;
  // }
}
</style>