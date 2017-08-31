<template>
    <div class="helpDetailContainer">
        <!--//头部-->
        <div class="helpDetailTop">
            <div class="line">
                <span class="des">{{helpDetail.KNBZMC}}</span>
                <span class="money">￥{{helpDetail.JE}}</span>
            </div>

            <div class="line">
                <span class="people">{{helpDetail.XDRS}}个名额，{{helpDetail.YSQRS}}人已申请</span>
                <span class="moneyDes">{{helpDetail.JELXMC}}</span>
            </div>

            <div class="line">
                <span class="dateLimit">{{ residueDay }}天后截止</span>
            </div>

            <div class="border-line"></div>
        </div>

        <div class="topSecond">
            <div><span class="lefSpan">等级</span><span class="rightSpan">{{ helpDetail.DJMC }}</span></div>
            <div><span class="lefSpan">评定学期</span><span class="rightSpan">{{ helpDetail.PDXQ_DISPLAY }}</span></div>
            <div><span class="lefSpan">资金来源</span><span class="rightSpan">{{ helpDetail.ZJLY }}</span></div>
            <div><span class="lefSpan">设立单位</span><span class="rightSpan">{{ helpDetail.SLDW }}</span></div>
        </div>

        <!--//简介-->
        <div class="introduce">
            <div class="header"><span>补助简介</span></div>
            <div class="border-line"></div>
            <span class="introduceContent">{{ helpJJ }}</span>
        </div>
        <button v-if="helpJJ.length > 50" class="more" @click="more()">{{moreOrLess}}</button>


        <!--//条件-->
        <div class="conditon">
            <div class="header"><span>评定条件</span></div>
            <div class="border-line"></div>
            <div class="conditionContent" v-if="ConditionData.length <= 0">
                <span class="condition-content">恭喜你符合所有评定条件，现在就去申请吧！</span>
            </div>
            <div v-else class="conditionContent" v-for="item in ConditionData">
                <span class="condition-condition">{{item.DISPLAYVALUE}}：</span>
                <span class="condition-content">{{item.INFO}}</span>
            </div>
        </div>

        <!--//我要申请按钮-->
        <mt-button v-if="disabled" class="apply-btn-disable" disabled>我要申请</mt-button>
        <mt-button v-else class="apply-btn" @click="iWantToApply">我要申请</mt-button>
    </div>
</template>
<style scoped>
    .helpDetailContainer {
        background-color: white;
    }

    /*头部样式*/
    .helpDetailTop {
        width: 100%;
        height: auto;
        background-color: white;
        padding-left: 10PX;
    }

    .helpDetailTop .line {
        width: 100%;
        height: 30PX;
        display: flex;
        justify-content: space-between;
    }

    .helpDetailTop .line .des {
        display: inline-block;
        font-size: 16PX;
        color: #000000;
        padding-top: 10PX;
    }

    .helpDetailTop .line .money {
        float: right;
        font-size: 16PX;
        color: #fc2f00;
        padding-top: 10PX;
        padding-right: 10PX;
    }

    .helpDetailTop .line .people, .dateLimit {
        display: inline-block;
        line-height: 100%;
        font-size: 10PX;
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

    .topSecond {
        width: 100%;
        height: auto;
        border-bottom: solid 1PX #e8e8e8;
        padding-bottom: 10PX;
        padding-left: 10PX;
    }

    .topSecond .lefSpan {
        display: inline-block;
        height: 24PX;
        width: 120PX;
        padding-top: 10PX;
        color: #92969c;
    }

    .topSecond .rightSpan {
        display: inline-block;
        height: 24PX;
        width: 120PX;
        padding-top: 10PX;
        color: black;
    }

    /*简介样式*/
    .introduce {
        overflow: hidden;
        width: 100%;
        height: 100PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        margin-top: 20PX;
        padding-left: 10PX;
    }

    .header {
        width: 100%;
        line-height: 30PX;
    }

    .header span {
        display: inline-block;
        line-height: 100%;
        padding-top: 10PX;
        font-size: 16PX;
    }

    .introduce > span {
        display: inline-block;
        float: right;
    }

    .more {
        display: block;
        height: 40PX;
        width: 100%;
        color: #21c0ae;
        border: none;
        outline: none;
        background-color: white;
        border-bottom: solid 1PX #e8e8e8;
    }

    .introduceContent {
        width: 100%;
        height: auto;
        padding: 10PX 10PX 10PX 0PX;
        background-color: white;
    }

    .conditon {
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        margin-top: 20PX;
        padding-left: 10PX;
        margin-bottom: 40PX;
    }

    /*条件样式*/
    .conditionContent {
        display: block;
        font-size: 12PX;
        line-height: 30PX;
        background-color: white;
    }

    .condition-condition {
        color: #92969c;
    }

    .condition-content {
        color: black;
    }

    /*我要申请样式*/
    .apply-btn {
        width: 100%;
        color: white;
        background-color: #06c1ae;
        position: fixed;
        bottom: 0;
    }

    .apply-btn-disable {
        width: 100%;
        color: white;
        background-color: #aaa;
        position: fixed;
        bottom: 0;
    }

    .border-line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>
<script>
    import {Cell, Indicator, Button} from 'mint-ui'
    import $ from 'jquery'
    import globKey from '../../globKey.js'
    import Utils from '../../utils';

    export default{
        created() {
            SDK.setTitleText('补助详情');
            let requestUrl2 = globKey.yuMing + globKey.getPoorTypeDetails +
                '?IDENTITY_ID=&' + 'KNBZDM=' + this.$route.query.knbzdm + '&KNBZDJDM=' + this.$route.query.knbzdjdm;
            Indicator.open();
            this.$http.get(requestUrl2).then(res=>{
                Indicator.close();
                return res.json();
            }).then(res=>{
                this.helpDetail = res.datas;
                this.helpJJ = res.datas.JJ;

                this.sqjssj = res.datas.SQJSRQ;
                this.residueDay = Utils.methods.getResidueDayS(this.sqjssj);

                if (res.datas.ConditionData) {
                    this.ConditionData = res.datas.ConditionData;
                }
                if(this.helpDetail.SFKSQ === '0')
                {
                    this.disabled = true;
                    Utils.methods.showTip('抱歉，您暂时无法申请');
                }
            });
        },
        methods: {
            more: function () {
                if (this.moreOrLess == '收起') {
                    $(".introduce").css('height', '100PX');
                    this.moreOrLess = '更多';
                } else {
                    $(".introduce").css('height', 'auto');
                    this.moreOrLess = '收起';
                }
            },
            iWantToApply: function () {
                if (this.helpDetail.SFKSQ == '0') {
                    return;

                } else {
                    this.$router.push({
                        path: '/apply',
                        query: {id: globKey.identityID, knbzdm: this.$route.query.knbzdm, knbzdjdm: this.$route.query.knbzdjdm}
                    });
                }

            }
        },
        data(){
            return {
                helpDetail: {},
                ConditionData: [],
                helpJJ: '',
                moreOrLess: "更多",
                disabled: false,
                sqjssj: '',
                residueDay: ''
            }
        },
        components: {
            [Cell.name]: Cell,
            [Button.name]: Button
        }
    }
</script>
