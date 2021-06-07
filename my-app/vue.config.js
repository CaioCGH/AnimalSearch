module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://node-api:3000',
          changeOrigin: true
        },
      }
    }
  }