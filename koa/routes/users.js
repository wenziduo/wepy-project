const router = require('koa-router')()
const userModel = require('../lib/mysql.js')
const controller = require('../controller/c-users')

router.prefix('/users')

// 用户登录
router.post('/login', controller.postLogin)
// 获取用户信息
router.get('/getInfo', controller.getInfo)
// 用户注册
router.post('/register', controller.postRegister)
// 忘记密码
router.post('/forget', controller.postForget)

module.exports = router
