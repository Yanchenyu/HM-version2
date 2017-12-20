<template>
  <div class="extraTips cus-small">
    <div class="flexGroup" v-for="item in roomDetailXDialogRequireData.extraTips">
      <div class="flex3span name">{{item.Name}}:</div>
      <div class="flex9span content">{{item.Content}}</div>
    </div>
    <div class="flexGroup" v-for="item in roomDetailXDialogRequireData.extraStrongTips ">
      <div class="flex3span ">
        <span class="roomType cus-themeColor">{{item.Name}}:</span>
      </div>
      <div class="flex9span content">{{item.Content}}</div>
    </div>
  </div>
</template>

<script>
  const initData = {
    extraTips: [],      // 模块3 补充提示
    extraStrongTips: [] // 模块3 补充提示[强调类型]
  }
  export default {
    props: {
      roomDetailXDialogRequireData: {
        type: Object,
        default: initData
      }
    },
    name: 'RoomDetailXDialogRequire',
    methods: {}
  }
</script>

<style lang="less" scoped>
  @import '../../../styles/common/themeSettings.less';
  // 说明
  .extraTips {
    padding: 0 12px 0 12px;
    text-align: left;
    .roomType {
      border-radius: 3px;
      font-weight: 700;
    }
    .content {
      font-size: @ftSize-small;
      color: #484848;
      line-height: 17px;
    }
    .name {
      font-weight: 700;
    }
  }
</style>
