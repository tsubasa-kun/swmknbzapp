/**
 * Created by gaomneng on 2017/4/10.
 */

//测试账号2010007 2010056
export  default{
 identityID : '',
//全局域名
//  yuMing : 'http://amptest.wisedu.com/axsfw',
 yuMing : WEBPACK_CONIFG_HOST,

// yuMing : '../..';
    setDefaultRole:"/sys/knbzapp/MobilePoorStuApply/setDefaultRole.do",

//查询可申请的困难补助
 getStuAllPoorType :  '/sys/knbzapp/MobilePoorStuApply/getStuAllPoorType.do',

//查询困难补助详情信息
 getPoorTypeDetails :  '/sys/knbzapp/MobilePoorStuApply/getPoorTypeDetails.do',

//保存存困难补助申请
  saveStuApplyInfo :  '/sys/knbzapp/MobilePoorStuApply/saveStuApplyInfo.do',

//查询学生申请记录
 getStuAllApplyInfo :  '/sys/knbzapp/MobilePoorStuApply/getStuAllApplyInfo.do',

//查询学生申请记录的审核日志
 getStuApplyLogInfo :  '/sys/knbzapp/MobilePoorStuApply/getStuApplyLogInfo.do',
}
// const identityID = '2010007';
//
// //全局域名
// const yuMing = 'http://amptest.wisedu.com/axsfw';
//
// //查询可申请的困难补助
// const getStuAllPoorType = '/sys/knbzapp/MobilePoorStuApply/getStuAllPoorType.do';
//
// //查询困难补助详情信息
// const getPoorTypeDetails = '/sys/knbzapp/MobilePoorStuApply/getPoorTypeDetails.do';
//
// //保存存困难补助申请
// const  saveStuApplyInfo = '/sys/knbzapp/MobilePoorStuApply/saveStuApplyInfo.do';
//
// //查询学生申请记录
// const getStuAllApplyInfo = '/sys/knbzapp/MobilePoorStuApply/getStuAllApplyInfo.do';
//
// //查询学生申请记录的审核日志
// const getStuApplyLogInfo = '/sys/knbzapp/MobilePoorStuApply/getStuApplyLogInfo.do';