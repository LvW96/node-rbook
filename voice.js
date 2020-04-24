/*
const Base64 = require('js-base64').Base64
const md5 = require('js-md5')
const qs = require('qs')
const http = require('http')
const mp3FilePath = require('./const').mp3FilePath
const resUrl = require('./const').resUrl
const fs = require('fs')



function createVoice(req,res) {
  //const text = req.query.text
  const text = '该语音能力是通过Websocket API的方式给开发者提供一个通用的接口。Websocket API具备流式传输能力，适用于需要流式数据传输的AI服务场景。相较于SDK，API具有轻量、跨语言的特点；相较于HTTP API，Websocket API协议有原生支持跨域的优势。'
  const lang = 'cn'

  let engineType = 'intp65'
  if (lang.toLowerCase() === 'en'){
    engineType = 'intp65_en'
  }
  const speed = '20'
  const voiceParam = {
    auf: 'audio/L16;rate=16000', //返回的是语音格式
    aue: 'lame', //音频才采样率
    voice_name: 'xiaoyan', //人语音
    speed,  //速度
    volume: '50', //音量
    pitch: '50', //音高
    engine_type: engineType, //引擎类型
    text_type: 'text' //文本类型
  }
    //认证部分
    //先获取时间utc的时间,/1000就可以了
    const currentTime = Math.floor(new Date().getTime() / 1000)
    //获取注册处的appId
    const appId = '5ea263e5'
    //apiKey祖册中有
    const apiKey = '5d46409796c9ab092267f14ea701ad4a'
    //调用Base64.encode进行加密，再用stringify把上面的参数传入
    const xParam = Base64.encode(JSON.stringify(voiceParam))
    //封装三个参数进行加密
    const checkSum = md5(apiKey + currentTime + xParam)
    //定义变量
    const headers = {}
    //封装把参数传入变量
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    headers['X-Param'] = xParam
    headers['X-Appid'] = appId
    headers['X-CurTime'] = currentTime
    headers['X-CheckSum'] = checkSum
    headers['X-Real-Ip'] = '127.0.0.1'
    //定义把文本传入，生成请求参数
    const data = qs.stringify({
      text: text
    })
  //请求参数
  const options = {
    host: 'tts-api.xfyun.cn',
    path: 'wss://tts-api.xfyun.cn/v2/tts', //科大讯飞地址，到接口地址查看
    method: 'POST',
    headers
  }
  const request = http.request(options,response => {
    //console.log(response)
    let mp3 = ''
    //对结果进行处理
    const contentLength = response.headers['content-length']
    //将编码格式为二进制文件
    response.setEncoding('binary')
    //通过response.on回调方法回调结果data
    response.on('data', data => {
      //console.log(data)
      //拿到data是语音播放的文件，把data传换成mp3文件
      mp3 += data
      //进度百分显示，用当前接收到长度/总长度
      const process = data.length / contentLength * 100
      //转化成保留两位小数
      const percent = parseInt(process.toFixed(2))
      console.log(percent)
    })
    response.on('end',() => {

      console.log(response.headers)
      console.log(mp3)
      //通过这判断类型
      const contentType = response.headers['content-type']
      //如果不是mp3就失败
      if (contentType === 'text/html') {
        res.send(mp3) //直接显示报错
      } else if (contentType === 'text/plain') { //报错，把结果返回前端
        res.send(mp3)
      } else {
        const fileName = new Date().getTime()
        const filePath = `${mp3FilePath}/${fileName}.mp3`
        const downloadUrl = `${resUrl}/mp3/${fileName}.mp3`
        console.log(filePath, downloadUrl)
        fs.writeFile(filePath, mp3, 'binary', err => {
          if (err) {
            res.json({
              error: 1,
              msg: '下载失败'
            })
          } else {
            res.json({
              error: 0,
              msg: '下载成功',
              path: downloadUrl
            })
          }
        })
      }
    })
  })
  request.write(data)
  request.end()
}

module.exports = createVoice
*/


const Base64 = require('js-base64').Base64
const md5 = require('js-md5')
const qs = require('qs')
const http = require('http')
const mp3FilePath = require('./const').mp3FilePath
const resUrl = require('./const').resUrl
const fs = require('fs')

function createVoice(req, res) {
  const text = req.query.text
  const lang = req.query.lang
   //const text = '测试科大讯飞在线语音合成api的功能，比如说，我们输入一段话，科大讯飞api会在线实时生成语音返回给客户端'
   //const lang = 'cn'

  let engineType = 'intp65'
  if (lang.toLowerCase() === 'en') {
    engineType = 'intp65_en'
  }
  const speed = '30'
  const voiceParam = {
    auf: 'audio/L16;rate=16000',
    aue: 'lame',
    voice_name: 'xiaoyan',
    speed,
    volume: '50',
    pitch: '50',
    engine_type: engineType,
    text_type: 'text'
  }

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const appId = '5ea263e5'
  const apiKey = '5d46409796c9ab092267f14ea701ad4a'
  const xParam = Base64.encode(JSON.stringify(voiceParam))
  const checkSum = md5(apiKey + currentTime + xParam)
  const headers = {}
  headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
  headers['X-Param'] = xParam
  headers['X-Appid'] = appId
  headers['X-CurTime'] = currentTime
  headers['X-CheckSum'] = checkSum
  headers['X-Real-Ip'] = '127.0.0.1'
  const data = qs.stringify({
    text: text
  })
  const options = {
    host: 'tts-api.xfyun.cn',
    path: '/v2/tts',
    method: 'POST',
    headers
  }
  const request = http.request(options, response => {
    let mp3 = ''
    const contentLength = response.headers['content-length']
    response.setEncoding('binary')
    response.on('data', data => {
      mp3 += data
      const process = data.length / contentLength * 100
      const percent = parseInt(process.toFixed(2))
      // console.log(percent)
    })
    response.on('end', () => {
      console.log(response.headers)
      console.log(mp3)
      const contentType = response.headers['content-type']
      if (contentType === 'text/html') {
        res.send(mp3)
      } else if (contentType === 'text/plain') {
        res.send(mp3)
      } else {
        const fileName = new Date().getTime()
        const filePath = `${mp3FilePath}/${fileName}.mp3`
        const downloadUrl = `${resUrl}/mp3/${fileName}.mp3`
        // console.log(filePath, downloadUrl)
        fs.writeFile(filePath, mp3, 'binary', err => {
          if (err) {
            res.json({
              error: 1,
              msg: '下载失败'
            })
          } else {
            res.json({
              error: 0,
              msg: '下载成功',
              path: downloadUrl
            })
          }
        })
      }
    })
  })
  request.write(data)
  request.end()
}

module.exports = createVoice

