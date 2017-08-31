/**
 * Created by xiekun on 2017/06/21 0021.
 */
import {Toast} from 'mint-ui';
export default {
    components: {
        [Toast.name]: Toast
    },
    methods: {
        //弹出提示
        showTip: function (msg) {
            Toast({
                message: msg,
                position: 'bottom',
                duration: 2000
            });
        },
        //获取当前时间 xxxx-xx-xx
        getCurrentDate: function () {
            let date = new Date();
            let seperator = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = year + seperator + month + seperator + strDate;
            return currentdate;
        },
        //获取当前时间 xxxx-xx-xx xx:xx:xx
        getCurrentDateTime: function () {
            let date = new Date();
            let seperator1 = "-";
            let seperator2 = ":";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minute + seperator2 + second;
            return currentdate;
        },
        //两个时间对比
        compareDate: function (date1, date2) {
            let oDate1 = new Date(date1);
            let oDate2 = new Date(date2);
            if (oDate1.getTime() >= oDate2.getTime()) {
                // console.log('第一个大' + date1);
                return true;
            } else {
                // console.log('第二个大' + date2);
                return false;
            }
        },
        //获取d1-d2的相差天数
        getResidueDay: function (d1, d2) {
            let day = 24 * 60 * 60 * 1000;
            try {
                let dateArr = d1.split("-");
                let checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
                let checkTime = checkDate.getTime();

                let dateArr2 = d2.split("-");
                let checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
                let checkTime2 = checkDate2.getTime();

                let cha = (checkTime - checkTime2) / day;
                return cha;
            } catch (e) {
                return false;
            }
        },
        //获取d1-d2的相差天数-特别定制
        getResidueDayS: function (date) {
            let endDate = date.substr(0, 10);
            let curDate = this.getCurrentDate();
            let day = 24 * 60 * 60 * 1000;
            try {
                let dateArr = endDate.split("-");
                let checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
                let checkTime = checkDate.getTime();

                let dateArr2 = curDate.split("-");
                let checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
                let checkTime2 = checkDate2.getTime();

                let cha = parseInt((checkTime - checkTime2) / day);
                return cha;
            } catch (e) {
                return false;
            }
        }
    }
}