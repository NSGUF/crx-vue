const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}


function addStyleResource(rule) {
  rule.use('style-resource')
  .loader('style-resources-loader')
  .options({
    patterns: [
      path.resolve(__dirname, './src/assets/style/global.styl'),
    ],
  });
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5010/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@/views', resolve('src/views'))
    .set('@/assets', resolve('src/assets'))
    .set('@/components', resolve('src/components'))
    .set('@/utils', resolve('src/utils'));

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)));
  },
  pages: {
    popup: {
      entry: 'src/popup.ts',
      // 模板来源
      template: 'public/popup.html',
      // 在 dist/popup.html 的输出
      filename: 'popup.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '书签',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'popup'],
    },
    background: {
      entry: 'src/background.ts',
      // 模板来源
      template: 'public/background.html',
      // 在 dist/background.html 的输出
      filename: 'background.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '书签',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'background'],
    },
  },
};
