<template>
<div>
    <nav class="cus-uncheckedColor borderBot">酒店设施</nav>
    <article>
        <div class="iconClass cus-flexrow borderBot" @click="details">
            <div v-for="(ico, idx) in serviceIconList" v-if="idx < 5">
                <icon :name="ico.icon.name" :scale="ico.icon.size*18"></icon>
            </div>
            <div>
                <img src="@/../static/images/more.png" width="16px" height="16px" />
            </div>
        </div>
        <div v-if="message" class="message cus-normal cus-ftColorBlack2">{{message}}</div>
    </article>
</div>
</template>
<script>
export default {
    props: {
      message: {
        type: String
      }
    },
    computed: {
        serviceIconList(){
            return this.$store.getters.hotelInfo_serviceIcons
        }
    },
    methods: {
        details(){
            this.$router.push({
            name: 'FacilitiesDetails'
            })
        }
    }
}
</script>
<style lang='less' scoped>
@import '../../styles/common/themeSettings.less';
nav {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    font-size: @ftSize-normal;
    background-color: @panelColor;
}
article {
    background-color: @panelColor;
    padding: 0 20px;
    margin-bottom: 10px;
    .iconClass {
        height: 64px;
        flex: 1;
        div {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
        }
    }
    .message {
        padding: 24px 0 28px 0;
    }
}
</style>