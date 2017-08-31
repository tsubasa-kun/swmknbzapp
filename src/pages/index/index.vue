<template>
    <div id="app" class="index">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1" class="ww">补助一览</mt-tab-item>
            <mt-tab-item id="2">我的申请</mt-tab-item>
        </mt-navbar>

        <div class="bottom-line"></div>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" class="tabContainer">
            <mt-tab-container-item id="1">
                <div v-for="bzz in BZList">
                    <span class="sectionHeader">{{ bzz[0].KNBZMC }}</span>
                    <div class="awardItem" v-for="item in bzz" @click="goToHelpDetail(item)">
                        <div class="awardItemLeft">
                            <div class="line">
                                <span class="level">{{item.DJMC}}</span>
                                <span class="money">￥{{item.JE}}</span>
                                <span class="peopleCount">{{item.YSQRS}}人已申请</span>
                            </div>
                            <div class="line">
                                <span class="date">开放时间</span><span
                                    class="dateToDate">{{item.SQKSRQ}}-{{item.SQJSRQ}}</span>
                                <span class="markImage" v-show="item.SFKSQ != 1">不可申请</span>
                            </div>
                        </div>
                        <div class="director">
                            <i class="iconfont">&#xe79e;</i>
                        </div>
                    </div>
                </div>
                <v-nothing-tip message="暂无可申请的困难补助" v-show="BZList.length === 0"></v-nothing-tip>
            </mt-tab-container-item>

            <mt-tab-container-item id="2">
                <div v-for="al in applyList">
                    <span class="sectionHeader">{{ al[0].KNBZMC }}</span>
                    <div class="awardItem" v-for="item in al">
                        <v-my-apply :items="item"></v-my-apply>
                    </div>
                </div>
                <v-nothing-tip message="暂无困难补助申请记录" v-show="applyList.length === 0"></v-nothing-tip>
            </mt-tab-container-item>

        </mt-tab-container>
    </div>
</template>


<script type="text/javascript">
    import {Navbar, TabItem, TabContainer, TabContainerItem, Cell, Indicator} from 'mint-ui';
    import myApply from '../components/myApply.vue'
    import nothingTips from '../components/nothingTips.vue'
    import globKey from '../../globKey.js'
    import Utils from '../../utils';
    export default {
        created() {
            SDK.setTitleText('困难补助');
            Indicator.open();
            let setdefaultrolRequest = globKey.yuMing + globKey.setDefaultRole;
            this.$http.get(setdefaultrolRequest).then(res => {
                return res.json();
            }).then(resu => {
                if (resu.status === '200') {
                    let param = {IDENTITY_ID: globKey.identityID};
                    //可申请的困难补助列表
                    let requestUrl = globKey.yuMing + globKey.getStuAllPoorType;
                    this.$http.get(requestUrl, param).then(res => {
                        return res.json();
                    }).then(res => {
//                        this.BZList = res.datas;
                        this.BZList = this.formatData(res.datas);
                        Indicator.close();
                    });

                    //我申请过的困难补助列表
                    let requestUrl2 = globKey.yuMing + globKey.getStuAllApplyInfo + '?IDENTITY_ID=' + globKey.identityID;
                    this.$http.get(requestUrl2).then(res => {
                        return res.json();
                    }).then(res => {
//                        this.applyList = res.datas;
                        this.applyList = this.formatData(res.datas);
                        Indicator.close();
                    });
                } else {
                    Utils.methods.showTip(resu.msg || '设置默认角色失败');
                }
            });
        },


        methods: {
            goToHelpDetail: function (item) {
                let obj = item;
                let knbzdm = obj.KNBZDM;
                let knbzdjdm = obj.KNBZDJDM;
                this.$router.push({path: '/helpDetail', query: {knbzdm: knbzdm, knbzdjdm: knbzdjdm}});
            },
            formatData: function (data) {
                let outArr = [];
                let oldKey = '';
                let keyArr = [];

                //拿出所有KNBZDM
                for (let i = 0; i < data.length; i++) {
                    if (data[i].KNBZDM === oldKey) {
                        continue;
                    } else {
                        oldKey = data[i].KNBZDM;
                        keyArr.push(data[i].KNBZDM);
                    }
                }

                //KNBZDM去重
                let newKeyArr = [];
                for(let i = 0; i < keyArr.length; i++){
                    console.log(newKeyArr.indexOf(keyArr[i]));
                    if(newKeyArr.indexOf(keyArr[i]) === -1){
                        newKeyArr.push(keyArr[i]);
                    }
                }

                //分组归类
                for (let i = 0; i < newKeyArr.length; i++) {
                    let inArr = [];
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].KNBZDM === newKeyArr[i]) {
                            inArr.push(data[j]);
                        }
                    }
                    outArr.push(inArr);
                }

                return outArr;
            }
        },
        data(){
            return {
                selected: "1",
                msg: [1, 2, 3],
                BZList: [],
                applyList: []

            }
        },
        components: {
            [Navbar.name]: Navbar,
            [TabItem.name]: TabItem,
            [TabContainer.name]: TabContainer,
            [TabContainerItem.name]: TabContainerItem,
            [Cell.name]: Cell,
            [Indicator.name]: Indicator,
            'v-my-apply': myApply,
            'v-nothing-tip': nothingTips
        },
        watch: {}
    }
</script>

<style scoped>
    .index {
        background: #f9f9f9;
    }

    .bottom-line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .tabContainer {
        margin-top: 3PX;
    }

    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 3PX solid #06c1ae;
        color: #06c1ae;
        margin-bottom: -3PX;
    }

    /*.mint-tab-item-label*/
    /*{*/
    /*color: #55c8b9;*/
    /*}*/
    .sectionHeader {
        display: block;
        width: 100%;
        height: 30PX;
        line-height: 30PX;
        font-size: 14PX;
        color: #979797;
        padding-left: 10PX;
        background-color: #f9f9f9;
        border-bottom: solid 1PX #e8e8e8;
    }

    .awardItem {
        margin-bottom: 1PX;
        width: 100%;
        height: 80PX;
        background-color: white;
        border-bottom: solid 1PX #e8e8e8;
    }

    /*.statue:last-child{*/
    /*margin-bottom:0;*/
    /*background-color: #0a6bb7;*/
    /*}*/
    .awardItemLeft {
        display: inline-block;
        width: 90%;
        height: 100%;
        float: left;
    }

    .mark {
        width: 50PX;
        height: 15PX;
    }

    .director {
        display: inline-block;
        width: 10%;
        height: 100%;
        float: right;
    }

    .director i {
        font-size: 30PX;
        color: #d3d3d3;
        line-height: 80PX;
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
        padding-top: 10PX;
        padding-right: 10PX;
        float: right;
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

    .markImage {
        display: inline-block;
        float: right;
        font-size: 12PX;
        /*width: ;*/
        margin-right: 10PX;
        line-height: 100%;
        color: red;
        background: #F9D9D6;
        padding: 5PX;
    }

    .awardItemRight {
        width: 10%;
        height: 100%;
        float: right;

    }

    .awardItemRight > img {
        width: 100%;
        height: 100%;
        /*float: right;*/
    }

    a {
        background-color: transparent;
        color: #939393;
        text-decoration: none;
    }
</style>
