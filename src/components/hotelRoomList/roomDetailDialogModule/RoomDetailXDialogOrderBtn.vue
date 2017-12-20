<template>
  <div class="orderwrap cus-flexrow">
    <div class="prcicewrap" style="flex:1; ">
      <span><span v-if="oneNight" :class="{'payText':roomDetailXDialogOrderBtnData.fullHouse}">均价&nbsp;</span></span>
      <span
        :class="{'cus-priceColor': !roomDetailXDialogOrderBtnData.fullHouse, 'payText': roomDetailXDialogOrderBtnData.fullHouse}">¥{{roomDetailXDialogOrderBtnData.price}}</span>
    </div>

    <div :class="{'orderbtn':true,'orderFull':roomDetailXDialogOrderBtnData.fullHouse}" style="flex:1;"
         @click="bookOrder">
      <span>预订</span>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {calcDayscount, calcDateAliasName} from '@/utils/timeUtil.js'

  const initData = {
    price: 0,            // 房间价格
    fullHouse: false
  }
  export default {
    name: 'RoomDetailXDialogOrderBtn',
    props: {
      roomDetailXDialogOrderBtnData: {
        type: Object,
        default: initData
      },
      thisStyle: {
        type: Object
      }
    },
    computed: {
      ...mapState({
        checkInDate: state => state.hotelRoomList.calendar.checkIn,
        checkOutDate: state => state.hotelRoomList.calendar.checkOut,
      }),
      oneNight(){
        return calcDayscount(this.checkInDate, this.checkOutDate) == 1 ? false : true
      }
    },
    data(){
      return {}
    },
    methods: {
      bookOrder() {
        console.log('hi Yo wanna buy?', this.$router)
        if (!this.roomDetailXDialogOrderBtnData.fullHouse) {
          this.$emit('closeDialog') // 通知外层关闭详情弹层
          this.$router.push({
            name: 'book2page',
            params: {}
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../styles/common/themeSettings.less';

  .orderwrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    text-align: center;
    font-size: 17px;
    .prcicewrap {
      line-height: 48px;
      border-top: 0.7px solid #ebebeb;
    }
    .orderbtn {
      background-color: @themeColor;
      color: #ffffff;
      line-height: 48px;
    }
    .orderFull {
      background-color: #ccc;
    }
  }

  .payText {
    color: #ccc;
  }
</style>
