/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-02-13 00:09:15
 * @LastEditTime: 2022-02-13 00:09:15
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium-starter\vue.config.js
 */
// vue.config.js
const publicPath = process.env.NODE_ENV === "production" ? "/arps/" : "/arps/";
module.exports = {
  // 基本路径
  publicPath: publicPath,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack-dev-server 相关配置
  devServer: {
    port: 9090,
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    }
  }
}
