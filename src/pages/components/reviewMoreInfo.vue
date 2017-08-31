<template>
    <div class="helpDetailContainer">
        <!--//头部-->
        <div class="helpDetailTop">
            <div class="line">
                <span class="des">{{helpDetail.KNBZMC}}</span>
                <span class="money">¥{{helpDetail.JE}}</span>
            </div>

            <div class="line">
                <span class="people">{{helpDetail.XDRS}}个名额，{{helpDetail.YSQRS}}人已申请</span>
                <span class="moneyDes">{{helpDetail.JELXMC}}</span>
            </div>

            <div class="line">
                <span class="dateLimit">{{ residueDay }}天后截止</span>
            </div>
        </div>

        <div class="border-line"></div>

        <div class="topSecond">
            <div><span class="lefSpan">等级</span><span class="rightSpan">{{helpDetail.DJMC}}</span></div>
            <div><span class="lefSpan">评定学期</span><span class="rightSpan">{{helpDetail.PDXQ_DISPLAY}}</span></div>
            <div><span class="lefSpan">资金来源</span><span class="rightSpan">{{helpDetail.ZJLY}}</span></div>
            <div><span class="lefSpan">设立单位</span><span class="rightSpan">{{helpDetail.SLDW}}</span></div>
        </div>

        <!--申请信息-->
        <div class="applyInfo">
            <div class="header"><span>申请信息</span></div>
            <div class="border-line"></div>
            <table>
                <tr>
                    <td class="desTd">提交时间</td>
                    <td class="detailTd">{{ applyInfo.SQSJ }}</td>
                </tr>
                <tr>
                <td class="desTd">手机号</td>
                <td class="detailTd">{{ applyInfo.SJH }}</td>
                </tr>
                <tr>
                    <td class="desTd">申请理由</td>
                    <td class="detailTd">{{ applyInfo.SQLY }}
                    </td>
                </tr>
            </table>
        </div>

        <!--//简介-->
        <div class="introduce">
            <div class="header"><span>补助简介</span></div>
            <div class="border-line"></div>
            <span class="introduceContent">{{ helpJJ }}</span>
        </div>
        <button v-if="helpJJ.length > 50" class="more" @click="more()">{{ moreOrLess }}</button>


        <!--//条件-->
        <div class="conditon">
            <div class="header"><span>评定条件</span></div>
            <div class="border-line"></div>
            <div class="conditionContent" v-if="ConditionData.length <= 0">
                <span class="condition-content">恭喜你符合所有评定条件！</span>
            </div>
            <div v-else class="conditionContent" v-for="item in ConditionData">
                <span class="condition-condition">{{item.DISPLAYVALUE}}：</span>
                <span class="condition-content">{{item.INFO}}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    /*--申请信息--*/
    .applyInfo{
        margin-top: 20PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        padding-left: 10PX;
    }
    table{
        width: 100%;
    }

    .desTd{
        width: 25%;
        background: white;
        color: #92969c;
        height: 30PX;
        text-align: left;
        padding: 10PX 10PX 10PX 0PX;
    }
    .detailTd{
        width: 75%;
        background: white;
        color: #030303;
        text-align: left;
        padding-left: 10PX;
    }

    /*------*/

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

    .border-line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>
<script>
    import {Indicator} from 'mint-ui'
    import $ from 'jquery'
    import globKey from '../../globKey.js'
    import Utils from '../../utils';
    export default{
        created(){
            SDK.setTitleText('补助详情');

            //请求申请详情数据
            let requestUrl = globKey.yuMing+globKey.getPoorTypeDetails+'?IDENTITY_ID='+globKey.identityID + '&KNBZDM=' + this.$route.query.KNBZDM + '&KNBZDJDM=' + this.$route.query.KNBZDJDM;
            this.$http.get(requestUrl).then(res => {
                return res.json();
            }).
            then(res => {
                this.helpDetail = res.datas;
                this.helpJJ = res.datas.JJ;
                this.sqjssj = res.datas.SQJSRQ;
                this.residueDay = Utils.methods.getResidueDayS(this.sqjssj);
                if (res.datas.ConditionData) {
                    this.ConditionData = res.datas.ConditionData;
                }
            });


            //请求申请信息
            let requestUrl2 = globKey.yuMing+globKey.getStuAllApplyInfo+'?IDENTITY_ID='+globKey.identityID+'&SQBM='+this.$route.query.SQBM;
            Indicator.open();
            this.$http.get(requestUrl2).then(res=>{
                Indicator.close();
                return res.json();
            }).then(res=>{
                this.applyInfo = res.datas[0];
            });

        },
        data(){
            return{
                helpDetail:{},
                applyInfo:{},
                ConditionData: [],
                helpJJ: '',
                moreOrLess:'更多',
                sqjssj: '',
                residueDay: ''
            }
        },
        methods:{
            more: function () {
                if (this.moreOrLess == '收起') {
                    $(".introduce").css('height', '100PX');
                    this.moreOrLess = '更多';
                } else {
                    $(".introduce").css('height', 'auto');
                    this.moreOrLess = '收起';
                }
            }
        },
        components:{
        }
    }
</script>
