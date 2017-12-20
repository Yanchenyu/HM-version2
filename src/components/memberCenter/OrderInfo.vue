<template>
  <div class="cus-flexrow bg">
    <div class="cus-flexcolumn" @click="allOrderclick">
      <img src="../../../static/images/memberCenter/qbdd.png" width="32px" height="32px" />
      <div>全部订单</div>
    </div>
    <div class="cus-flexcolumn" @click="noPayOrderclick">
      <img src="../../../static/images/memberCenter/dfk.png" width="32px" height="32px" />
      <div>待付款</div>
    </div>
    <div class="cus-flexcolumn" @click="unUseOrderclick">
      <img src="../../../static/images/memberCenter/drz.png" width="32px" height="32px" />
      <div>待入住</div>
    </div>
    <div class="cus-flexcolumn" @click="usedOrderclick">
      <img src="../../../static/images/memberCenter/sh.png" width="32px" height="32px" />
      <div>售后</div>
    </div>
  </div>
</template>

<script>
  import {Card} from 'vux'
  import {setWechatTitle} from '@/utils/setWechatTitle.js'

  export default {
    name: 'OrderInfo',
    components: {
      Card
    },
    data () {
      return {
        nickname: '张三',
        nameVal: 'mis',
        sexlist: [['男', '女']],
        sexval: ['男'],
        birth: '',
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        totalNumber: '1000',
        energy: '950',
        memberLevel: '黄金搭档',
        email: ''
      }
    },
    methods: {
      allOrderclick(){
        // N,C,P,HC,F,E,R
        this.$router.push({name: 'orderlist', params: {title: '全部订单', orderstatus: 'N,C,P,HC,I,O,E,R,CS', querymode: 0}})
        setWechatTitle('全部订单');
      },
      noPayOrderclick(){
        this.$router.push({name: 'orderlist', params: {title: '待支付订单', orderstatus: "N", querymode: 1}})
        setWechatTitle('待支付订单');
      },
      unUseOrderclick(){
        this.$router.push({name: 'orderlist', params: {title: '待消费订单', orderstatus: 'N,P,HC', querymode: 2}})
        setWechatTitle('待消费订单');
      },
      usedOrderclick(){
        this.$router.push({name: 'orderlist', params: {title: '售后订单', orderstatus: 'O,R,CS', querymode: 3}})
        setWechatTitle('售后订单');
      }
    }
  }
</script>

<style scoped lang="less">
@import '../../styles/common/themeSettings.less';
.bg {
  // justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 16px 0 20px 0;
  height: 88px;
  background-color: @panelColor;
  box-sizing:border-box;
  &>div {
    flex: 1;
    align-items: center;
    justify-content: space-between;
    &>div {
      font-size: 13px;
      color: #484848;
    }
  }
}
</style>
