const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./bin/config/pool.js');
const index = require('./routes/index')
const users = require('./routes/users')
const home = require('./routes/home')
const sms = require('./routes/sms')
const imgUpload = require('./routes/imgUpload')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
// const verify = util.promisify(jwt.verify) // 解密
const secret = 'jwtdemo'

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  cookie: {
    domain: 'localhost',    // 写 cookie 所在的域名
      path: '/',              // 写 cookie 所在的路径
      maxAge: 1000 * 60 * 10,      // cookie 有效时长
      httpOnly: true,         // 是否只用于 http 请求中获取
      overwrite: false        // 是否允许重写
  }
}))

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
// app.use(async (ctx, next) => {
//   const { sessionId } = ctx.session
//   console.log(sessionId)
//   if (sessionId !== undefined) {
//     if (ctx.request.headers.token !== sessionId) { 
//       ctx.body = {success: false, msg: '需要重新登陆'}
//     }
//   }
//   // const start = new Date()
//   await next()
//   // const ms = new Date() - start
//   // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

app.use(jwtKoa({secret}).unless({
  path: [/^\/users\/login/, /^\/users\/register/, /^\/code\/getCode/] // 数组中的路径不需要通过jwt验证
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(home.routes(), home.allowedMethods())
app.use(imgUpload.routes(), imgUpload.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(sms.routes(), sms.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  // console.log(ctx)
  // console.error('server error', err, ctx)
});

module.exports = app
