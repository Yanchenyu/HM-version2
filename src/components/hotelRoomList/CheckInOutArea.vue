<template>
  <div id="chooseDate">
    <group gutter="10px">
      <div class="cus-flexrow groupInner">
        <div class="cus-flexrow chooseDateTime">
          <div class="liveIn cus-flexcolumn">
            <div class="cus-normal cus-uncheckedColor cus-flexrow-center">入住</div>
            <div class="cus-flexrow liveInDate" @click="showCalIn">
              <div class="cus-huge standardLine">{{checkInFormat.month + 1}}月{{checkInFormat.date}}日</div>
              <div class="today cus-small cus-ftColorBlack3 standardLine">{{calcDateAliasName(checkInDate)}}</div>
            </div>
          </div>
          <div class="nighty cus-flexrow">
            <div class="cus-normal cus-ftColorBlack2 standardLine daycount cus-flexrow-center">{{daycount}}晚</div>
          </div>
          <div class="liveOut cus-flexcolumn">
            <div class="cus-normal cus-uncheckedColor cus-flexrow-center">离店</div>
            <div class="cus-flexrow liveOutDate" @click="showCalOut">
              <div class="cus-huge standardLine">{{checkOutFormat.month + 1}}月{{checkOutFormat.date}}日</div>
              <div class="otherday cus-small cus-ftColorBlack3 standardLine">{{calcDateAliasName(checkOutDate)}}</div>
            </div>
          </div>

        </div>
      </div>
    </group>
  </div>
</template>
<script>
  import {Group, Cell, Flexbox, FlexboxItem} from 'vux'
  import {calcDayscount, calcDateAliasName} from '@/utils/timeUtil.js'

  import {mapState} from 'vuex'

  export default {
    name: 'CheckInOutArea',
    data() {
      return {
        scrolled: false
      }
    },
    components: {
      Group, Cell,
      Flexbox, FlexboxItem
    },
    mounted () {

    },
    methods: {
      // 显示入住价格日历
      showCalIn: function () {
        this.$store.dispatch('setPosition', 'absolute');
        if (this.$store.state.hotelRoomList.calendar.checkStatus == "out" || this.$store.state.hotelRoomList.calendar.checkStatus == "") {
          this.$store.dispatch('setPopupShow', false)
        } else {
          this.$store.dispatch('setPopupShow', true)
        }
        this.$emit('showCalIn');
      },
      // 显示离店价格日历
      showCalOut: function () {
        this.$store.dispatch('setPosition', 'absolute');
        if (this.$store.state.hotelRoomList.calendar.checkStatus == "in" || this.$store.state.hotelRoomList.calendar.checkStatus == "") {
          this.$store.dispatch('setPopupShow', false)
        } else {
          this.$store.dispatch('setPopupShow', true)
        }
        this.$emit('showCalOut')
      },
      calcDateAliasName: function (dateStr) {
        return calcDateAliasName(dateStr);
      },
      handleScroll () {
        this.scrolled = window.scrollY > 0;
      }

    },
    computed: {
      ...mapState({
        checkInDate: state => state.hotelRoomList.calendar.checkIn,
        checkOutDate: state => state.hotelRoomList.calendar.checkOut,
      }),

      // 入住晚上数
      daycount: function () {
        return calcDayscount(this.checkInDate, this.checkOutDate);
      },
      // 入住日期格式成年，月，日
      checkInFormat: function () {
        var time = new Date(this.checkInDate)
        return {year: time.getFullYear(), month: time.getMonth(), date: time.getDate()}
      },
      // 离店日期格式成年，月，日
      checkOutFormat: function () {
        var time = new Date(this.checkOutDate)
        return {year: time.getFullYear(), month: time.getMonth(), date: time.getDate()}
      },
      // ^^^
    }

  }
</script>

<style lang="less" scoped>
@import '../../styles/common/themeSettings.less';
  @rowheight: 64px;
.groupInner {
  margin-left: 16px;
  margin-right:16px;
}

.calendarIcon {
  margin-right:10px;
}

.inblock {
  line-height: 1.2em
}


.chooseDateTime {
  justify-content: space-between;
  width: 100%;
  margin-top:20px;
  margin-bottom:24px;
  align-items: flex-end;
  .liveIn {
    justify-content: space-between;
    height: 40px;
    .liveInDate {
      align-items: flex-end;
      .today {
        margin-left: 4px;
      }
    }
  }
  .liveOut {
    justify-content: space-between;
    height: 40px;
    .liveOutDate {
      flex-direction: row-reverse;
      align-items: flex-end;
      .otherday {
        margin-right: 4px;
      }
    }
  }
  .nighty {
    .daycount {
      border: 0.7px solid #999999;
      border-radius: 16px;
      padding: 2px 4px;
    }
  }
}

.turnRightIcon {
  margin-bottom: 0.5px;
}

// .nighty div {
//   padding-top:24px;
// }

</style>
