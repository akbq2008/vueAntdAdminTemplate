const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  // 配置别名
  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      });
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#3929D7',
          'link-color': '#3929D7',
          'font-size-base': '14px',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  }
};
