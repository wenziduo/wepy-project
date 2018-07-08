var mysql = require('mysql');
var config = require('../bin/config/pool.js')
var moment = require('moment')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});

let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

// users=
// `create table if not exists users(
//  id INT NOT NULL AUTO_INCREMENT,
//  name VARCHAR(100) NOT NULL,
//  pass VARCHAR(40) NOT NULL,
//  PRIMARY KEY ( id )
// );`

// posts=
// `create table if not exists posts(
//  id INT NOT NULL AUTO_INCREMENT,
//  name VARCHAR(100) NOT NULL,
//  title VARCHAR(40) NOT NULL,
//  content  VARCHAR(40) NOT NULL,
//  uid  VARCHAR(40) NOT NULL,
//  moment  VARCHAR(40) NOT NULL,
//  comments  VARCHAR(40) NOT NULL DEFAULT '0',
//  pv  VARCHAR(40) NOT NULL DEFAULT '0',
//  PRIMARY KEY ( id )
// );`

// comment=
// `create table if not exists comment(
//  id INT NOT NULL AUTO_INCREMENT,
//  name VARCHAR(100) NOT NULL,
//  content VARCHAR(40) NOT NULL,
//  postid VARCHAR(40) NOT NULL,
//  PRIMARY KEY ( id )
// );`

// let createTable = function( sql ) {
//   return query( sql, [] )
// }

// // 建表
// createTable(users)
// createTable(posts)
// createTable(comment)

// 查询所有文章
let findAllPost = function (  ) {
  let _sql = `
    SELECT * FROM posts
      `
  return query( _sql)
}
// 获取文章详情数据
let findDetail = function ( id ) {
  let _sql = `
    SELECT * FROM posts where id = ${id}
      `
  return query( _sql)
}
// 获取该文章评论数据
let findComment = function ( id ) {
  let _sql = `
    SELECT * FROM comment where postid = ${id}
      `
  return query( _sql)
}
// 登录查找用户表
let findUser = function ( name, pass ) {
  let _sql = `
    SELECT * FROM users where name = '${name}' and pass = '${pass}'
      `
  return query( _sql)
}
// 登录查找用户表(id)
let findUserById = function ( id ) {
  let _sql = `
    SELECT * FROM users where id = '${id}'
      `
  return query( _sql)
}
// 查找用户表(name)
let findUserByName = function ( name ) {
  let _sql = `
    SELECT * FROM users where name = '${name}'
      `
  return query( _sql)
}
// 查找用户表(phone)
let findUserByPhone = function ( phone ) {
  let _sql = `
    SELECT * FROM users where phone = '${phone}'
      `
  return query( _sql)
}
// 用户注册
let insertUser = function ( name, pass, avator, phone, sex ) {
  let _sql = `
    INSERT INTO users(name,pass,avator,moment,phone,sex) VALUES("${name}","${pass}","${avator}","${moment().format('YYYY-MM-DD HH:mm:ss')}","${phone}","${sex}")
      `
  return query( _sql)
}
// 修改密码
let updatePass = function ( phone, newPass ) {
  console.log('po', phone, newPass)
  let _sql = `
  update users set pass='${newPass}' where phone='${phone}'
      `
  return query( _sql)
}
// 插入验证码
let insertCode = function ( phone, code, action ) {
  let _sql = `
  INSERT INTO sms(phone,creat_time,code,action) VALUES("${phone}","${moment().format('YYYY-MM-DD HH:mm:ss')}","${code}","${action}")
      `
  return query( _sql)
}
// 查找验证码
let findCodeByPhone = function ( phone, action ) {
  let _sql = `
  SELECT * FROM sms WHERE phone = "${phone}" and action = "${action}" ORDER BY id DESC LIMIT 1
      `
  return query( _sql)
}


module.exports={
  query,
  // createTable,
  findAllPost,
  findDetail,
  findComment,
  findUser,
  findUserById,
  updatePass,
  findUserByName,
  findUserByPhone,
  insertUser,
  insertCode,
  findCodeByPhone
  // ************
}