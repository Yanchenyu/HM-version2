<template>
  <div class="pageWrap">
    <!-- 1.顶部环境数据信息栏 -->
    <div class="topEnv">
      <div class="layout cus-flexrow-center">
        <!-- 1.1.左侧 -->
        <div class="topLeft cus-13 cus-flexcolumn">
          <!-- 1.1.1 -->
          <div>
            {{topEnvData.userName}}<span v-show="topEnvData.userName !=''">，</span>您好！ 
            <span :class="[topEnvData.env.loaded?'':'withoutEnv', 'welcoming']">
              欢迎入住{{hotelBasicInfo.Name}}-{{topEnvData.hotelInfo.roomNum}}
            </span>
          </div>
          <!-- 1.1.2 -->
          <div v-if="topEnvData.env.loaded">
            <div class="cus-32 standardLine">{{topEnvData.env.temperature}}℃</div>
            <span>室内空气 {{topEnvData.env.airLvl}}</span><span style="margin:0 8px">|</span><span>湿度 {{topEnvData.env.humidity}}</span>
          </div>
        </div>
        <!-- 1.2.右侧按钮 -->
        <div class="circleBtn cus-small cus-flexrow-center" @click="getDoorKey">
          <div class="icon_lock"></div>
        </div>
      </div>
    </div>

    <!-- 3.设备控制集合 -->
    <div class="deviceArea">
      <div class="layout cus-flexrow">
        <!-- 3.1 左侧设备图标集合 -->
        <ul class="deviceIcon cus-flexcolumn-center">
          <li class="icon_air" v-if="deviceListMap.airConditioner != -1" :class="{on:deviceIndex==0}" @click='selectDevice(0)'></li>          
          <li class="icon_light" v-if="deviceListMap.light != -1" :class="{on:deviceIndex==1}" @click='selectDevice(1)'></li>
          <li class="icon_curtain" v-if="deviceListMap.curtain != -1" :class="{on:deviceIndex==2}" @click='selectDevice(2)'></li>
          <li class="icon_music" v-if="deviceListMap.music != -1" :class="{on:deviceIndex==3}" @click='selectDevice(3)'></li>
        </ul>
        <!-- 3.2 右侧 -->
        <ul class="devicePanel">
          <li class="air" v-if="deviceIndex==0">
            <div class="row1 cus-flexrow-center cus-colorGray">
              <i class="cus-h2 ">空调</i>
              <i></i>
              <i :class="[controlSettings.airConditioner.Status.Powered?'btn_on':'btn_off', btnSelectId==0?'btnPressed':'']" 
                 @click="airclick_power" @touchstart="btnTouchStart(0)" @touchend="btnTouchEnd()"></i>
            </div>
            <div class="row2 cus-flexrow-center">
              <i :class="['btn_minus', btnSelectId==1?'btnPressed':'']" 
                 @click="airclick_minus" @touchstart="btnTouchStart(1)" @touchend="btnTouchEnd()"></i>
              <i class="cus-32 cus-themeColor">{{controlSettings.airConditioner.Status.Temperature}}℃</i>
              <i :class="['btn_add', btnSelectId==2?'btnPressed':'']" 
                 @click="airclick_add" @touchstart="btnTouchStart(2)" @touchend="btnTouchEnd()"></i>
            </div>
            <div class="row3 cus-flexrow-center">
              <i :class="[controlSettings.airConditioner.Status.WorkMode == 1?'btn_coldA':'btn_cold', btnSelectId==3?'btnPressed':'']" 
                 @click="airclick_mode(1)" @touchstart="btnTouchStart(3)" @touchend="btnTouchEnd()"></i>
              <i :class="[controlSettings.airConditioner.Status.WorkMode == 2?'btn_hotA':'btn_hot',btnSelectId==4?'btnPressed':'']" 
                 @click="airclick_mode(2)" @touchstart="btnTouchStart(4)" @touchend="btnTouchEnd()"></i>
              <i :class="['btn_wind', btnSelectId==5?'btnPressed':'']"
                 @click="airclick_wind" @touchstart="btnTouchStart(5)" @touchend="btnTouchEnd()"></i>
            </div>
          </li>
          <li class="light" v-else-if="deviceIndex==1">
            <div class="row1 cus-flexrow-center cus-colorGray">
              <i class="cus-h2">灯光</i>
              <i></i>
              <i :class="[controlSettings.light.Status.Powered!=0?'btn_light_closeall':'btn_light_openall',  btnSelectId==6?'btnPressed':'']" 
                 @click="lightclick_powerall" @touchstart="btnTouchStart(6)" @touchend="btnTouchEnd()"></i>
            </div>
            <div class="row2 cus-flexrow-center">
              <i :class="[controlSettings.light.lights.aisle.Status.Powered!=0?'btn_light_aisleA':'btn_light_aisle', btnSelectId==7?'btnPressed':'']" 
                 @click="lightclick_powerSingle('aisle')" @touchstart="btnTouchStart(7)" @touchend="btnTouchEnd()"></i>
              <i :class="[controlSettings.light.lights.read.Status.Powered!=0?'btn_light_readA':'btn_light_read',  btnSelectId==8?'btnPressed':'']" 
                 @click="lightclick_powerSingle('read')" @touchstart="btnTouchStart(8)" @touchend="btnTouchEnd()"></i>
              <i :class="[controlSettings.light.lights.bed.Status.Powered!=0?'btn_light_bedA':'btn_light_bed', btnSelectId==9?'btnPressed':'']" 
                 @click="lightclick_powerSingle('bed')" @touchstart="btnTouchStart(9)" @touchend="btnTouchEnd()"></i>
            </div>
            <div class="row3 cus-flexrow-center">
              <i :class="[controlSettings.light.lights.bath.Status.Powered!=0?'btn_light_wcA':'btn_light_wc', btnSelectId==10?'btnPressed':'']" 
                 @click="lightclick_powerSingle('bath')" @touchstart="btnTouchStart(10)" @touchend="btnTouchEnd()"></i>
              <i :class="[controlSettings.light.lights.wind.Status.Powered!=0?'btn_wc_windA':'btn_wc_wind', btnSelectId==11?'btnPressed':'']" 
                 @click="lightclick_powerSingle('wind')" @touchstart="btnTouchStart(11)" @touchend="btnTouchEnd()"></i>
              <i class=""></i>
            </div>
          </li>
          <li class="curtain" v-else-if="deviceIndex==2">
            <div class="row1 cus-flexrow-center cus-colorGray">
              <i class="cus-h2">窗帘</i>
              <i></i>
              <i class=""></i>
            </div>
            <div class="row2 cus-flexrow-center">
              <i :class="['btn_curtain_open', btnSelectId==12?'btnPressed':'']" 
                 @click="curtainclick_open" @touchstart="btnTouchStart(12)" @touchend="btnTouchEnd()"></i>
              <i :class="['btn_pause', btnSelectId==13?'btnPressed':'']" 
                 @click="curtainclick_pause" @touchstart="btnTouchStart(13)" @touchend="btnTouchEnd()"></i>
              <i :class="['btn_curtain_close', btnSelectId==14?'btnPressed':'']" 
                 @click="curtainclick_close" @touchstart="btnTouchStart(14)" @touchend="btnTouchEnd()"></i>
            </div>
            <div class="row3 cus-flexrow-center">
              <i class=""></i>
              <i class=""></i>
              <i class=""></i>
            </div>
          </li>
          <li class="music" v-else-if="deviceIndex==3">
            <div class="row1 cus-flexrow-center cus-colorGray">
              <i class="cus-h2">音响</i>              
              <div class="musicName cus-flexrow-center">
                <div class="icon_musicTip"></div>
                <span class="cus-15 cus-ftColorBlack2">{{recentPlayMusic}}</span>
              </div>
            </div>
            <div class="row2 cus-flexrow-center">
              <i :class="['btn_music_prev', btnSelectId==15?'btnPressed':'']" 
                 @click="musicclick_prev" @touchstart="btnTouchStart(15)" @touchend="btnTouchEnd()"></i>
              <i :class="[controlSettings.music.Status.Status.data.isPlaying!='false'?isMusicPaused?'btn_playA':'btn_pauseA':'btn_play', btnSelectId==16?'btnPressed':'']" 
                 @click="musicclick_playPause" @touchstart="btnTouchStart(16)" @touchend="btnTouchEnd()"></i>
              <i :class="['btn_music_next', btnSelectId==17?'btnPressed':'']"
                 @click="musicclick_next" @touchstart="btnTouchStart(17)" @touchend="btnTouchEnd()"></i>
            </div>
            <div class="row3 cus-flexrow-center">
               <!-- <img class="icon_vol_down" src='../../assets/images/roomControl/icon_vol_down.png'/>
               <img class="icon_vol_up" src='../../assets/images/roomControl/icon_vol_up.png'/>               -->
               <div class="icon_vol_down"></div>
               <range class="volrange" v-model="volume" :min="10" :max="100" style="position: static; margin-left:10px; margin-right:10px;"
                      minHTML="<span style='display:none'></span>" 
                      maxHTML="<span style='display:none'></span>"></range>
               <div class="icon_vol_up"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
        <!-- 2.模式切换栏 -->
    <div class="sceneModeArea">
      <div class="title cus-small cus-colorGray">懒人设置</div>
      <div class="modeBar cus-15 cus-flexrow">
        <div class="modeItem cus-flexcolumn-center" @click='selectMode(0)'>
          <div class="modeicon" :class="modeIndex==0?'icon_mode_comfortA':'icon_mode_comfort'"></div>
          <i :class='{on:modeIndex == 0}' class="cus-small" >舒适模式</i>
        </div>
        <div v-for="(item,idx) in sceneData" :key="idx" @click='selectMode(idx+1)' v-if="item.Name !='影院模式'" class="modeItem cus-flexcolumn-center" >
          <div class="modeicon" :class="modeCalcIcons(item,idx+1==modeIndex)"></div>
          <i :class='{on:modeIndex == idx + 1}' class="cus-small">{{item.Name}}</i>
        </div>
      </div>
    </div>
    <!-- 4.更多服务 -->
    <div class="moreServiceArea">
      <div class="cus-small cus-colorGray">更多服务</div>
      <ul class="servieTag cus-flexrow cus-ftColorBlack">
        <li @click="showMorningCall = true">叫醒服务</li>
        <li><a :href="'tel:'+hotelBasicInfo.Tel" class="cus-ftColorBlack">呼叫前台</a></li>
        <li class="cus-colorV2Border">一键退房</li>
      </ul>
    </div>

    <!-- 5.未登录提示 isVisitor -->
    <div class="mask" @click="maskClick" v-show="isVisitor"></div>
    <x-dialog
      :title="''"
      v-model="noAuthority"
      :hide-on-blur="true">
      <div class="weui-dialog__bd"><p class="ftSize-hl" style="text-align:center;">{{isLogin?message:(is_weixin?'亲，你还没有绑定手机哟':'亲，你还没有登录哟')}}</p></div>
      <div class="weui-dialog__ft noYourRoom">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cus-h1 cus-themeColor" @click="orderNewOne" v-show="isLogin&&!isQuery">{{message=='没有你的房间，只能看看'?'现在去订一间':'知道了'}}</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cus-h1 cus-themeColor" @click="goLogin" v-show="!isLogin&&!isQuery">{{is_weixin?'去绑定':'去登录'}}</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cus-h1 cus-themeColor" @click="goCheckOut" v-show="isQuery">退房了</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cus-h1 cus-themeColor" @click="changeRoom" v-show="isQuery">我订了另一间</a>
      </div>
    </x-dialog>
    <x-dialog
      :title="''"
      v-model="showMorningCall"
      :hide-on-blur="true">
      <div class="weui-dialog__bd callMorning">
        <p v-if="MorningCall.Enabled" class="callYouWakeUp">早上{{MorningCall.TiggerTime}}叫你起床</p>
        <p class="callYouWakeUp">
          {{MorningCall.Enabled == true ? "是否重新设置叫早时间" : "是否开启叫早服务"}}
        </p>
      </div>
      <div class="weui-dialog__ft noYourRoom">
        <a v-if="!MorningCall.Enabled" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cus-h1" @click="onCancel">取消</a>
        <a v-if="MorningCall.Enabled" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cus-h1" @click="onCancel">不，关闭叫早</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cus-h1" @click="onConfirm">{{MorningCall.Enabled == true ? '是，重新设置' : '开启'}}</a>
      </div>
    </x-dialog>
    <datetime v-show="morningTimeSelect" v-model="morningValue" clear-text='设置叫早时间' confirmText='保存'
          :minute-list="['00', '10', '20', '30', '40', '50']" cancelText='取消' :min-hour=3
          :max-hour=11 format='HH:mm' @on-change="timeChange" title='' :show.sync="morningTimeSelect"
          @update:show="morningTimeSelect = false">
    </datetime>
  </div>
</template>
<script>
import {Range, XDialog, Datetime} from 'vux'
import {is_weixin} from '@/utils/device'
import {mapState} from 'vuex'
import {storeSet, storeGet, ls_unionId} from '@/utils/localStorage'
import {deviceTypes} from '@/utils/roomControl'
import _ from 'lodash'
import {
  userInfoCheck,
  getControlRoom,
  roomControlLoadEvnData,
  loadDevicesInRoomPanel,
  fetchLoadMemberDetailViewByBindIdAxios,
  fetchMemberInfoAxios,
  set15minsComfortableEnv,
  openTimeScene,
  closeTimeScene,
  // --- v2 新增获取房间 ---
  getScenesAndDevices,    
  getRoomDeviceStatus,  
  setRoomSceneV2, 
  changeDeviceStatusV2,
} from '@/services/axiosapi'
import {
  getFixRoomControlData
} from '@/services/fixtureApi'
import {comfort15minsRandomMusicMap} from '@/utils/musicRandomMap'

export default {
  name: 'RoomControl',
  components: {
    Range,
    XDialog,
    Datetime
  },
  data(){
    return {
      is_weixin: is_weixin(),
      isVisitor: true,
      // 房间没有控制权限
      noAuthority: false,   
      isLogin: false,
      isQuery: false,
      message: '没有你的房间，只能看看',
      apiRefreshId: null,
      // 组件beforeMount初始化，或者离开页面后，重新activated时触发，数据initial
      initialDT: false,
      // 授权用户数据
      userInfo: {},
      hotelBasicInfo:{
        Name:'',
        Tel:''
      },
      // 辅助数据
      mobile: 0,
      loading: false,   // 数据加载
      // 操作选择索引
      deviceIndex:-1,  // 设备选择索引
      modeIndex: -1,
      btnSelectId: null,  // 当前正被点中的按钮
      // 控制default数据
      volume:50,
      volumeCopy: false,  // 是否是接口请求得到的controlSettings.music.Status.Status.data.volume ，不需要调用设定api
      recentPlayIdx: 5, // 默认播放musicRandomMap的第5首
      recentPlayMusic: '音乐',  // 播放歌曲名     TODO 改名
      btnPlaySet: 'play',   // 点击播放按钮的中间过程记录
      playEndIdx: null, // 计算音乐播放结束时间的timeout的句柄playEndTimerId

      // 叫醒      
      morningTimeSelect: false,
      morningValue:'',
      showMorningCall: false,
      MorningCall: {
        Id: "0", 
        Name: "叫醒服务",
        TiggerTime: "09:56",
        Enabled: false
      },
      // 页面渲染数据
      topEnvData: {
        userName:"",
        hotelInfo:{
            hotelName:"智慧酒店",
            roomNum: 8081
        },
        env:{
            temperature:26,
            airLvl:"优",
            humidity:"适中",
            light:'',  // 暂未使用
            loaded: false // 是否成功加载房间检测数据
        }
      },
      // 模式数据
      sceneData: [],
      // 设备列表
      deviceListData: [],
      // 预置设备对应设备在deviceListData中的索引
      deviceListMap:{
        airConditioner: -1,
        light: -1,
        curtain: -1,
        music: -1
      },
      // 控制面板设定数据
      controlSettings: {
        airConditioner:{
          Status:{
            Powered: 0,   // 0:关,1:开
            Temperature:20,
            VentilationSpeed:null,  // 0:自动,1:高,2:中,3:低
            WorkMode: 1    //1:制冷,2:制热,3:送风
          }
        },
        light: {
          Id:0,
          Status:{Powered:0},
          lights:{
            aisle:{Status:{Powered:0}},
            read:{Status:{Powered:0}},
            bed:{Status:{Powered:0}},
            bath:{Status:{Powered:0}},
            wind:{Status:{Powered:0}}
          }
        },
        curtain: {
          Id:0,
          Status:{OpenPercent:0}
        },
        music: {
          Id:0,
          Status: {
            Status:{
              data: {
                isPlaying: 'false',
                volume: "0.5",
                songName:''
              },
              message:""
            }            
          }
        }
      },
      needApiSet: false,    // 是否需要调用接口（watch 使用）
    }
  },
  beforeMount(){
    // 依据用户信息加载房间数据
    if (!_.isEmpty(localStorage["memberInfo"])){
      console.log(111)
      this.loadInitialData()
    } else {
      if(is_weixin()) {
        console.log(112)
        // 请求用户数据
        this.$store.dispatch('setLoadingState', true);
        this.initialMemInfo()
      } else {
        console.log(113)        
        this.loadFixtureData()
        this.$store.dispatch('setLoadingState', false);
      }        
    }
    this.initialDT = true;  // beforeMount刚初始化了，activated就不做了
  },

    // keep-alive 激活用
  activated(){
    console.log('002.roomcontrol activated')
    if(!this.initialDT) {
      if(!this.isVisitor) {
        this.startRefreshEnvData(); // 再次回来，重新启用定时刷新环境数据
      }
      //校验 是否仍是合法用户，并且页面加上loading图标
      this.checkUserValid(false);
    }
  },
  deactivated() {
    // visitor退出组件后，需要销毁，保证用户登录能正常触发信息验证和数据加载。
    console.log('roomcontrol deactivated')
    if(this.isVisitor) {
      this.$store.dispatch('keepAlivePageDel', 'RoomControl')
    } else {
      this.initialDT = false;
      this.playEndIdx && clearTimeout(this.playEndIdx)
      this.apiRefreshId && clearInterval(this.apiRefreshId);
    }
  },
  beforeDestroy(){          
    this.playEndIdx && clearTimeout(this.playEndIdx)
    this.apiRefreshId && clearInterval(this.apiRefreshId);
  },
  methods: {
    loadInitialData(){ // TODO loadInitialData
      this.$store.dispatch('setLoadingState', true);
      this.mobile = storeGet("memberInfo","Phone");
      this.isLogin = true;
      this.initialRoomData();
    },
    // 没有实际设备时的页面假数据
    loadFixtureData() {
        let d = getFixRoomControlData()   // TODO                 
        this.sceneData = d.Data.sceneData
        this.deviceListData = d.Data.deviceListData
        this.syncDeviceIndex()
    },
    /**
     * 微信根据unionid获取用户信息
     * copy 代码from MemberCenter
     */
    initialMemInfo(){
      this.findMember()
    },
    saveStorageMember(obj){
      storeSet('memberInfo', 'Id', obj.Id);
      storeSet('memberInfo', 'Phone', obj.Phone);
      storeSet('memberInfo', 'NickName', obj.NickName);
      if(!storeGet('memberInfo', 'Avatar')){
        storeSet('memberInfo', 'Avatar', obj.Avatar);
      }
      storeSet('memberInfo', 'BindId', obj.BindId);
    },
    findMember(){
      let params = {}
      params.bindId = ls_unionId();
      params.bindWay = "W";
      fetchLoadMemberDetailViewByBindIdAxios(params).then(response => {          
        if (response.data.Success == true) {
          console.log("response.data.Success", response.data.Message);
          this.$store.dispatch('setMemberInfo', response.data.Content);
          this.$store.dispatch("setMemberHeadImg", response.data.Content.Avatar);
          this.$store.dispatch("setMemberLoginStatu", true);
          let obj = response.data.Content;
          this.saveStorageMember(obj);
          this.loadInitialData();  // 执行完saveStorageMember后再调用房间数据
        } else {
          // TODO 显示无查询数据
          this.loadFixtureData()
          this.$store.dispatch("setMemberLoginStatu", false);
          this.$store.dispatch('setLoadingState', false);
        }
      }).catch(err => {
        this.loadFixtureData()
        this.$store.dispatch("setMemberLoginStatu", false);
        this.$store.dispatch('setLoadingState', false);
      })
    },
    
    // 组件数据初始化
    initialRoomData() {
      // 缓存登陆用户数据提取
      this.userInfo = storeGet("SH_RoomControl","VerifyInfo")?storeGet("SH_RoomControl","VerifyInfo"):{}
      this.syncBasicInfo()

      if (_.isEmpty(this.userInfo)) {
        // 没有可控房间数据，所以要捞一次
        this.getValidControlRoom();
      } else {
        // 有可控房间数据，直接调queryCheckIn
        this.checkUserValid(true);
      }
    },
    /**
     * 通过手机号，捞取房间信息
     */
    getValidControlRoom() {
      // 捞取可控房间信息      
      let option = {
        phone: this.mobile
      }
      getControlRoom(option).then(response => {
        if (response.data.Code=="0") {
          if (response.data.Content.length !== 0) {
            let content = response.data.Content[0];
            // TODO 暂时选择默认数组第一个房间，后期再考虑多个房间控制选择问题
            this.userInfo = content;
            this.syncBasicInfo()    // 更新
            storeSet("SH_RoomControl","VerifyInfo", content);
            let RoomNumber = response.data.Content.RoomNumber;
            this.$store.dispatch("setRoomNumber", RoomNumber);
            // 捞到房间后，再看当前房间是否有效
            this.checkUserValid(true);         
          }
        } else {
          this.isVisitor = true;
          this.isQuery = false;
          this.$store.dispatch('setLoadingState', false);
          this.loadFixtureData()
          if (response.data.Code == '21004') {
            // 已定房但还不能操控房间
            this.message = '请在'+response.data.Content+'之后体验智慧客房';
          } else {
            this.message = '没有你的房间，只能看看';
          }
        }
        
      })
    },
    // check 用户是否仍是合法用户
    checkUserValid(isCreated) {
        let option = {
          checkInId: this.userInfo.CheckinId
        }
        userInfoCheck(option).then(response => {
          if (response.data.Code=="0") {
            if (response.data.Content) {
              this.isVisitor = false;
              this.$store.dispatch('setLoadingState', false);
              if(isCreated) {
                this.loadRoomInfo()
                this.$store.dispatch('keepAlivePageAdd', 'RoomControl')
              }
            }
          } else {
            // code不是0，表示非法入住，当前房间已失效，那么就要分两个情况，第一，换房间了，第二，客人打算离店了
            storeSet("SH_RoomControl","VerifyInfo", {});
            // 这里的isQuery表示提示栏里的选项信息要变化
            this.message = '没有你的房间，只能看看';
            this.isVisitor = true;
            this.loadFixtureData()
            this.isQuery = true;
                        
            this.$store.dispatch('setLoadingState', false);
          }
        }).catch(err => {
          console.log(err);
        })      
    },
    // 房间数据加载
    loadRoomInfo() {      
      // 加载环境数据， 定时setInterval
      this.startRefreshEnvData();
      this.getScenesAndDevicesData()
      //this.getDeviceState();
      //this.getSmartEnery();
      //this.getBasicInfo();
    },
    // 定时刷新环境监测数据
    startRefreshEnvData () {
      this.getEnvData();
      this.apiRefreshId = setInterval(() => {
        this.getEnvData();
      },300000);
    },

    // 获取房间模式和设备数据
    getScenesAndDevicesData(){
      let params = {
        roomId: this.userInfo.RoomId
      };
      getScenesAndDevices(params).then(response => {
        console.log('v2 load room data:')
        console.log(response)
        if(response.data.Code == 0) {
          let content = response.data.Content
          // 模式
          this.sceneData = content.Scenes
          // 设备
          this.deviceListData = content.Devices
          this.syncDeviceIndex()
          // 初始设备控制数据
          this.initialDeviceControlData(content.DefaultDevice) 
          // 同步叫早数据
          this.MorningCall = content.MorningCall
          this.hotelBasicInfo = content.Hotel
        }
      })
      .catch(err => {
        this.utils.showNetError();
      })
    },

    // 加载环境数据
    getEnvData () {
      let params = {
        memberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId
      }

      roomControlLoadEvnData(params).then(response => {
        console.log('roomControlLoadEvnData', response)
        if (response.data.Success == true) {
          let content = response.data.Content 
          if(content.InDoorAir.Value<35){
            this.topEnvData.env.airLvl = "优"
          }else if(content.InDoorAir.Value>=35&&content.InDoorAir.Value<75){
            this.topEnvData.env.airLvl = "良"
          }else if(content.InDoorAir.Value>=75&&content.InDoorAir.Value<=115){
            this.topEnvData.env.airLvl = "差"
          }else if(content.InDoorAir.Value>115){
            this.topEnvData.env.airLvl = "很差"
          }
          if (content.Humidity.Value < 40) {
            this.topEnvData.env.humidity = "干燥"
          } else if (content.Humidity.Value <= 60 && content.Humidity.Value >= 40) {
            this.topEnvData.env.humidity = "适中"
          } else if (content.Humidity.Value > 60) {
            this.topEnvData.env.humidity = "潮湿"
          }
          if (content.Lighting.Value < 20) {
            this.topEnvData.env.light = "室内较暗"
          } else if (content.Lighting.Value <= 45 && content.Lighting.Value >= 20) {
            this.topEnvData.env.light = "室内光线舒适"
          } else if (content.Lighting.Value > 45) {
            this.topEnvData.env.light = "室内明亮"
          }
          this.topEnvData.env.loaded = true
        } else {
          this.topEnvData.env.loaded = false
          //this.utils.toast({msg: response.data.Message})
        }
      })
      .catch(err => {
        console.log('roomControlLoadEvnData err:' + err)
      })
    },

    // ------ v2 新增接口 ------
    // 设备数据映射
    syncDeviceIndex() {
      this.deviceListData.forEach((element, idx) => {
        switch(element.TypeId) {
          case 100:
            this.deviceListMap.airConditioner = idx;
            break;
          case 200:
            this.deviceListMap.light = idx
            break;
          case 400:
            this.deviceListMap.curtain = idx
            break;
          case 500:
            this.deviceListMap.music = idx
            break;
          default:
            console.log('new device type')
            break;
        }
      })
      // 默认显示的设备控制界面
      if(this.deviceListMap.airConditioner != -1) {
        this.deviceIndex = 0
      } else if(this.deviceListMap.light != -1){
        this.deviceIndex = 1
      } else if(this.deviceListMap.curtain != -1){
        this.deviceIndex = 2
      } else if(this.deviceListMap.music != -1){
        this.deviceIndex = 3
      }
    },

    // 设置控制面板显示数据
    initialDeviceControlData(defaultData) {
      if(defaultData.TypeId == 100) {
        this.controlSettings.airConditioner = defaultData
      } else if(defaultData.TypeId == 200) {
        this.controlSettings.light = defaultData
      } else if(defaultData.TypeId == 400) {
        this.controlSettings.curtain = defaultData
      } else if(defaultData.TypeId == 500) {
        this.controlSettings.music = defaultData
      }      
    },
    // 同步接口请求到的酒店、用户数据给渲染
    syncBasicInfo(){
      if(!_.isEmpty(this.userInfo)) {
        this.topEnvData.userName = this.userInfo.CustomerName
        this.topEnvData.hotelInfo.hotelName = this.userInfo.HotelName
        this.topEnvData.hotelInfo.roomNum = this.userInfo.RoomNumber
      }
    },
    // 处理舒适体验设置
    handleComfortableMode(){
      let option = {
        roomId: this.userInfo.RoomId ,
        memberId: this.userInfo.MemberId
      }
      set15minsComfortableEnv(option)
        .then(response => {
          if (response.data.Success) {
            // TODO success情况下，同步页面设备数据
          } else {            
            //console.log(`15min设定失败：${response.data.Message}`)
            this.utils.toast({msg: '设定失败，请稍后再试'});
          }
        })
        .catch(err => {
          this.utils.toast({msg: '设定失败，请稍后再试'})
        })
    },
    // 普通模式设置
    handleSceneSet(idx){
      let option = {
        sceneId: this.sceneData[idx].Id,    
        roomId: this.userInfo.RoomId
      }
      setRoomSceneV2(option)
      .then(response => {
        console.log('setRoomSceneV2', response)
        if (response.data.Code == 0) {
          // TODO 设定ok， 
          console.log('设置ok')
        }
      })
      .catch(err => {
        console.log('模式设定失败:' + err)
      })
    },
    // ------ v2 新增接口 ------
    // 设备状态获取
    getDeviceStatus(idx){
      let option = {
        roomId: this.userInfo.RoomId,
        deviceId:''
      }
      switch(idx){
        case 0:
          option.deviceId = this.deviceListData[this.deviceListMap.airConditioner].Id
          break;
        case 1:
          option.deviceId = this.deviceListData[this.deviceListMap.light].Id
          break;
        case 2:
          option.deviceId = this.deviceListData[this.deviceListMap.curtain].Id
          break;
        case 3:
          option.deviceId = this.deviceListData[this.deviceListMap.music].Id
          break;
      }

      if(option.deviceId){
        getRoomDeviceStatus(option).then(response => {
          console.log(response)
          let content = response.data.Content
          if (response.data.Code == 0) {
            switch(idx){
              case 0:
                this.controlSettings.airConditioner = content
                break;
              case 1:
                // 数组转为对象
                let lightArr = {}
                content.Items.forEach(ele => {
                  if(ele.TypeId == 201) {
                    lightArr.aisle = ele
                  } else if(ele.TypeId == 202) {
                    lightArr.read = ele
                  } else if(ele.TypeId == 203) {
                    lightArr.bed = ele
                  } else if(ele.TypeId == 204) {
                    lightArr.bath = ele
                  } else if(ele.TypeId == 300) {
                    lightArr.wind = ele
                  }
                })
                let lightval = { 
                  Id: content.Id,
                  Status: content.Status,
                  lights: lightArr
                }
                this.controlSettings.light = lightval
                break;
              case 2:
                this.controlSettings.curtain = content
                break;
              case 3:
                content.Status.Status = JSON.parse(content.Status.Status)
                this.controlSettings.music = content
                console.log('server data:')
                console.log(content)
                if(this.volume != parseInt(parseFloat(content.Status.Status.data.volume)* 100)){
                  this.volumeCopy = true  // 接口得到的数据需要更新
                }
                // 添加定时，计算音乐何时结束
                this.musicRefreshStatusTimer()
                break;
            }
          }
        }).catch(err => {
          //this.utils.showNetError()
          console.log(err)
        })
      }            
    },
    // --- click事件 ---  
    selectMode(idx) {
      if(this.modeIndex == idx) {
        return
      }
      this.modeIndex = idx
      if(idx == 0) {
        this.handleComfortableMode()
      } else {
        this.handleSceneSet(idx-1)
      }
    },
    // 切换选择设备
    selectDevice(idx){
      this.deviceIndex = idx
      // 接口查询设备状态数据
      this.getDeviceStatus(idx)
    },

    // 未登录点击操作
    maskClick(){      
      this.noAuthority = true;
    },

    orderNewOne(){
      if (this.message == '没有你的房间，只能看看') {
        this.$router.push({
          name: 'SmartHotel'
        })
      } else {
        this.noAuthority = false;
      }
        
    },
    goLogin(){
      if(is_weixin()){
        this.$router.push({
            name: 'ReplaceBindingPhone'
        })
      } else {
        this.$router.push({
            name: 'Login'
        })
      }
    },
    goCheckOut(){
      // 房退了
      this.isVisitor = true;
      this.isQuery = false;
    },
    changeRoom(){
      this.noAuthority = false;
      this.$store.dispatch('setLoadingState', true);
      this.getValidControlRoom();
    },
    // 获取开门密码
    getDoorKey() {
      // 检查是否是合法用户
      if (_.isEmpty(this.userInfo)) {
        this.isVisitor = true;
      } else {
        let option = {
          checkInId: this.userInfo.CheckinId
        }
        userInfoCheck(option).then(response => {
          if (response.data.Code=="0") {
            if (response.data.Content) {
              this.isVisitor = false;
              // 是合法用户才可以查看门锁密码
              this.$router.push({
                name: "DoorKey"
              });
            } else {
              this.isVisitor = true;
            }
          } else {
            this.isVisitor = true;
          }
          if(this.isVisitor) {
            storeSet("SH_RoomControl","VerifyInfo", {})
          }
        }).catch(err => {
          console.log(err);
        })
      }

    },

    // ------------ v2 新增接口 ------------
    // ------ 空调click事件 ------
    // 空调开关控制
    airclick_power: _.throttle(function(){
      let preVal = this.controlSettings.airConditioner.Status.Powered,
          setVal = preVal?0:1
      
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.airConditioner.Id,
        deviceName: '空调',
        cmdId: 1,
        cmdValue: preVal?0:1
      }
      this.controlSettings.airConditioner.Status.Powered = setVal
      changeDeviceStatusV2(option)
      .then(response => {
        if(response.data.Code == 0) {
          // ok
        } else {
          // 失败恢复原先值 
          this.controlSettings.airConditioner.Status.Powered = preVal
        }
      })
      .catch(err => {
        console.log('设置失败')
        this.controlSettings.airConditioner.Status.Powered = preVal
      })
    },3000),

    // 空调温度调节
    airclick_minus(){
      let temp = this.controlSettings.airConditioner.Status.Temperature
      if(--temp < 19) {
        temp = 19
      } else {
        this.needApiSet = true  // 原来值就是19，则不能触发watch，也就不需要改变flag标识
      }
      this.controlSettings.airConditioner.Status.Temperature = temp
    },
    airclick_add(){
      let temp = this.controlSettings.airConditioner.Status.Temperature
      if(++temp > 30) {
        temp = 30
      } else {
        this.needApiSet = true  // 原来值就是30，则不能触发watch，也就不需要改变flag标识
      }
      this.controlSettings.airConditioner.Status.Temperature = temp
    },

    // 空调制冷制热模式切换
    airclick_mode(val){
      if(this.controlSettings.airConditioner.Status.WorkMode == val) {
        return
      }
      this.controlSettings.airConditioner.Status.WorkMode = val
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.airConditioner.Id,
        deviceName: '空调',
        cmdId: 3,
        cmdValue: val
      }
      this.deviceControlSet(option)
    },
    // 空调风速调节
    airclick_wind(){
      let windspeed = this.controlSettings.airConditioner.Status.VentilationSpeed;
      if(++windspeed > 3) {
        windspeed = 0;
      }       
      // suyu不支持 自动速 0
      if(windspeed == 0) {
        windspeed = 1;
      }
      this.needApiSet = true
      this.controlSettings.airConditioner.Status.VentilationSpeed = windspeed
    },

    // ------ 灯光click事件 ------
    lightclick_powerall(){
      let val = this.controlSettings.light.Status.Powered?0:1
      this.controlSettings.light.Status.Powered = val
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.light.Id,
        deviceName: '全控',
        cmdId: 1,
        cmdValue: val
      }
      this.deviceControlSet(option);
      this.syncAllLightStatus() // 同步单独灯光设备状态，TODO需要接口调用成功后，才同步，其实
    },
    // 单控
    lightclick_powerSingle(name){
      
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,                
        cmdId: 1,        
      }
      switch(name){
        case 'aisle': {
          let val = this.controlSettings.light.lights.aisle.Status.Powered = this.controlSettings.light.lights.aisle.Status.Powered?0:1
          option.deviceName = '廊灯'
          option.deviceId = this.controlSettings.light.lights.aisle.Id
          option.cmdValue = val
          }
          break;
        case 'read': {
            let val = this.controlSettings.light.lights.read.Status.Powered = this.controlSettings.light.lights.read.Status.Powered?0:1
            option.deviceName = '书桌灯'
            option.deviceId = this.controlSettings.light.lights.read.Id
            option.cmdValue = val
          }
          break;
        case 'bed':{
            let val = this.controlSettings.light.lights.bed.Status.Powered = this.controlSettings.light.lights.bed.Status.Powered?0:1
            option.deviceName = '书桌灯'
            option.deviceId = this.controlSettings.light.lights.bed.Id
            option.cmdValue = val
          }
          break;
        case 'bath':{
            let val = this.controlSettings.light.lights.bath.Status.Powered = this.controlSettings.light.lights.bath.Status.Powered?0:1
            option.deviceName = '书桌灯'
            option.deviceId = this.controlSettings.light.lights.bath.Id
            option.cmdValue = val
          }
          break;
        case 'wind':{
            let val = this.controlSettings.light.lights.wind.Status.Powered = this.controlSettings.light.lights.wind.Status.Powered?0:1
            option.deviceName = '书桌灯'
            option.deviceId = this.controlSettings.light.lights.wind.Id
            option.cmdValue = val
          }
          break;
        default: console.log('unkown light device detected');return;                                          
      }
      this.deviceControlSet(option);  // 统一设置灯光
      this.checkAllLightStatus()
    },

    // ------ 窗帘click事件 ------
    curtainclick_open(){      
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.curtain.Id,
        deviceName: '窗帘',
        cmdId: 1,
        cmdValue: 0 // 开
      }
      this.deviceControlSet(option);
    },
    curtainclick_close(){
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.curtain.Id,
        deviceName: '窗帘',
        cmdId: 1,
        cmdValue: 1 // 关
      }
      this.deviceControlSet(option);
    },
    curtainclick_pause(){
      // TODO 
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.curtain.Id,
        deviceName: '窗帘',
        cmdId: 1,
        cmdValue: 2 // 暂停
      }
      this.deviceControlSet(option);
    },
    btnTouchStart(idx){
      console.log('btnTouchStart')
      this.btnSelectId = idx
    },
    btnTouchEnd(){
      console.log('btnTouchEnd')
      this.btnSelectId = null
    },

    // ------ 音响click事件 ------
    musicclick_prev(){
      // 计算前一首索引
      if (this.recentPlayIdx == 0) {
        this.recentPlayIdx = 9
      } else {
        this.recentPlayIdx--
      }
      this.refreshMusicStatus(false) // 更新歌曲名称
      this.APIPlayMusic()  // 接口调用
    },
    musicclick_next(){
      // 计算下一首索引
      if (this.recentPlayIdx == 9) {
        this.recentPlayIdx = 0
      } else {
        this.recentPlayIdx++
      }
      this.refreshMusicStatus(false) // 更新歌曲名称
      this.APIPlayMusic()  // 接口调用
    },
    musicclick_playPause() {
      if(this.controlSettings.music.Status.Status.data.isPlaying == "false") {
        this.refreshMusicStatus(false) // 更新歌曲名称
        this.APIPlayMusic()  // 接口调用
      } else {
        this.APIPlayPauseMusic()
      }
    },
    // ------------ 接口 ------------
    // 温度
    APISetTemp: _.debounce(function() {      
      this.needApiSet = false
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.airConditioner.Id,
        deviceName: '空调',
        cmdId: 2,
        cmdValue: this.controlSettings.airConditioner.Status.Temperature
      }
      this.deviceControlSet(option);
    }, 1000),
    // 风速
    APISetWindSpeed: _.debounce(function() {
      this.needApiSet = false
      let option = {
        MemberId: this.userInfo.MemberId,
        roomId: this.userInfo.RoomId,
        deviceId: this.controlSettings.airConditioner.Id,
        deviceName: '空调',
        cmdId: 4,
        cmdValue: this.controlSettings.airConditioner.Status.VentilationSpeed
      }
      this.deviceControlSet(option);
    }, 800),

    // ------ 音乐 ------
    APISetMusicVolume: _.debounce(function(){
        console.log('APi Set Volume ----')
        if(this.volumeCopy) {
          this.volumeCopy = false
          return 
        }
        let option = {
          MemberId: this.userInfo.MemberId,
          roomId: this.userInfo.RoomId,
          deviceId: this.controlSettings.music.Id,
          deviceName: '音响',
          cmdId: 6,
          cmdValue: this.controlSettings.music.Status.Status.data.volume
        }

        console.log('set music vol:', option.cmdValue)
        this.deviceControlSet(option);
      }, 600),
    APIPlayMusic: _.debounce(function(){
        // 设置播放内容
        let playName = comfort15minsRandomMusicMap[this.recentPlayIdx].name
        let option = {
          MemberId: this.userInfo.MemberId,
          roomId: this.userInfo.RoomId,
          deviceId: this.controlSettings.music.Id,
          deviceName: '音响',
          cmdId: 1,
          cmdValue: encodeURIComponent(`name=${playName}&folder=001.randomlist`)
        }
        this.deviceControlSet(option).then(res => {
          if(res.data.Code == 0) {
            let ret = JSON.parse(res.data.Content)
            console.log(ret)
            // this.controlSettings.music.Status.Status.data.songName = ret.data.songname
            // this.controlSettings.music.Status.Status.data.isPlaying = "true"
            this.refreshMusicStatus(true);  // 切新歌后，需要更新状态
          } else {
            this.controlSettings.music.Status.Status.data.isPlaying = "false"
          }
        })
      }, 1500),   // 超时时间同步后台限制频率

      APIPlayPauseMusic: _.debounce(function(){
          let option = {
          MemberId: this.userInfo.MemberId,
          roomId: this.userInfo.RoomId,
          deviceId: this.controlSettings.music.Id,
          deviceName: '音响',
          cmdId: 3,
          cmdValue: 0
        }
        this.deviceControlSet(option).then(res => {
          console.log('APIPlayPauseMusic got promise.res')
          console.log(res)
          if(res.data.Code == 0) {
            this.refreshMusicStatus(true);
          }
        })
      }),

    // 设备控制restAPI请求复用
    deviceControlSet(option){
      return changeDeviceStatusV2(option)
        .then(response => {
          if(response.data.Code == 0) {
            // update success
          } else {
            this.utils.toast({msg: "设置失败，请稍后再试"})            
          }
          return response // 交给外部判断
        })
        .catch(err => {
          this.utils.showNetError();
        })
    },

    // --- 叫早相关 ---
    timeChange(val){
      let option = {
        sceneId: this.MorningCall.Id,
        dateTime: val
      };
      openTimeScene(option).then(response => {
        if (response.data.Code == 0) { // TODO ， 可以就替换城code
          this.MorningCall.Enabled = true;
          this.MorningCall.TiggerTime = val;
          this.morningTimeSelect = false;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // click 事件
    onConfirm(){
        return this.MorningCall.Enabled == true ? this.confirmFn(true) : this.confirmFn(false)
    },
    onCancel(){
      return this.MorningCall.Enabled == true ? this.cancelFn(true) : this.cancelFn(false)
    },

    // --- logic ---
    cancelFn(isTrue){
      this.showMorningCall = false;
      if (isTrue) {
        // 已经设置过了，关闭叫早
        let option = {
          sceneId: this.MorningCall.Id
        };

        closeTimeScene(option).then((response) => {
          if (response.data.Success == true) {
            this.MorningCall.Enabled = false;
            this.morningValue = "";
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    confirmFn(isTrue){
      this.showMorningCall = false;
      this.morningTimeSelect = true;
    },
    
    // ------ 辅助逻辑 ------
    
    /** 
     * 刷新music播放信息
     * @para isServerResult {Object} 如果不是服务器端，只要简单同步歌曲信息
     */
    refreshMusicStatus(isServerResult) {
      console.log(`refreshMusicStatus: ${isServerResult}`)
      if(isServerResult) {
        // 计算出歌曲结束时间
        // calcIsPlayingStatus
        // TODO
        this.getDeviceStatus(3)
      } else {
        this.recentPlayMusic = comfort15minsRandomMusicMap[this.recentPlayIdx].displayName
      }
    },
    // 灯光状态同步
    syncAllLightStatus(){
      if(this.controlSettings.light.Status.Powered) {
        // 全部打开
        this.controlSettings.light.lights.aisle.Status.Powered = 1
        this.controlSettings.light.lights.bed.Status.Powered = 1
        this.controlSettings.light.lights.read.Status.Powered = 1
        this.controlSettings.light.lights.bath.Status.Powered = 1
        this.controlSettings.light.lights.wind.Status.Powered = 1
      } else {
        this.controlSettings.light.lights.aisle.Status.Powered = 0
        this.controlSettings.light.lights.bed.Status.Powered = 0
        this.controlSettings.light.lights.read.Status.Powered = 0
        this.controlSettings.light.lights.bath.Status.Powered = 0
        this.controlSettings.light.lights.wind.Status.Powered = 0
      }
    },

    // 单独控制灯光，需要检查是否所有灯光状态都一样，一样时，需要更新powerall状态
    checkAllLightStatus(){
      if (this.controlSettings.light.lights.aisle.Status.Powered == 1
          && this.controlSettings.light.lights.bed.Status.Powered == 1
          && this.controlSettings.light.lights.read.Status.Powered == 1
          && this.controlSettings.light.lights.bath.Status.Powered == 1
          && this.controlSettings.light.lights.wind.Status.Powered == 1) {
        this.controlSettings.light.Status.Powered = 1
      }
      if(this.controlSettings.light.lights.aisle.Status.Powered == 0
          && this.controlSettings.light.lights.bed.Status.Powered == 0
          && this.controlSettings.light.lights.read.Status.Powered == 0
          && this.controlSettings.light.lights.bath.Status.Powered == 0
          && this.controlSettings.light.lights.wind.Status.Powered == 0){        
        this.controlSettings.light.Status.Powered = 0
      }
    },

    // 音乐定时更新状态
    musicRefreshStatusTimer(){
      this.playEndIdx && clearTimeout(this.playEndIdx)
      this.playEndIdx = null
      if(this.controlSettings.music.Status.Status.data.isPlaying == 'true') {
        if(this.isMusicPaused) {
          console.log('paused no need timer')
        } else {
          
          let msgObj = eval('({' + this.controlSettings.music.Status.Status.message + '})')
          let timeDiff = parseInt((msgObj.Duration - msgObj.Position)/1000);  // 时间差
          timeDiff += 5000;
          console.log('need start timer:', timeDiff)
          this.playEndIdx = setTimeout(()=>{
            this.playEndIdx = null
            this.getDeviceStatus(3)
          }, timeDiff)
        }
      }
    },
    modeCalcIcons(item, iconon){
      return {
        icon_mode_sleep: item.Name == '睡眠模式' && !iconon,
        icon_mode_read: item.Name == '阅读模式' && !iconon,
        icon_mode_relax: item.Name == '休闲模式' && !iconon,
        icon_mode_sleepA: item.Name == '睡眠模式' && iconon,
        icon_mode_readA: item.Name == '阅读模式' && iconon,
        icon_mode_relaxA: item.Name == '休闲模式' && iconon,
      }
    }
  },
  //
  watch:{
    // 温度变化后，需要调用设置接口
    'controlSettings.airConditioner.Status.Temperature': function(){      
      if(this.needApiSet) {
        this.APISetTemp()
      }
    },
    'controlSettings.airConditioner.Status.VentilationSpeed': function(){      
      if(this.needApiSet) {
        this.APISetWindSpeed()
      }
    },
    'controlSettings.music.Status.Status.data.volume': function(val){      
      this.volume = parseInt(parseFloat(val)* 100)
      this.APISetMusicVolume()
    },
    // 互相影响
    volume: function(val){      
      this.controlSettings.music.Status.Status.data.volume = val/100
    },
    // 更新音乐显示名称
    'controlSettings.music.Status.Status.data.songName': function(val){
      let idx = _.findIndex(comfort15minsRandomMusicMap, {name:val})
      
      if(idx != -1) {
        this.recentPlayIdx = idx
        this.recentPlayMusic = comfort15minsRandomMusicMap[this.recentPlayIdx].displayName
      }
    },
    
  },
  computed:{
    // 音乐是否暂停
    isMusicPaused: function(){
      if(this.controlSettings.music.Status.Status.message.indexOf('Paused: true') != -1) {        
        return true
      }
      return false
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/common/themeSettings";
.pageWrap{
  background: white;
  //position: fixed;
  //top: 0;left: 0;right: 0; bottom: 0;
}
// 1.
.topEnv {
  box-sizing: border-box;
  padding: 16px 20px 17px 16px;
  background: linear-gradient(135deg, #04b1ba, #7beac7) no-repeat;  
  height: 116px;
  color: white;
  .topLeft {
    flex:1;
    height: 83px;
    justify-content: space-between;
    .welcoming{
      display: inline;
      &.withoutEnv {
        display: block;
      }
    }
  }
  .circleBtn {
    margin-right: 0;
    width: 60px;
    height: 60px;
    background-color: #bdf2ef;
    border-radius: 30px;
    .icon_lock {
      width: 60px;
      height: 60px;
      background: transparent no-repeat center;
      background-size: 100% 100%;
      background-image: url('../../assets/images/roomControl/icon_lock.png') 
    }
  }
}

// 2.
.sceneModeArea{
  margin: 0 16px;
  .title {
    
  }
  .modeBar {
    //margin: 17px 0 0 0; // 24px - 0.5em = 17px
    margin-top: 8px;
    margin-bottom:5px;
    color: #666666;
    &>div{
      flex:1;
      &.modeItem {
        div.modeicon{
          width: 22px;
          height: 20px;
          background: transparent no-repeat center;
          background-size: 100% 100%;
          margin-bottom: 3px;
          &.icon_mode_comfort {
            background-image: url('../../assets/images/roomControl/icon_mode_comfort.png') 
          }
          &.icon_mode_read {
            background-image: url('../../assets/images/roomControl/icon_mode_read.png') 
          }
          &.icon_mode_relax {
            background-image: url('../../assets/images/roomControl/icon_mode_relax.png') 
          }
          &.icon_mode_sleep {
            background-image: url('../../assets/images/roomControl/icon_mode_sleep.png') 
          }
          &.icon_mode_comfortA {
            background-image: url('../../assets/images/roomControl/icon_mode_comfortA.png') 
          }
          &.icon_mode_readA {
            background-image: url('../../assets/images/roomControl/icon_mode_readA.png') 
          }
          &.icon_mode_relaxA {
            background-image: url('../../assets/images/roomControl/icon_mode_relaxA.png') 
          }
          &.icon_mode_sleepA {
            background-image: url('../../assets/images/roomControl/icon_mode_sleepA.png') 
          }
        }
        i {
          &.on {
            color: #25c0b1;
          }
        }

        // i {
        //   font-weight: bolder;
        //   display: inline-block;
        //   line-height: 2em;
        //   border-bottom: 2px solid transparent;
        //   &.on{
        //     border-bottom-color: #25c0b1;
        //     color: #25c0b1;
        //   }
        // }
      } 
    }
  }
}

// 3.
.deviceArea {
  margin: 16px;
  // 3.1
  .deviceIcon {
    height: 272px;
    justify-content: space-around;
    li {
      width: 32px;
      height: 32px;
      background: transparent no-repeat center;
      background-size: 100% 100%;
      &.icon_air{
        background-image: url('../../assets/images/roomControl/icon_air.png');
        &.on{
          background-image: url('../../assets/images/roomControl/icon_airA.png');
        }
      }
      &.icon_curtain{
        background-image: url('../../assets/images/roomControl/icon_curtain.png');
        &.on{
          background-image: url('../../assets/images/roomControl/icon_curtainA.png');
        }
      }
      &.icon_light{
        background-image: url('../../assets/images/roomControl/icon_light.png');
        &.on{
          background-image: url('../../assets/images/roomControl/icon_lightA.png');
        }
      }
      &.icon_music{
        background-image: url('../../assets/images/roomControl/icon_music.png');
        &.on{
          background-image: url('../../assets/images/roomControl/icon_musicA.png');
        }
      }
    }
  }

  // 3.2
  .devicePanel {
    flex: 1;
    // 控制面板
    li {
      margin-left: 29px;
      box-sizing: border-box;
      padding: 24px 22px;
      box-shadow: 0 0 8px #c3d8d5;
      height: 100%;
      border-radius: 8px;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        //z-index: -1;
        left:-5px;
        //top: 30px;
        width:  0;
        height: 0;
        border-style: solid;
        border-width:5px;
        border-color:#fff #fff transparent transparent;        
        display: inline-block;
        transform: rotate(225deg);
        box-shadow: 2px -2px 3px #c3d8d5;
      }
      /* TODO 根据flex个数，动态计算top值 */
      &.air::before{
        top: 30px;  
      }
      &.light::before{
        top: 100px;  
      }
      &.curtain::before{
        top: 168px;  
      }
      &.music::before{
        top: 238px;  
      }
    }
    // 空调面板
    .air, .light, .curtain, .music {
      .row1, .row2, .row3 {
        justify-content: space-between;
      }
      .row2 {
        margin-top: 32px;
      }
      .row3 {
        margin-top: 12px;
        height: 60px;
      }
    }
    // music需要特殊布局
    .music {
      // row1
      .musicName {
        flex: 1;
        justify-content: flex-end;
        margin-right: 10px;
        .icon_musicTip {
          
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background: transparent no-repeat center center;
          background-size: 100% 100%;
          background-image: url('../../assets/images/roomControl/icon_musicTip.png');
        }
      }

      // row3
      .icon_vol_up, .icon_vol_down {
        width: 22px;
        height: 22px;
        background: transparent no-repeat center center;
        background-size: 100% 100%;
      }
      .icon_vol_up {
        background-image: url('../../assets/images/roomControl/icon_vol_up.png');
      }
      .icon_vol_down {
        background-image: url('../../assets/images/roomControl/icon_vol_down.png');
      }
      .volrange {
        flex: 1;
      }
    }

    // 所有设备的图标显示规则, <i> 只能用于控制面板中显示按钮、文字等child成员
    i {
      display: block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      background: transparent no-repeat center;      
      background-size: 100% 100%; 
      border-radius: 30px;
      &.btnPressed{
        box-shadow: 0 0 10px @themeColor;
      }
      &.btn_on {
        background-image: url('../../assets/images/roomControl/btn_on.png');
      }
      &.btn_off {
        background-image: url('../../assets/images/roomControl/btn_off.png');
      } 
      &.btn_minus {
        background-image: url('../../assets/images/roomControl/btn_minus.png');
      }
      &.btn_add {
        background-image: url('../../assets/images/roomControl/btn_add.png');        
      }
      &.btn_cold {
        background-image: url('../../assets/images/roomControl/btn_cold.png');
      }
      &.btn_coldA {
        background-image: url('../../assets/images/roomControl/btn_coldA.png');
      }
      &.btn_hot {
        background-image: url('../../assets/images/roomControl/btn_hot.png');
      }
      &.btn_hotA {
        background-image: url('../../assets/images/roomControl/btn_hotA.png');
      } 
      &.btn_wind {
        background-image: url('../../assets/images/roomControl/btn_wind.png');
      }
      &.btn_windA {
        background-image: url('../../assets/images/roomControl/btn_windA.png');
      }
      // 灯光页用图标
      &.btn_light_aisle {
        background-image: url('../../assets/images/roomControl/btn_light_aisle.png');
      }
      &.btn_light_aisleA {
        background-image: url('../../assets/images/roomControl/btn_light_aisleA.png');
      }
      &.btn_light_bed {
        background-image: url('../../assets/images/roomControl/btn_light_bed.png');
      }
      &.btn_light_bedA {
        background-image: url('../../assets/images/roomControl/btn_light_bedA.png');
      }
      &.btn_light_closeall {
        background-image: url('../../assets/images/roomControl/btn_light_closeall.png');
      }
      &.btn_light_openall {
        background-image: url('../../assets/images/roomControl/btn_light_openall.png');
      }
      &.btn_light_read {
        background-image: url('../../assets/images/roomControl/btn_light_read.png');
      }
      &.btn_light_readA {
        background-image: url('../../assets/images/roomControl/btn_light_readA.png');
      }
      &.btn_light_wc {
        background-image: url('../../assets/images/roomControl/btn_light_wc.png');
      }
      &.btn_light_wcA {
        background-image: url('../../assets/images/roomControl/btn_light_wcA.png');
      }
      &.btn_wc_wind {
        background-image: url('../../assets/images/roomControl/btn_wc_wind.png');
      }
      &.btn_wc_windA {
        background-image: url('../../assets/images/roomControl/btn_wc_windA.png');
      }

      // 窗帘页面
      &.btn_curtain_open {
        background-image: url('../../assets/images/roomControl/btn_curtain_open.png');
      }
      &.btn_curtain_openA {
        background-image: url('../../assets/images/roomControl/btn_curtain_openA.png');
      }
      &.btn_curtain_close {
        background-image: url('../../assets/images/roomControl/btn_curtain_close.png');
      }
      &.btn_curtain_closeA {
        background-image: url('../../assets/images/roomControl/btn_curtain_closeA.png');
      }
      &.btn_pause {
        background-image: url('../../assets/images/roomControl/btn_pause.png');
      }
      &.btn_pauseA {
        background-image: url('../../assets/images/roomControl/btn_pauseA.png');      
      }

      // 音乐
      &.btn_music_prev {
        background-image: url('../../assets/images/roomControl/btn_music_prev.png');  
      }
      &.btn_music_prevA {
        background-image: url('../../assets/images/roomControl/btn_music_prevA.png');  
      }
      &.btn_music_next {
        background-image: url('../../assets/images/roomControl/btn_music_next.png');  
      }
      &.btn_music_nextA {
        background-image: url('../../assets/images/roomControl/btn_music_nextA.png');  
      }
      &.btn_play {
        background-image: url('../../assets/images/roomControl/btn_play.png');  
      }
      &.btn_playA {
        background-image: url('../../assets/images/roomControl/btn_playA.png');  
      }         
    }
  }
}
// 4. 更多服务
.moreServiceArea {
  margin: 0 16px;
  .servieTag {
    margin-top: 10px;
    li {      
      border: 1px solid @colorV2Border;
      border-radius: 4px;
      width: 80px;
      height: 32px;
      line-height: 32px;
      font-size: @ftSize-normal;
      text-align: center;
      margin-right: 12px;
    }
  }
  padding-bottom: 30px;
}

// 5. 未登录蒙层
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 499;
  width: 100%;
  height: 100%;
}
</style>