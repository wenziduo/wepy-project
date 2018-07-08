
const userModel = require('../lib/mysql.js')
const moment = require('moment')
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
 * 所有文章
 */
exports.getHomeList = async ctx => {
    await userModel.findAllPost()
        .then(result => {
        for (let i = 0; i < result.length; i++) {result[i].beforeAgo = moment(result[i].moment, 'YYYY-MM-DD HH:mm:ss').fromNow()}
        ctx.body = result
    }).catch(() => {
            ctx.body = 'error'
    })
}
// 获取详情数据
exports.getHomeDetail = async ctx => {
    const { id } = ctx.request.query
    const params = {}
    if (id === undefined) {
        ctx.body = { success: false, msg: '缺少必要字段' }
        return
    }
    const detail = await userModel.findDetail(id)
    if (detail.length > 0) {
        params.detail = detail[0]
    } else {
        ctx.body = { success: false, msg: '未找到该文章详情' }
    }
    const commentList = await userModel.findComment(id)
    for (let i = 0; i < commentList.length; i++) {commentList[i].beforeAgo = moment(commentList[i].moment, 'YYYY-MM-DD HH:mm:ss').fromNow()}
    params.comment = commentList
    ctx.body = params
}
