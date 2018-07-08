import {
  wxRequest
} from '@/utils/wxRequest'

const apiMall = 'http://localhost:3500/'

/**
 * 获取发现好商品接口
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
// 获取列表数据
const getList = (params) => wxRequest(apiMall + 'home/list', params, 'GET')
// 获取列表详情数据
const getDetail = (params) => wxRequest(apiMall + 'home/detail', params, 'GET')
// 用户登陆
const postLogin = (params) => wxRequest(apiMall + 'users/login', params, 'POST')
// 获取获取用户数据
const getInfo = (params) => wxRequest(apiMall + 'users/getInfo', params, 'GET')
// 用户注册
const postRegister = (params) => wxRequest(apiMall + 'users/register', params, 'POST')
// 忘记密码
const postForget = (params) => wxRequest(apiMall + 'users/forget', params, 'POST')
// 获取短信验证码
const postCode = (params) => wxRequest(apiMall + 'code/getCode', params, 'POST')

export default {
  getList,
  getDetail,
  postLogin,
  getInfo,
  postRegister,
  postForget,
  postCode
}
