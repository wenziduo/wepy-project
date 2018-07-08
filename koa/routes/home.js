const router = require('koa-router')()
const userModel = require('../lib/mysql.js')
const controller = require('../controller/c-home')

router.prefix('/home')
// 获取所有列表数据
router.get('/list', controller.getHomeList)
// 获取列表详情数据和评论数据
router.get('/detail', controller.getHomeDetail)

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

module.exports = router
