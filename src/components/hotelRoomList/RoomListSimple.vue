<template>
  <div>
      <div class="box2 borderTop" id="box2">
        <div v-for="(item, idx) in roomList" class="itemwrap cus-flexrow" @click="roomDetailShow(idx)">
          <!-- 左半区域 -->
          <div class="leftPart cus-flexrow">
            <!-- 左半区域内的图片 -->
            <img :src='item.Picuture' v-if="trim(item.Picuture)" width="72px" height="72px" />
            <img v-else src="@/../static/images/001.png" width="72px" height="72px" />
            <!-- 左半区域内的右边信息部分 -->
            <div class="leftMes cus-flexcolumn">
              <!-- 左半区域内的右边信息部分的上半部 -->
              <div class="cus-flexcolumn">
                <div class="cus-flexrow">
                  <div class="cus-huge standardLine">{{item.Name}}</div>
                  <div v-if="item.IsRecommended" class="roomType cus-small">推荐</div>
                </div>
                <div class="leftDesc cus-flexrow cus-uncheckedColor cus-small standardLine"><span v-if="item.IsSmartRoom">智慧客房</span>&nbsp{{item.Description}}</div>
              </div>
              <!-- 左半区域内的右边信息部分的下半部 -->
              <div class="cus-huge standardLine cus-priceColor cus-flexrow" :class="{'payText': item.AvalibleRoomCount<=0}">¥{{item.RoomRate}}</div>
            </div>
          </div>
          <!-- 右半区域 -->
          <div class="rightPart cus-flexcolumn">
            <div class="btn-order" @click.stop="toBook2(idx,item.AvalibleRoomCount<=0)">
                  <div class="cus-h1 reserve" v-if="item.AvalibleRoomCount>0">预订</div>
                  <div class="cus-h1 fullHouse" v-if="item.AvalibleRoomCount<=0">满房</div>
                  <div
                    :class="{'cus-small':true,'payType1': item.PayType.Name=='在线支付','payType2': item.PayType.Name=='到店付','payText': item.AvalibleRoomCount<=0}">
                    {{item.PayType.Name == "在线支付" ? "在线付" : "到店付"}}
                  </div>
                </div>
                <div class="remainRoom cus-flexcolumn-center"
                     v-if="item.AvalibleRoomCount <= 2 && item.AvalibleRoomCount > 0">
                  <div>仅剩<span>{{item.AvalibleRoomCount}}</span>间</div>
            </div>
          </div>
        </div>
        <load-more class="loading" tip="努力加载中" v-show="loadingShow"></load-more>
        <p class="noRoom cus-small cus-ftColorBlack3" v-show="!loadingShow"></p>
      </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Scroller, LoadMore} from 'vux'
  import {calcDayscount, calcDateAliasName} from '@/utils/timeUtil.js'
  import {fetchHotelRoomList} from '@/services/axiosapi'
  import {ls_unionId} from '@/utils/localStorage'
  import {is_weixin} from '@/utils/device'
  export default {
    name: 'RoomListSimple',
    components: {
      Scroller,
      LoadMore
    },
    data() {
      return {
        onFetching: false,
        index: 0,
        scrollState: true,
        bounce: false,
        clientHeight: 0,
        roomListShowHeight: 0
      }
    },
    props: {
      roomListLoadingStart: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState({
        roomList: state => state.hotelRoomList.roomList,
        loadingShow: state => state.hotelRoomList.roomLoadingShow,
        roomListHeight: state => state.hotelRoomList.roomListHeight,
        checkInDate: state => state.hotelRoomList.calendar.checkIn,
        checkOutDate: state => state.hotelRoomList.calendar.checkOut,
        scrollTopTrue: state => state.hotelRoomList.scrollTopTrue
      }),
      oneNight(){
        return calcDayscount(this.checkInDate, this.checkOutDate) == 1 ? false : true
      }
    },
    methods: {
      trim(s){
        return s.replace(/(^\s*)|(\s*$)/g, "");
      },
      // 弹层显示房间详细信息
      roomDetailShow (idx) {
        console.log('roomDetailShow', idx)
        this.$store.dispatch('setRoomSelectIdx', {value: idx})
        this.$store.dispatch('setRoomDetailDisplay', {value: true})
      },
      // 跳转预定页
      toBook2 (idx, isTrue) {
        console.log('Yo book1')
        if (!isTrue) {
          this.$store.dispatch('setRoomSelectIdx', {value: idx})
          this.$router.push({
            name: 'book2page'
          })  // 跳转下单页
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  @import '../../styles/common/themeSettings.less';

  @itemheight: 80px; // TODO 所有的变量可以提取到一个文件，方便配置和保存

  .box2 {
    padding: 0 16px;
    background-color: #ffffff;
  }

  .itemwrap {
    padding: 16px 0;
    justify-content: space-between;
    &:not(:first-child) {
      border-top: 0.7px solid #ebebeb;
    }
    .leftPart {
      .leftMes {
        margin: 4px 0 4px 12px;
        justify-content: space-between;
        .roomType {
          width: 32px;
          margin-left: 8px;
          text-align: center;
          border: 0.7px solid @themeColor;
          border-radius: 3px;
          color: @themeColor;
        }
        .leftDesc {
          margin-top: 8px;
        }
      }
    }
    .rightPart {
      margin-top: 12px;
        .btn-order {
          display: inline-block; // TODO weex支持 flex only
          text-align: center;
          border-radius: 5px;
          width: 56px;
          height: 44px;
          .reserve {
            height: 28px;
            line-height: 28px;
            background: @priceColor;
            color: #fff;
            justify-content: center; // flex
            border-radius: 4px;
          }
          .fullHouse {
            height: 28px;
            line-height: 28px;
            background: #d0d1d5;
            color: #fff;
            justify-content: center; // flex
            border-radius: 4px;
          }
          .payType1 {
            color: #bdbdbd;
          }
          .payType2 {
            color: #d0d1d5;
          }
          div:last-child {
            height: 16px;
            justify-content: center; // flex
          }
        }
    }
    // /* 房间列表项icon */
    // img {
    //   margin-right: 10px;
    //   width: 60px;
    //   height: 60px;
    // }
    // /* 房间列表项箭头展开动画效果 */
    // .link-up:after, .link-down:after {
    //   transition: transform 300ms;
    // }
  }

  .leftIcon {
    padding-top: 10px
  }

  .leftDescription {
    flex:1;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .description {
    width:140px;
    line-height:14px;
    margin-top:2px;
    margin-bottom:2px
  }

  /* 标签行 itemwrap detailwrap 共用*/
  .secondrow {
    height: 18px;
    .roomType {
      width: 32px;
      margin-left: 8px;
      text-align: center;
      border: 1px solid @themeColor;
      border-radius: 3px;
      color: @themeColor;
    }
    .smartRoom {
      display: inline-block;
      width: 64px;
      margin-right: 5px;
      text-align: center;
      border-radius: 3px;
      background-color: #25c0b1;
    }
  }

  .pricewrap {
    align-items: center;
    height: 20px;
    margin-top: 14px;
  }



  .btn-full {
    border: 1px solid #ccc;
  }

  .payText {
    color: #ccc
  }

  .noRoom {
    text-align: center;
    margin-top: 12px;
  }

  .roomMes {
    margin-left: 5px;
  }

  .remainRoom {
    font-size: 11px;
    color: #fea04c;
    text-align: center;
  }

</style>
