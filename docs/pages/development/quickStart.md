# 快速上手

本节将介绍如何在已有的`vue 2.x`项目中快速创建低代码页面

## 创建命令

执行`npx @zjlabvis/project-cli lowcode:create index`，将在当前目录下创建低代码页面入口文件`index.tsx`

## 引入相关依赖和样式文件

`@zjlabvis/lowcode-index`的UI部分是基于`Ant Design Vue 1.x`，所以为了组件能正常渲染，需要在项目入口文件引入`Ant Design Vue`和相关样式文件，同时也需要引入包`@zjlabvis/lowcode-index`本身的样式文件。

在项目入口文件main.js中写入以下内容：

```javascript
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@zjlabvis/lowcode-index/dist/jianweiComponents.css'

Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  render: (h) => h(App),
}).$mount('#app')

```

对于`Ant Design Vue`，请完整引入

## 开始使用

可以在App.vue中引入通过命令创建的低代码页面index.tsx，示例如下

```vue

<template>
  <div id="app">
    <Page />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Page from './index.tsx'

@Component({
  components: {
    Page,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>


```

## demo演示

<ClientOnly>
  <LowcodePageDemo />
</ClientOnly> 