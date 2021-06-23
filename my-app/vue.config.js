
module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://anmal-search.herokuapp.com/',
          changeOrigin: true
        },
      },
	disableHostCheck: true
    }
  }
