
export default {
  dev: {
    '/api/': {
      target: 'https://10.219.12.27:8090',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  }
};
