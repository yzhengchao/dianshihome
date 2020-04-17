import util from "./util"

const test = "http://test.dianshihome.com"
const product ="https://api.dianshihome.com"
// const API_BASE_URL = test;
const API_BASE_URL = product;
export const getUserInfo = params => { //获取签到
    return util.request(API_BASE_URL+'/api/user/base/info', {},"GET",params,2);
};
export const getUserCoin = params => { //获取用户金币信息
    return util.request(API_BASE_URL+'/api/coin/info', {},"GET",params,2);
};
export const getUserCash = params => { //获取用户现金信息
    return util.request(API_BASE_URL+'/api/cash/info', {},"GET",params,2);
};
export const getPrizeInfo = params => { //抽奖奖品
    return util.request(API_BASE_URL+'/api/activity/turntable/get', params,"GET",{},1);
};
export const getRecord = params => { //得奖的人
    return util.request(API_BASE_URL+'/api/activity/record', params,"GET",{},1);
};
export const getSignin = params => { //签到
    return util.request(API_BASE_URL+'/api/v4/sign/signin', {},"GET",params,2);
};
export const getSignResult = params => { //签到
    return util.request(API_BASE_URL+'/api/v4/sign/get', {},"GET",params,2);
};
export const addInviterEquity = params => { //领取广告
    return util.request(API_BASE_URL+`/api/activity/equity/add`,params,"GET",{},3);
};
export const getAuth = (params,type) => { //登陆
    return util.request(API_BASE_URL+`/api/mp/login?type=`+type, params,"POST",{"Content-Type":"application/json"},3);
};
export const getTurntableAttend = params => { //抽奖按钮
    return util.request(API_BASE_URL+`/api/activity/turntable/attend`, params,"GET",{},1)
};
