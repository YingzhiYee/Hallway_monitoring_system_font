// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/', // 服务器端口地址
        changeOrigin: true, // 是否跨域
        ws: true, // 是否代理 websockets
        secure: true, // 是否https接口
        pathRewrite: { // 路径重置
          '^/api': ''
        }
      }
    }
  }
}
