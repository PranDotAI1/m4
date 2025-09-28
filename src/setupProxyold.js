const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/abha',
    createProxyMiddleware({
      target: 'https://abhasbx.abdm.gov.in/abha',
      changeOrigin: true,
      secure: false, // try this if the endpoint uses self-signed SSL
      pathRewrite: {
        '^/abha': '/abha', // optional, keep it if your target path is same
      },
    })
  );
};