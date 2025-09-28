const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'http://3.110.191.229/api',
  //     changeOrigin: true,
  //     secure: false,
  //     pathRewrite: {
  //       '^/api': '', // Remove '/api' prefix when proxying
  //     }
  //   })
  // );

  app.use(
    '/abha', // This path should match the NCD_API_BASE_URL
    createProxyMiddleware({
      target: 'http://localhost:4200/api/abha',
      // target: 'http://3.110.191.229:4200/api/abha',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/abha': '', // Remove '/portal' prefix when proxying
      }
    })
  );


};
