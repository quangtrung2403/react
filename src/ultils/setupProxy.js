const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://wlp.howizbiz.com',
			changeOrigin: true,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000',
			},
		})
	);
};