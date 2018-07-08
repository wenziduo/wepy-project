import wepy from 'wepy'
// import util from './util'
// import md5 from './md5'
// import tip from './tip'

// const API_SECRET_KEY = 'www.mall.cycle.com'
// const TIMESTAMP = util.getCurrentTime()
// const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

const wxRequest = async(url, params, type) => {
  // tip.loading()
  let res = await new Promise((resolve, reject) => {
    wepy.request({
      url: url,
      method: type || 'GET',
      data: params,
      header: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${wepy.getStorageSync('token')}` },
      success: res => {
        if (res.statusCode === 401) {
          wepy.redirectTo({url: 'login'})
        }
        resolve(res)
      },
      error: res => {
        reject(res)
      }
    })
  })
  // tip.loaded()
  return res
}

module.exports = {
  wxRequest
}
