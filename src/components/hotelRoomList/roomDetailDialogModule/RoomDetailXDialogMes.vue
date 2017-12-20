<template>
  <div class="quickDesc">
    <div class="title standardLine">
      {{roomDetailXDialogMesData.roomTypeName}}
    </div>
    <div class="cus-normal servicetag cus-flexrow">
      <!-- Flex布局 parent wrap，item flex-basis-->
      <div v-for="item in roomDetailXDialogMesData.serviceList">
        {{item.Content}}
      </div>
    </div>
    <div class="cus-small cus-ftColorBlack3 desc borderBot">
      <span>{{roomDetailXDialogMesData.roomdesc}}</span>
    </div>
  </div>
</template>

<script>
  const initData = {
    roomTypeName: '',
    serviceList: [],
    roomdesc: ''
  }
  export default {
    props: {
      roomDetailXDialogMesData: {
        type: Object,
        default: initData
      }
    },
    name: 'RoomDetailXDialogMes'
  }
</script>

<style lang="less" scoped>
  .quickDesc {
    text-align: left;
    padding: 20px 12px 0 12px;
    min-height: 54px;
    .title {
      padding-bottom: 8px;
      font-size: 17px;
      color: #121212;
      font-weight: 700;
    }
    .servicetag {
      // Flex布局
      flex-wrap: wrap; // Flex布局自动换行
      div {
        margin-right: 10px;
      }
    }
    .desc {
        padding-bottom: 12px;
    }
  }

</style>
