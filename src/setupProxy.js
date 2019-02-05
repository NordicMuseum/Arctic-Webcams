const proxy = require('http-proxy-middleware')

const setRapidAPIKeyHeader = (proxyReq, _req, _res) => {
  proxyReq.setHeader('X-RapidAPI-Key', process.env.RAPIDAPI_KEY)
}

module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'https://webcamstravel.p.rapidapi.com/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyReq: setRapidAPIKeyHeader
  }))
}
