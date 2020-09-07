<template>
  <div class="scm-cell">
    <div class="content">
      <van-image
        
        :src="option.capturePicture"
        class="imageShow"
      ></van-image>
      <!-- <img :src="option.capturePicture" class="imageShow"> -->
      <div class="info">
        <p>{{option.name}}</p>
        <p>{{option.equipName}}</p>
      </div>
      <div class="date">{{option.registerTime}}</div>

      <van-icon name="arrow" class="icon"/>
    </div>
  </div>
</template>

<script>
export default {
  props:['option'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
  components: {}
};
</script>
<style lang='scss' scoped>
@import "../../../assets/css/const.scss";
.scm-cell {
  width: 17.925rem;
  //min-height: 3rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: #ffffff;
  border: 0.025rem solid #d5d5d5;
  box-shadow: 0rem 0.05rem 0.075rem 0rem rgba(0, 0, 0, 0.32);
  display: inline-block;
  .content {
    display: flex;
    align-items: center
  }
  .imageShow {
    margin-left: 0.675rem;
    //margin-top: 0.375rem;
    width: 2.25rem;
    height: 2.25rem;
  }
  .info {
    font-size: 0.6rem;
    font-weight: Normal;
    text-align: left;
    //margin-top: 0.4rem;
    margin-left: 0.6rem;
    line-height: 1.125rem;
    font-size: 0.75rem;
    font-weight: bold;
    width:10rem;
    p{
      @include block-start-end;
      &:first-child{
        color: #ff0000;
      }
    }
  }
  .date{
    //margin-left: 2.45rem;
   // margin-top: 1.175rem;
    color: #666666;
    font-size: 0.6rem;
  }
  .icon{
    color: #d5d5d5;
    font-size: 0.75rem;
    //margin-left: 1.05rem;
    //margin-top: 1.2rem;
  }
}
</style>