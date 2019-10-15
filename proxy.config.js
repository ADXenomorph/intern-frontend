module.exports = [{
  context: [
    '/api',
  ],
  headers: {
    'user-agent': ''
  },
  target: 'http://localhost:10080/',
  secure: false,
  changeOrigin: true
}];
