<template>
    <div>
        <div class="awardItem" @click="goToReviewDetail">
            <div class="awardItemLeft">
                <div class="line">
                    <span class="level">{{items.SQDJ_DISPLAY}}</span>
                    <span class="money">¥{{items.JE}}</span>
                </div>
                <div class="line">
                    <span class="date">申请时间</span><span class="dateToDate">{{items.SQSJ}}</span>
                </div>
            </div>
            <span class="peopleCount pass" v-if="items.SHZT === '99'">{{ items.SHZT_DISPLAY }}</span>
            <span class="peopleCount refused" v-else-if="items.SHZT.indexOf('-') === 0">{{ items.SHZT_DISPLAY }}</span>
            <span class="peopleCount waiting" v-else>{{ items.SHZT_DISPLAY }}</span>
            <div class="director">
                <i class="iconfont">&#xe79e;</i>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .awardItem {
        margin-bottom: 1PX;
        width: 100%;
        height: 80PX;
        border-bottom: solid 1PX #e8e8e8;
        background-color: white;
        position: relative;
    }

    .awardItemLeft {
        display: inline-block;
        width: 90%;
        height: 100%;
        float: left;
    }

    .director {
        display: inline-block;
        width: 10%;
        height: 100%;
        float: right;
    }

    .line {
        width: 100%;
        height: 50%;
    }

    .level {
        display: inline-block;
        line-height: 100%;
        font-size: 16PX;
        color: #000000;
        padding-left: 10PX;
        padding-top: 10PX;
    }

    .money {
        display: inline-block;
        line-height: 100%;
        font-size: 14PX;
        color: #d4461f;
        padding-left: 10PX;
        padding-top: 10PX;
    }

    .peopleCount {
        display: inline-block;
        line-height: 100%;
        font-size: 16PX;
        color: #979797;
        float: right;
        position: absolute;
        top: 35PX;
        right: 26PX;
    }

    .date {
        display: inline-block;
        line-height: 100%;
        font-size: 14PX;
        color: #979797;
        padding-top: 10PX;
        padding-left: 10PX;

    }

    .dateToDate {
        display: inline-block;
        line-height: 100%;
        font-size: 12PX;
        color: #979797;
        padding-top: 10PX;
        padding-left: 10PX;
    }

    .director {
        display: inline-block;
        width: 10%;
        height: 100%;
        float: right;
        font-size: 40PX;
        color: #d3d3d3;
        line-height: 80PX;
    }

    .director > .iconfont {
        font-size: 30PX;
    }

    .pass {
        color: #06c1ae;
    }

    .waiting {
        color: #ffb200;
    }

    .refused {
        color: #ff571a;
    }
</style>
<script>
    export default{
        created(){

        },
        methods: {
            goToReviewDetail: function () {
                this.$router.push({
                    path: '/reviewDetail',
                    query: {
                        KNBZDM: this.items.KNBZDM,
                        KNBZDJDM: this.items.PDDJ,
                        SQBM: this.items.SQBM,
                        DQSHZT: this.items.SHZT,
                        DQSHZT_DISPLAY: this.items.SHZT_DISPLAY
                    }
                });

            }
        },
        data(){
            return {
                msg: 'hello vue',
                data: []
            }
        },

        props: ['items'],

        components: {}
    }
</script>
