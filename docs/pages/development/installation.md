# 安装

## npm 安装

`npm install @zjlabvis/lowcode-index -S`

## 构建插件配置

需在vue.config.js中配置以下两个插件：

### LowcodeEntryFilePlugin

为了提供面向开发人员的页面入口js的在线编辑功能，需要引入该插件，示例如下

```js
// vue.config.js
const LowcodeEntryFilePlugin = require('@zjlabvis/lowcode-index/plugins/lowcode-entry-file/index');

module.exports = {
  configureWebpack: {
    plugins: [new LowcodeEntryFilePlugin()]
  }
}
```

### MonacoWebpackPlugin

为了确保编辑器`monaco-editor`可以正常使用，需要安装monaco相关插件并配置

首先，安装`monaco-editor-webpack-plugin`，请注意安装版本，选择6.0.0

然后，在vue.config.js中进行配置，语言至少包含javascript、css、typescript

```js

// vue.config.js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'typescript'],
      })]
  }
}
```

