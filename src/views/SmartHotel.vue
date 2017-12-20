<!-- 智慧酒店页面 -->
<template>
  <div>
    <div class="headerTop" :class="{weixin:is_weixin}"></div>
    <header class="cus-flexrow" :class="{weixin:is_weixin}">
        <section :class="{localCity:index==num,recommandCity:index!=num}" @click="chooseCity(num)" v-for="(item,num) in cityArr">{{item}}</section>
        <section class="recommandCity moreArea cus-flexrow" @click="jumpToCity">
          更多城市
        </section>
    </header>
    <article :class="{weixin:is_weixin}">
          <section class="smartBanner" v-for="(item,index) in hotelList">
            <div class="banner" @click="jumpToHotel(item.HotelNo, item.BannerList[0])">
              <img :src="item.BannerList[0]" width="100%" height="192px" />
            </div>
            <div class="hotelMes">
              <div class="hotelDes cus-flexrow">
                <div class="hotelName cus-huge standardLine">{{item.HotelName}}</div>
                <div class="hotelPrice cus-flexrow" @click="jumpToHotel(item.HotelNo, item.BannerList[0])">
                  <div class="lowestPrice cus-huge cus-priceColor standardLine">¥{{item.LowestPrice}}</div>
                  <div class="lowestText standardLine">起</div>
                </div>
              </div>
              <div class="hotelContact cus-normal">
                <div @click="goHotel(item.shp_Latitude_Gd,item.shp_Longitude_Gd,item.HotelName)" v-if="item.LocationArea.trim()!==''" class="address standardLine cus-flexrow">{{item.LocationArea}}</div>
              </div>
            </div>
            <!--<div v-if="index==notAnyMore" class="notAnyMore cus-small cus-ftColorBlack3">没有更多智慧酒店</div>-->
          </section>
    </article>
    <div v-show="noHotel" class="noHotel cus-small cus-ftColorBlack3">还没有智慧酒店</div>
  </div>
</template>
<script>
  import Banner from '@/components/smartHotel/Banner.vue'
  import {fetchHotelInfoAxios,getHotelList} from '@/services/axiosapi'
  // vuex
  import {mapState} from 'vuex'
  import {is_weixin} from '@/utils/device'
  import {storeSet} from "@/utils/localStorage";
  export default {
    components: {
      Banner
    },
    name: 'SmartHotel',
    beforeRouteEnter(to, from, next){
      // 通过 `vm` 访问组件实例
      next(vm => {
        // 酒店选择页面时，需要提前销毁酒店房型列表组件
        vm.$store.dispatch("keepAlivePageDel", 'HotelRoomList');
      })
    },
    beforeMount () {
      this.$store.dispatch("setMapurl", "");
      if(this.localCity==""){
        //初始加载页面的时候或者刷新
        // this.getLocation();
        //请求所有数据
        this.$store.dispatch("setLocalCity","苏州");
        this.getLocalHotelList("苏州");
        this.getAllHotelCity();
      }else{
        //此时已经有了选择城市
        this.checkHotelInfoExist(this.localCity);
      };

    },
    data () {
      return {
        loading: false,
        hotelList: [],
        index: 0,
        cityArr: ['苏州','上海','北京','深圳','厦门'],
        noHotel: false,
        notAnyMore: 0,
        is_weixin: is_weixin()
      }
    },
    computed: {
      ...mapState({
        localCity: state => state.smartHotel.chooseCity,
        hotelAllList: state => state.smartHotel.hotelAllList
      })
    },
    methods: {
      getLocalHotelList(cityName){
          let option = {
             CityName: cityName
          };

          getHotelList(option).then(response => {
              if(response.data.ResultCode=='0'){
                 this.hotelList = response.data.Data;
                 if(this.hotelList.length==0){
                    this.noHotel = true;
                 }else{
                    this.noHotel = false;
                    this.notAnyMore = this.hotelList.length-1;
                 }
              }
          }).catch(err => {
              console.log(err);
          });
      },
      getAllHotelCity(){
        let allOption = {};
        getHotelList(allOption).then(response => {
          if(response.data.ResultCode=='0'){
              this.$store.dispatch("setHotelAllList",response.data.Data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      checkHotelInfoExist(localCity){
                      let isTrue = this.cityArr.every((item) => {
                        return (item!=localCity)
                      });
                      if(isTrue){
                        if(this.cityArr[0]=="苏州"){
                          this.cityArr.unshift(localCity);
                          this.cityArr.pop();
                        }else if(this.cityArr[1]=="苏州"){
                          this.cityArr.shift();
                          this.cityArr.unshift(localCity);
                        };
                        this.$store.dispatch("setLocalCity",localCity);
                        this.getLocalHotelList(localCity);
                      }else{
                        this.cityArr.forEach((item,index) => {
                          if(localCity==item){
                              this.index = index;
                              if(this.hotelAllList.length>0){
                                //如果当前所有城市列表信息不为空的话
                                this.chooseCity(index);
                              }else{
                                //如果为空，则请求一次
                                this.getLocalHotelList(localCity);
                              }
                          }
                        });
                      };
      },
      //此时滚动图片的下标
      changeIndex(num) {
        this.$store.dispatch('changeBannerImgIndex', {value: num});
      },
      chooseCity(index){
        let cityArr = this.cityArr;
        this.index = index;
        let localCity = cityArr[index];
        this.$store.dispatch("setLocalCity",localCity);
        let hotelAllList = this.hotelAllList;
        let newHotelList = hotelAllList.filter(function(item){
          return (item.CityName==localCity)
        });
        this.hotelList = newHotelList;
        if(newHotelList.length==0){
          this.noHotel = true
        }else{
          this.noHotel = false;
          this.notAnyMore = this.hotelList.length-1;
        }
      },
      contact(val){
        window.location.href = 'tel:'+val;
      },
      jumpToCity(){
        this.$router.push({
           name: 'CityNames'
        })
      },
      mapLocation(){
        this.getLocation();
      },
      jumpToHotel(hotelNo, hotelImg){
          this.$store.dispatch("setHotelNo", hotelNo);
          this.$store.dispatch("setHotelImg", hotelImg);
          storeSet('smartHotel', 'hotelChooseImg',hotelImg);
          this.$store.dispatch('setRoomListLoadingShow', true);
          this.$store.dispatch('setRoomListLoadingStart', false);

          this.$router.push({
            name: "hotelroomlist"
          })
      },
      jumpToHowToPlay(hotelNo){
          this.$store.dispatch("setHotelNo",hotelNo);
          this.$router.push({
            name: "HowToPlay"
          })
      },
      goHotel(lat,lng,hotelName){
          let location = {
            'lat': lat,
            'lng': lng
          };
          this.$store.dispatch("setLocation", location);
          let mapurl = "https://uri.amap.com/marker?position="
          + lng + "," + lat
          + "&name=" + hotelName
          + "&src=mypage&coordinate=gaode&callnative=0";
          this.$store.dispatch("setMapurl", mapurl);
          this.$router.push({
            name: "CurrentLocation"
          })
      }
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../styles/common/themeSettings.less';
.headerTop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    &.weixin{
      height:0;
    }
    z-index: 100;
    background-color: @ftColorBlack;
}

header {
  background-color: @panelColor;
  align-items: center;
  position: fixed;
  top: 20px;
  &.weixin{
    top:0;
  }
  left: 0;
  right: 0;
  z-index: 100;
  justify-content: space-between;
  padding: 16px 10px;
  section {
    display: inline-block;
    width: 44px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 13px;
    border-radius: 4px;
  }
  .moreArea {
      width: 80px;
      align-items: center;
  }
  .localCity {
    color: @themeColor;
    border: 1px solid @themeColor;
  }
  .recommandCity {
    color: @ftColorBlack3;
    background-color: @panelColor;
    border: 1px solid @splitColor;
  }
  .mapChoose {
    margin-right: 8px;
    display: inline-block;
    line-height: 0.5em;
  }
  .triangle-down {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid @ftColorBlack3;
    display: inline-block;
  }
}

article {
  margin-top: 82px;
  padding: 0 10px 0.1px 10px;
  background-color: @panelColor;
  &.weixin{
    margin-top:62px;
  }
  .loading {
    text-align: center;
    width: 100%;
    height: 40px;
    display: block;
    img {
      display: inline-block;
    }
  }
  .smartBanner {
    &:not(:first-child) {
      margin-top: 14px;
    }
    .banner {
      width: 100%;
      height: 192px;
      img {
        border-radius: 2px;
      }
    }
  }
  section {
    width: 100%;
    &:last-child {
      margin-bottom: 14px;
    }
    .discount {
      width: 50px;
      height: 30px;
      background-color: @priceColor;
      color: @panelColor;
      position: absolute !important;
      top: 0;
      left: 10px;
      text-align: center;
      line-height: 45px;
      span {
        font-size: 24px;
      }
    }
    .discountBugle {
      position: absolute !important;
      top: 30px;
      left: 10px;
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-top: 15px solid @priceColor;
    }
    .howToPlay {
      width: 50px;
      height: 30px;
      background-color: #fea04c;
      color: @panelColor;
      position: absolute !important;
      top: 0;
      left: 70px;
      text-align: center;
      line-height: 45px;
    }
    .howToPlayBugle {
      position: absolute !important;
      top: 30px;
      left: 70px;
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-top: 15px solid #fea04c;
    }
    .noDisCount {
      left: 10px;
    }
    .hotelMes {
      padding: 14px;
      box-shadow: 0 0 30px @ftColorGray;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      .hotelDes {
        justify-content: space-between;
        align-items: flex-end;
        .hotelName {
          color: #121212;
        }
        .hotelPrice {
          align-items: flex-end;
          .lowestPrice {
            font-weight: 500;
          }
          .lowestText {
            color: #d0d1d5;
            font-size: 11px;
          }
        }
      }
      .hotelContact {
        // padding-bottom: 14px;
        // margin-bottom: 14px;
        // .telephone {
        //   white-space:nowrap;
        //   margin-top: 8px;
        //   margin-bottom: 5px;
        // }
        .address {
          margin-top: 8px;
          white-space:nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

.noHotel {
  width: 100%;
  margin-top: 100px;
  text-align: center;
}

.notAnyMore {
  margin-top: 10px;
  text-align: center;
}

</style>
