<template>
<div style="height: 208px">
  <img :src="storageImg?storageImg:'http://externalimage.qiniu.beyondh.com/62_20171106134452.jpg'" height="100%" width="100%" />
</div>
</template>

<script>
  import {storeGet} from "@/utils/localStorage";
  export default {
    name: 'Banner',
    data(){
      return {
        storageImg: storeGet('smartHotel', 'hotelChooseImg')
      }
    }
  }
</script>
