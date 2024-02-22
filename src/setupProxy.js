const proxy = require('http-proxy-middleware')

const setRapidAPIKeyHeader = (proxyReq, _req, _res) => {
  proxyReq.setHeader('X-WINDY-API-KEY', process.env.WINDY_API_KEY)
}

module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'https://api.windy.com/webcams/api/v3/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyReq: setRapidAPIKeyHeader
  }))
}
