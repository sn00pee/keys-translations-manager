module.exports = {
  devServer: {
    proxy: {
      '/api/': { target: `http://localhost:${process.env.PORT || '3000'}` },
    },
  },
}
