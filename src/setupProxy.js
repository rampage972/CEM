const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  // app.use(
  //   '/user',
  //   createProxyMiddleware({
  //     target: "http://10.1.36.136:8080",
  //     changeOrigin: true,
  //   })
  // );
//   app.use(
//     '/druid',
//     createProxyMiddleware({
//       target: "http://10.144.28.112:8082",
//       changeOrigin: true,
//     })
//   );
};