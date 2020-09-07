<template>
  <van-dialog :value="value" :showConfirmButton="false" @input="changeValue" class="scm-dialog">
    <div slot="title" class="scm-title">告警详情</div>
    <div class="scm-content">
      <div class="imge-item">
        <div class="imageContain">
          <van-image
            width="5.25rem"
            height="5.25rem"
            :src="option.capturePicture"
            class="imageShow"
          ></van-image>
          <p>抓拍图</p>
        </div>

        <div class="imageContain">
          <van-image
            width="5.25rem"
            height="5.25rem"
            :src="option.basePicture"
            class="imageShow"
          ></van-image>
          <p>底库图</p>
        </div>
      </div>

      <div class="warnInfo">
        <div class="infoItem">
          <span>抓拍时间</span>
          <span>{{option.captureTime}}</span>
        </div>

        <div class="active infoItem">
          <span>告警类型</span>
          <span>{{option.name}}</span>
        </div>

        <div class="infoItem">
          <span>设备名称</span>
          <span>{{option.equipName}}</span>
        </div>

        <div class="infoItem">
          <span>登记时间</span>
          <span>{{option.registerTime}}</span>
        </div>

        <div class="infoItem">
          <span>其他信息</span>
          <span>{{option.memo}}</span>
        </div>
      </div>

      <div class="scm-footer">
        <van-button class="comfirmButton" @click="closeDialog">确定</van-button>
      </div>
    </div>
  </van-dialog>
</template>

<script>
export default {
  props: ["value","option"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    changeValue(value) {
      this.$emit("input", value);
    },
    closeDialog() {
      this.$emit("input", false);
    }
  },
  components: {}
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/const.scss";
.scm-dialog {
  width: 15rem;
  background: #ffffff;
  box-shadow: 0rem 0.15rem 0.3rem 0rem rgba(47, 47, 47, 0.3);
  .scm-title {
    height: 1.8rem;
    background: #f6b400;
    font-size: 0.75rem;
    font-family: Source Han Sans CN Normal, Source Han Sans CN Normal-Normal;
    font-weight: bold;
    color: #000000;
    text-align: center;
    line-height: 1.8rem;
  }
  .scm-content {
    margin-left: 1rem;
    margin-right: 1rem;
    .imge-item {
      display: flex;
      margin-top: 0.3rem;

      .imageContain {
        background-image: url("./img/bg.png");
        background-size: 100% 100%;
        padding: 0.5rem;
        flex: 1;
        &:first-child {
          margin-right: 0.5rem;
        }
        &:last-child {
          margin-left: 0.5rem;
        }
        p {
          @include block-start-end;
        }
      }
    }

    .warnInfo {
      .infoItem {
        text-align: left;
        line-height: 1.6rem;
        font-size: 0.7rem;
        font-weight: bold;
        border-bottom: 0.025rem solid #d1d1d1;
        span {
          &:first-child {
            color: #0c162c;
          }
          &:last-child {
            color: #666666;
            margin-left: 1.025rem;
          }
        }
      }

      .active {
        span {
          color: #ff0000 !important;
        }
      }
    }

    .scm-footer {
      margin-top: 0.9rem;
      margin-bottom: 0.9rem;
      .comfirmButton {
        color: #fff;
        width: 12.5rem;
        height: 1.85rem;
        background: #f8bb00;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
  }
}
</style>
<style lang="scss">
.scm-dialog .van-dialog__header {
  padding-top: 0px;
}
</style>