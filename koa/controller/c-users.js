
const userModel = require('../lib/mysql.js')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const secret = 'jwtdemo'
// const checkNotLogin = require('../middlewares/check.js').checkNotLogin
// const checkLogin = require('../middlewares/check.js').checkLogin;
// const md = require('markdown-it')();
/**
 * 重置到文章页
 */
exports.getRedirectPosts = async ctx => {
    ctx.redirect('/posts')
}
/**
 * 登录
 */
exports.postLogin = async ctx => {
    const { name, pass } = ctx.request.body;
    const res = await userModel.findUser(name, pass);
    if (res.length > 0) {
      let userToken = {
        name: name
      }
      const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  // token签名 有效期为1小时
      ctx.body = { success: true, userInfo: res[0], token }
    }else {
      ctx.body = { success: false, msg: '用户名或密码错误' }
    }
}
// 获取用户信息
exports.getInfo = async ctx => {
  const { id } = ctx.request.query;
  const res = await userModel.findUserById(id);
  if (res.length > 0) {
    ctx.body = { success: true, userInfo: res[0] }
  }else {
    ctx.body = { success: false, msg: '未找到用户' }
  }
}
// 用户注册
exports.postRegister = async ctx => {
  const { name, pass, phone, code, sex } = ctx.request.body;
  const avator = 'moren'; // 默认头像
  if (!name || !pass) {ctx.body = {success: false, msg: '请正确填写'}; return};
  const res_user = await userModel.findUserByName(name);
  if (res_user.length > 0) {ctx.body = {success: false, msg: '存在相同的用户名'}; return};
  const res_phone = await userModel.findUserByPhone(phone);
  if (res_phone.length > 0) {ctx.body = {success: false, msg: '存在相同的手机号'}; return};
  const phoneCode = await userModel.findCodeByPhone(phone, 'register' );
  if (phoneCode.length > 0) {
    if (phoneCode[0].code === code) {
      const timer_code = new Date(phoneCode[0].creat_time).getTime();//验证码创建的时间戳
      const timer_now = new Date().getTime();//当前的时间戳
      const sub_time = timer_now - timer_code;
      //验证码30分钟过期
      if(sub_time > 1800000){ctx.body = {success: false, msg: '验证码已过期'}; return}
    } else { ctx.body = {success: false, msg: '验证码错误'}; return }
  } else { ctx.body = {success: false, msg: '未获取验证码'}; return }
  await userModel.insertUser(name, pass, avator, phone, sex);
  ctx.body = {success: true, msg: '恭喜成为逗儿瓢社区用户'}
}
// 修改密码
exports.postForget = async ctx => {
  const { oldPass, newPass, phone, code } = ctx.request.body;
  if (phone == undefined || newPass === undefined || code === undefined) {ctx.body = {success: false, msg: '缺少必要字段'}; return}
  const phoneCode = await userModel.findCodeByPhone(phone, 'forget')
  if (phoneCode.length > 0) {
    if (phoneCode[0].code === code) {
      const timer_code = new Date(phoneCode[0].creat_time).getTime();//验证码创建的时间戳
      const timer_now = new Date().getTime();//当前的时间戳
      const sub_time = timer_now - timer_code;
      //验证码30分钟过期
      if(sub_time > 1800000){ctx.body = {success: false, msg: '验证码已过期'}; return}
    } else { ctx.body = {success: false, msg: '验证码错误'}; return }
  } else { ctx.body = {success: false, msg: '未获取验证码'}; return }
  const res_user = await userModel.updatePass(phone, newPass);
  ctx.body = {success: true, msg: '密码修改成功'}
}