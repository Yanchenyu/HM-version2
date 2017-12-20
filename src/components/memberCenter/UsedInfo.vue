<template>
  <div>
    <!--<div style="background-color:white;padding: 0;margin-top:0;margin-bottom:60px;position:relative">
      <group gutter='12px' class="mesList">
        <div class="mes cus-flexrow" @touchstart="touchStart(1)" @touchend="touchEnd(1)">
          <img src="../../../static/images/memberCenter/lkxx.png" width="24px" height="24px" />
          <cell class="cus-normal vux-override pubClass" :class="{focus:index==1}" :title="'旅客信息'" link="/membercenter/component/BecomeMemberInfo"
                is-link></cell>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(2)" @touchend="touchEnd(2)">
          <img src="../../../static/images/memberCenter/cydz.png" width="24px" height="24px" />
          <cell class="cus-normal   vux-override pubClass" :class="{focus:index==2}" :title="'常用地址'" link="/membercenter/component/SmartEnergyInfo"
                is-link>
          </cell>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(3)" @touchend="touchEnd(3)">
          <img src="../../../static/images/memberCenter/kpxx.png" width="24px" height="24px" />
          <cell class="cus-normal   vux-override pubClass" :class="{focus:index==3}" :title="'开票信息'" link="/membercenter/component/SmartEnergyInfo"
                is-link>
          </cell>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(4)" @touchend="touchEnd(4)">
          <img src="../../../static/images/memberCenter/wdsc.png" width="24px" height="24px" />
          <cell class="cus-normal   vux-override pubClass" :class="{focus:index==4}" :title="'我的收藏'" link="/membercenter/component/SmartEnergyInfo"
                is-link>
          </cell>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(5)" @touchend="touchEnd(5)">
          <img src="../../../static/images/memberCenter/llls.png" width="24px" height="24px" />
          <cell class="cus-normal   vux-override pubClass" :class="{focus:index==5}" :title="'浏览历史'" link="/membercenter/component/SmartEnergyInfo"
                is-link>
          </cell>
        </div>
        <div style="position: absolute;top:44px;left:0;height:2px;width: 100%;background: #eee" v-show="showLine"></div>
      </group>
    </div>-->
    <div class="mesList">
        <div class="mes cus-flexrow" @touchstart="touchStart(1)" @touchend="touchEnd(1)" :class="{focus:index==1}" @click="jump(1)">
          <div class="cus-flexrow">
            <img src="../../../static/images/memberCenter/lkxx.png" width="24px" height="24px" />
            <div class="cus-normal pubClass">旅客信息</div>
          </div>
          <icon name='turnRight' scale='1.6' style="color:#c8c8cd"></icon> 
          <div class="boxShadow" v-show="showLine"></div>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(2)" @touchend="touchEnd(2)" :class="{focus:index==2}" @click="jump(2)">
          <div class="cus-flexrow">
            <img src="../../../static/images/memberCenter/cydz.png" width="24px" height="24px" />
            <div class="cus-normal pubClass">常用地址</div>
          </div>
          <icon name='turnRight' scale='1.6' style="color:#c8c8cd"></icon>
          <div class="boxShadow" v-show="showLine"></div>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(3)" @touchend="touchEnd(3)" :class="{focus:index==3}" @click="jump(3)">
          <div class="cus-flexrow">
            <img src="../../../static/images/memberCenter/kpxx.png" width="24px" height="24px" />
            <div class="cus-normal pubClass">开票信息</div>
          </div>
          <icon name='turnRight' scale='1.6' style="color:#c8c8cd"></icon>
          <div class="boxShadow" v-show="showLine"></div>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(4)" @touchend="touchEnd(4)" :class="{focus:index==4}" @click="jump(4)">
          <div class="cus-flexrow">
            <img src="../../../static/images/memberCenter/wdsc.png" width="24px" height="24px" />
            <div class="cus-normal pubClass">我的收藏</div>
          </div>
          <icon name='turnRight' scale='1.6' style="color:#c8c8cd"></icon>
          <div class="boxShadow" v-show="showLine"></div>
        </div>
        <div class="mes cus-flexrow" @touchstart="touchStart(5)" @touchend="touchEnd(5)" :class="{focus:index==5}" @click="jump(5)">
          <div class="cus-flexrow">
            <img src="../../../static/images/memberCenter/llls.png" width="24px" height="24px" />
            <div class="cus-normal pubClass">浏览历史</div>
          </div>
          <icon name='turnRight' scale='1.6' style="color:#c8c8cd"></icon>
          <div class="boxShadow" v-show="showLine"></div>
        </div>
      </div>
  </div>
</template>

<script>
  import {Cell, Group} from 'vux'
  import {videoPlayer} from 'vue-video-player'


  export default {
    name: 'UsedInfo',
    components: {
      Group,
      videoPlayer,
      Cell
    },
    data () {
      return {
        showLine: false,
        index: "",
        playerOptions: {

          // component options
          start: 0,
          playsinline: true,

          // videojs options
          muted: false,
          language: 'zh-CN',
          // live:true,
          // autoplay: true,
          // playbackRates: [0.7, 1.0, 1.5, 2.0],
          height: 240,
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          // poster: "/static/images/author.jpg",
        }

      }
    },
    mounted() {
      // console.log('this is current player instance object', this.player)
      setTimeout(() => {
        // console.log('dynamic change options', this)
        this.playerOptions.muted = false
      }, 2000)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      jump(val){
        // 暂无二级页面
      },
      touchStart(e){

          this.showLine = true
          this.index = e;

      },
      touchEnd(e){

          this.showLine = false;
          this.index = "";
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/common/themeSettings.less';

  .mesList {
    margin-top: 20px;
    padding-left: 20px;
    background: @panelColor;
    .mes {
      height: 48px;
      padding-right: 20px;
      justify-content: space-between;
      align-items: center;
    }
    .mes:not(:first-child) {
      border-top: 0.7px solid #ebebeb;
    }
  }

  .pubClass {
    line-height: 24px;
    padding-left: 6px;
    color: #484848;
  }

  .focus {
    background: #eee;
    position: relative;
  }

  .boxShadow {
     position: absolute;
     top:-0.7px;
     left:-20px;
     height: 48px;
     width: 20px;
     background: #eee;
     border-top: 0.7px solid #ebebeb;
     border-bottom: 0.7px solid #ebebeb;
  }

</style>
