const router = require('koa-router')()
const userModel = require('../lib/mysql.js')
let MessageXSend = require('../lib/sms/messageXSend');
let message = new MessageXSend();

router.prefix('/code')

// 获取验证码
router.post('/getCode', async ctx => {
	let data = ctx.request.body;
	//正则
	const reg_phone = /^1[3|4|5|7|8][0-9]{9}$/;//验证手机号码
	//生成随机验证码
	let code = "";//六位验证码
	for(let i=0;i<6;i++)
	{
		code += Math.floor(Math.random()*10);
	}
	//手机号码正则
	if(!reg_phone.test(data.phone)){
		ctx.body({success: false, msg:"手机号码格式不正确"});
		return
	}
	message.set_to(data.phone);
	message.set_project('xd4J02');
	message.add_var('code', code);
	message.xsend();
	const { phone, action } = data
	//保存至数据库
	await userModel.insertCode(phone, code, action);
	ctx.body = {success: true};
})

module.exports = router