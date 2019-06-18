module.exports = {
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
