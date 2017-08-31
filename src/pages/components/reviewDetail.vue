<template>
    <div class="container">
        <div class="helpDetailTop">
            <div class="line">
                <span class="des">{{helpDetail.KNBZMC}}</span>
                <span class="money">￥{{helpDetail.JE}}</span>
            </div>

            <div class="line">
                <span class="people">{{helpDetail.XDRS}}个名额，{{helpDetail.YSQRS}}人已申请</span>
                <span class="moneyDes">{{helpDetail.JELXMC}}</span>
            </div>
        </div>

        <div class="moreInfo" @click="moreInfo">
            <span>更多信息</span>
            <div class="director">
                <i class="iconfont pass">&#xe79e;</i>
            </div>
        </div>

        <div class="step-div">
            <div class="sectionHeader">
                <span>审核流程</span>
            </div>
            <div class="title-bottom-line"></div>
            <div class="check-steps-div">
                <div class="step-item-div" v-for="step in logInfo">
                    <div class="status-item-time">
                        <span v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">{{ step.SHYJ[0].SHSJ }}</span>
                    </div>
                    <div class="status-item-left">
                        <img src="../../assets/waiting.png" v-if="step.DQZTDM === DQSHZT">
                        <i class="iconfont status-icon-refused"
                           v-else-if="step.SHYJ !== undefined && step.SHYJ.length > 0 && refused">&#xe67a;</i>
                        <i class="iconfont status-icon-pass" v-else-if="step.PX < curPX || curPX === 0">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe672;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text">{{ step.DQZTDM_DISPLAY }}</span>
                        <div v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">
                            <span class="opinion-text">审核人：{{ step.SHYJ[0].SHR }}</span>
                            <span class="opinion-text">审核意见：{{ step.SHYJ[0].SHYJ }}</span>
                        </div>
                    </div>
                </div>
                <div class="step-item-div">
                    <div class="status-item-time">
                        <span></span>
                    </div>
                    <div class="status-item-left-end">
                        <i class="iconfont status-icon-pass" v-if="DQSHZT === '99'">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe672;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text">已通过</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    body {
        background-color: #ff0000;
    }

    .helpDetailTop {
        width: 100%;
        height: 80PX;
        background-color: white;
        border-bottom: solid 1PX #e8e8e8;
    }

    .helpDetailTop .line {
        width: 100%;
        height: 50%;
    }

    .helpDetailTop .line .des {
        display: inline-block;
        line-height: 100%;
        font-size: 16PX;
        color: #000000;
        padding-left: 10PX;
        padding-top: 10PX;
    }

    .helpDetailTop .line .money {
        float: right;
        font-size: 16PX;
        color: #fc2f00;
        padding-top: 10PX;
        padding-right: 10PX;
        line-height: 100%;
    }

    .helpDetailTop .line .people {
        display: inline-block;
        line-height: 100%;
        font-size: 10PX;
        padding-left: 10PX;
        padding-top: 10PX;
    }

    .moneyDes {
        float: right;
        font-size: 10PX;
        padding-top: 10PX;
        line-height: 100%;
        padding-right: 10PX;
        color: #92969c;
    }

    .moreInfo {
        width: 100%;
        height: 44PX;
        background: white;
        margin-top: 20PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .moreInfo span {
        display: inline-block;
        width: 200PX;
        height: 100%;
        line-height: 100%;
        font-size: 16PX;
        padding: 14PX 10PX;
    }

    .director {
        display: inline-block;
        width: 44PX;
        height: 100PX;
        float: right;
        /*font-size: 20PX;*/
    }

    .pass {

        font-size: 30PX;
        color: #d3d3d3;
        line-height: 44PX;
    }

    .step-div {
        padding-left: 10PX;
        border-top: solid 1PX #e8e8e8;
        margin-top: 20PX;
    }

    .sectionHeader {
        width: 100%;
        background-color: white;
    }

    .sectionHeader span {
        display: block;
        width: 100%;
        font-size: 16PX;
        padding: 10PX 10PX 10PX 0PX;
    }

    .check-steps-div {
        width: 100%;
        background-color: white;
        border-bottom: solid 1PX #e8e8e8;
        margin-top: 10PX;
    }

    .step-item-div {
        width: 100%;
        height: 70PX;
        text-align: left;
    }

    .status-item-time {
        display: inline-block;
        vertical-align: top;
        text-align: right;
        width: 80PX;
        font-size: 12PX;
        color: #92969c;
    }

    .status-item-left {
        display: inline-block;
        height: 100%;
        padding-right: 15PX;
        border-right: solid 1PX #e8e8e8;
        position: relative;
    }

    .status-item-left i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-left img {
        width: 20PX;
        height: 20PX;
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-right {
        display: inline-block;
        margin-left: 10PX;
        vertical-align: top;
    }

    .step-text {
        display: block;
        text-align: left;
        font-size: 15PX;
    }

    .opinion-text {
        display: block;
        font-size: 12PX;
        color: #92969c;
    }

    .status-icon-pass {
        font-size: 20PX;
        color: #06c1ae;
        background-color: white;
    }

    .status-icon-refused {
        font-size: 20PX;
        color: #ff571a;
        background-color: white;
    }

    .status-icon-dot {
        font-size: 20PX;
        color: #e8e8e8;
        background-color: white;
    }

    .status-item-left-end {
        display: inline-block;
        height: 100%;
        padding-right: 15PX;
        position: relative;
    }

    .status-item-left-end i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .title-bottom-line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>
<script>
    import {Cell} from 'mint-ui'
    import globKey from '../../globKey.js'
    export default{
        created(){
            SDK.setTitleText('审核详情');

            this.obj = this.$route.query.item;

            //请求申请详情数据
            let requestUrl = globKey.yuMing + globKey.getPoorTypeDetails + '?IDENTITY_ID=' + globKey.identityID + '&KNBZDM=' + this.$route.query.KNBZDM + '&KNBZDJDM=' + this.$route.query.KNBZDJDM;
            this.$http.get(requestUrl).then(res => {
                return res.json();
            }).then(res => {
                this.helpDetail = res.datas;
            });

            //请求审核流程
            let logInfoUrl = globKey.yuMing + globKey.getStuApplyLogInfo + '?IDENTITY_ID=' + globKey.identityID + '&SQBM=' + this.$route.query.SQBM + '&KNBZDM=' + this.$route.query.KNBZDM;
            this.$http.get(logInfoUrl).then(res => {
                return res.json();
            }).then(res => {
                this.logInfo = res.datas;
                this.getCurrentPX(this.DQSHZT);
            });
        },
        methods: {
            moreInfo: function () {
                this.$router.push({
                    path: '/reviewMoreInfo',
                    query: {
                        KNBZDM: this.$route.query.KNBZDM,
                        KNBZDJDM: this.$route.query.KNBZDJDM,
                        SQBM: this.$route.query.SQBM
                    }
                });
            },
            getCurrentPX: function (curSHZT) {
                if (curSHZT.indexOf('-') === 0) {
                    this.refused = true;
                    curSHZT = curSHZT.substr(1, curSHZT.length);
                }
                for (var i = 0; i < this.logInfo.length; i++) {
                    if (curSHZT === this.logInfo[i].DQZTDM) {
                        this.curPX = this.logInfo[i].PX;
                    }
                }
            }
        },
        data(){
            return {
                msg: 'hello vue',
                obj: {},
                helpDetail: {},
                logInfo: [],
                DQSHZT: this.$route.query.DQSHZT,
                DQSHZT_DISPLAY: this.$route.query.DQSHZT_DISPLAY,
                curPX: 0
            }
        },
        components: {
            [Cell.name]: Cell
        },
    }
</script>
