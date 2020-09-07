<template>
  <div class="scm-videoPlay">
    <van-nav-bar :title="equipInfo.name" left-text="返回" class="head" left-arrow @click-left="back" />
    <div class="video">
      <video controls autoplay ref="video" :src="url" ></video>
      
    </div>

    <div class="photoList">
      <div class="title">
        <span>人脸抓拍</span>
        <span @click="jump()">查看更多</span>
      </div>
      <div class="imageShow">
        <div class="item" v-for="(item,index) in snapshotData" :key="index">
          <van-image width="3.9rem" height="3.9rem" :src="item.capturePicture" />
          <p class="personName">{{item.name}}</p>
          <p>{{item.captureTime}}</p>
        </div>
      </div>
    </div>

    <div class="footer">
        <van-button  class="cloudVideo" @click="jump2()">云录像</van-button>
        <van-button  class="defense" @click="startOrCloseSafe(1)" v-if="securityDutyCheck == 0">启用安防值守</van-button>
        <van-button  class="defense1" @click="startOrCloseSafe(0)" v-else>安防值守中</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snapshotData: [],
      equipInfo: {},
	    url : '',
      securityDutyCheck:0
    };
  },
  created() {
    this.equipInfo = this.$route.query.equipInfo;
    this.securityDutyCheck = this.equipInfo.securityDutyCheck;
  },
  mounted() {
    this.getSnapshotData();
    //this.url = 'http://v.videoincloud.com/zgy/20200902/c61nWx/c61nWx.m3u8?auth_key=1599075023-0-0-952dc5fd25fa1eb258b6437f9e187ef6&uid=bf2eb7c93b844a6f9d3935dfc5dd0ab2&pid=e21da94d4e454024a5953fbf8b5b750b&t=a961845a66b343fc5b6117b38b90aaa9';
    this.getVideoUrl();

    
  },
  computed: {},
  watch: {
    '$store.state.ws.wsData':function(){
      if(this.snapshotData.length > 10){
        this.snapshotData.pop();
      }
      this.snapshotData.unshift(this.$store.state.ws.wsData);
    }
  },
  methods: {
    getSnapshotData() {
      let param = {};
      this.$http
        .get(this.$guest.faceList, { equipId: this.equipInfo.id })
        .then(res => {
          this.snapshotData = res.data.data || [];
        });
    },

    getVideoUrl(){
      let param = {
        equipId  : this.equipInfo.id,
        type : 2
      }
      this.$http.get(this.$guest.videoPlayUrl,param).then(res=>{
        this.url = res.data.rtUrl;
        // if(Hls.isSupported()) {
        //     var video = this.$refs.video;
        //     var hls = new Hls();
        //     hls.loadSource(this.url);
        //     hls.attachMedia(video);
        //     hls.on(Hls.Events.MANIFEST_PARSED,function() {
        //       video.play();
        //   });
        // }
      })
    },

    startOrCloseSafe(flag){
      this.$http.postForm(this.$guest.securityDutyChange ,{equipId:this.equipInfo.id , flag:flag}).then(res=>{
        this.securityDutyCheck = flag;
        this.$Toast('设置成功');
      })
    },

    back() {
      this.$router.push("/deviceManage");
    },
    jump(id) {
      this.$router.push({
        path: "/more",
        query: {
          id:this.equipInfo.id,
          tenantId:this.equipInfo.tenantId,
          equipInfo:this.$route.query.equipInfo
        }
      });
    },
    jump2(id) {
      this.$router.push({
        path: "/cloudVideo",
        query: {
          id:this.equipInfo.id,
          tenantId:this.equipInfo.tenantId,
          equipInfo:this.$route.query.equipInfo
        }
      });
    },
  },
  components: {}
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/const.scss";
.scm-videoPlay {
  position: relative;
  height: 100vh;
  .video {
    video {
      width: 100%;
      height: 11.8rem;
    }
  }
  .photoList {
    background: #fff;

    .title {
      width: 18.75rem;
      height: 2.45rem;
      background: #ffffff;
      border: 0.025rem solid #e1e1e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        &:first-child {
          font-size: 0.9rem;
          margin-left: 0.75rem;
          color: #d88b12;
        }
        &:last-child {
          font-size: 0.75rem;
          margin-right: 0.75rem;
          color: #009cff;
        }
      }
    }
    .imageShow {
      display: flex;
      width: 18.35rem;
      overflow: auto;
      margin-top: 0.325rem;
      margin-bottom: 0.5rem;
      .item {
        width: 4rem;
        margin-left: 0.4rem;
        margin-bottom: 0.5rem;

        p {
          @include block-start-end;

          &:last-child {
            color: #7f7f7f;
            font-size: 0.75rem;
          }
        }
        .personName {
          color: #ff0000;
          font-size: 0.75rem;
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0rem;
    width: 18.75rem;
    height: 2.875rem;
    background: #ffffff;
    box-shadow: 0rem -0.125rem 0.25rem 0rem rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content:center;
    align-items: center;
    .cloudVideo{
        color: #fff;
        background: #f8bb00;
        width: 7rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
        margin-right: 1rem;
    }
    .defense{
        background: #BFBFBF;
        color: #fff;
        width: 7rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
        margin-left: 1rem;
    }
    .defense1{
        background: #1EA838;  
        color: #fff;
        width: 7rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
        margin-left: 1rem;
    }
  }
}
/deep/.van-nav-bar__text {
  color: #000;
}
/deep/.van-nav-bar .van-icon {
  color: #000;
}
</style>