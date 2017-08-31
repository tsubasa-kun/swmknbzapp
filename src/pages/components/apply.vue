<template>
    <div class="applyContainer">
        <!--<input class="phone" type="tel" placeholder="请输入你的手机号码" maxlength="11" v-model="phone"/>-->
        <!--<div class="line"></div>-->
        <textarea class="reason" v-model="reason" placeholder="请输入你的申请理由吧" maxlength="200"></textarea>
        <div class="count-div">
            <span class="count-text">{{ count }}</span>
            <span class="count-max">/200</span>
        </div>
        <mt-button class="apply-btn" @click="applyHelp">提交</mt-button>

    </div>
</template>
<style scoped>
    .applyContainer {
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .phone {
        display: block;
        width: 100%;
        height: 45PX;
        margin-bottom: 1PX;
        padding: 10PX;
        font-size: 14PX;
        border: none;
        outline: none;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .reason {
        width: calc(100% - 20PX);
        height: 215PX;
        padding-top: 10PX;
        font-size: 14PX;
        border: none;
        outline: none;
        resize: none;
    }

    .count-div {
        width: 100%;
        padding-right: 10PX;
        text-align: right;
    }

    .count-text {
        display: inline-block;
        right: 36PX;
        color: #92969c;
        font-size: 10PX;
    }

    .count-max {
        display: inline-block;
        right: 10PX;
        color: #92969c;
        font-size: 10PX;
    }

    .apply-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin-top: 20PX;
    }

</style>
<script>
    import $ from 'jquery'
    import Utils from '../../utils';
    import {Indicator, Button} from 'mint-ui'
    import globKey from '../../globKey.js'
    export default{
        methods: {
            applyHelp: function () {
                if (this.reason.length <= 0) {
                    Utils.methods.showTip('请输入你的申请理由');
                    return;
                }
//                else if (this.phone.length <= 0) {
//                    Utils.methods.showTip('请输入你的手机号码');
//                    return;
//                }

                var id = this.$route.query.id;
                var knbzdm = this.$route.query.knbzdm;
                var knbzdjdm = this.$route.query.knbzdjdm;
                var url2 = globKey.yuMing + globKey.saveStuApplyInfo + '?IDENTITY_ID=' + id + '&KNBZDM=' + knbzdm + '&KNBZDJDM=' + knbzdjdm + '&SQLY=' + this.reason;

                Indicator.open();
                this.$http.get(url2).then(res => {
                    return res.json();
                }).then(res => {
                    Indicator.close();
                    if (res.datas.msg.length > 1) {
                        Utils.methods.showTip(res.datas.msg);
                        this.showApplyTips();
                    } else {
                        this.showApplyTips();
                    }
                });
            },

            showApplyTips: function () {
                this.$router.push('/applyTips');
            }
        },
        data(){
            return {
                msg: 'hello vue',
                data: {},
                phone: '',
                reason: '',
                count: 0,
            }
        },
        components: {
            [Button.name]: Button
        },
        watch: {
            reason: function () {
                this.count = this.reason.length;
            }
        },
        created() {
            SDK.setTitleText('申请');
        }
    }
</script>
