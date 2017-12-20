<template>
  <div class="componentwrap cus-flexrow">
    <div class="hotelMes cus-flexcolumn cus-h1">
      <div class="cus-flexrow">
        <icon name="location" scale="6" class="addressIcon standardLine"></icon>
        <div class="standardLine">{{location}}</div>
      </div>
      <div class="cus-flexrow" @click="contact">
        <icon name="telephone" scale="1.4" class="phoneIcon standardLine"></icon>
        <div class="standardLine">{{phone}}</div>
      </div>
    </div>
    <div class="goThere cus-small" @click="mapiApiSearch">
      <img src="@/../static/images/dzq.png" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'HotelDesc',
    data () {
      return {}
    },
    computed: {
      serviceIconList(){
        return this.$store.getters.hotelInfo_serviceIcons
      },
      ...mapState({
        phone: state => state.hotelRoomList.hotelInfo.Phone,
        location: state => state.hotelRoomList.hotelInfo.Location
      })
    },
    methods: {
      // 跳转至详情页
      details(){
        this.$router.push({
          name: 'FacilitiesDetails'
        })
      },
      // 使用高德地图进行线路规划
      mapiApiSearch() {
        this.$router.push({
          name: 'mapapisearch'
        })
      },
      // 打电话
      contact(){
        window.location.href = 'tel:'+this.phone;
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../styles/common/themeSettings.less';

  @rowHeight: 44px;

  .componentwrap {
    background-color: @panelColor;
    padding: 20px 16px 0 16px;
    justify-content: space-between;
    .hotelMes {
      height: 42px;
      justify-content: space-between;
      margin-bottom: 22px;
      &>div {
        align-items: center;
        &:nth-child(1)>div {
          padding-left: 6px;
        }
        &:nth-child(2) {
          padding-left: 2px;
          &>div {
            padding-left: 4px;
          }
        } 
      }
    }
    .goThere {
      height: 48px;
      width: 36px;
    }
  }
</style>
