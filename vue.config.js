const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '^/api/': {
  //       target: 'http://localhost:3000',
  //       pathRewrite: { '^/auth': '/auth' },
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //     },
  //   },
  // },
});