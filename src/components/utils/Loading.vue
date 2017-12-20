<template>
    <div class="bg cus-flexrow-center" v-show="loading">
        <spinner type="ripple" :size="'50px'" style="stroke: #25c0b1;fill: #25c0b1;"></spinner>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {Spinner} from 'vux'
export default {
    components:{
        Spinner
    },
    computed: {
        ...mapState({
            loading: state => state.loading
        })
    }
}
</script>
<style lang='less' scoped>
@import "../../styles/common/themeSettings";
.bg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    z-index: 999999;
    background-color: rgba(255,255,255,1);
    text-align: center;
}
</style>