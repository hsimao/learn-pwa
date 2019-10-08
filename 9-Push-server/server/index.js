const http = require('http')
const push = require('./push')

const port = 3333
http
  .createServer((request, response) => {
    // CORS
    response.setHeader('Access-Control-Allow-Origin', '*')

    // Get request vars
    const { url, method } = request
    console.log('url', url)

    // Subscribe 訂閱
    // 如果方法是 POST 且 url 網址有包含 subscribe
    if (method === 'POST' && url.match(/^\/subscribe\/?/)) {
      // Get POST body
      let body = []
      request
        .on('data', chunk => body.push(chunk))
        .on('end', () => {
          let subscription = JSON.parse(body.toString())
          console.log(subscription)
          // 將用戶回傳訂閱資料儲存
          push.addSubscription(subscription)
          response.end('Subscribed')
        })

      // Public Key 公鑰
    } else if (url.match(/^\/key\/?/)) {
      response.end(push.getKey())

      // Push Notigfication 發送推播通知
    } else if (method === 'POST' && url.match(/^\/push\/?/)) {
      let body = []

      request
        .on('data', chunk => body.push(chunk))
        .on('end', () => {
          // 發送推播, 內容取自打本隻 api 的 body
          push.send(body.toString())
          response.end('Push Sent')
        })

      // Not Found
    } else {
      response.status = 404
      response.end('Error: Unknown Request')
    }
  })
  .listen(port, () => console.log(`Server on ${port} PORT`))
