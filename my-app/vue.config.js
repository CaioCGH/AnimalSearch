module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'https://anmal-search.herokuapp.com',
          changeOrigin: true
        },
      }
    }
  }
