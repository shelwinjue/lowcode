# 快速上手

本节将介绍如何在已有的`vue 2.x`项目中快速创建低代码页面

## 创建低代码页面

执行`npx @zjlabvis/project-cli lowcode:create index`，将在当前目录下创建低代码页面入口文件`index.tsx`

## 引入相关依赖和样式文件

`@zjlabvis/lowcode-index`的界面使用的是`Ant Design Vue 1.x`组件库，所以为了保证页面正常渲染，需要在项目入口文件中引入`Ant Design Vue`及相关样式文件，同时也需要引入包`@zjlabvis/lowcode-index`本身的样式文件。

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

可以在`App.vue`中引入通过命令创建的低代码页面index.tsx，示例如下

```html
<template>
  <div class="app">
    <LowCodePage />
  </div>
</template>
<script>
import LowCodePage from './index.tsx'
export default {
	components: {
		LowCodePage
	}
}
</script>
<style>
.app {
  width: 100%;
  height: 100%;
}
</style>
```

## demo演示

至此，一个低代码页面已准备就绪。低代码页面入口组件的代码说明、相关API文档、包中已包含的低代码组件，如何开发自定义的低代码组件，请参阅它们各自的文档。

<ClientOnly>
  <LowcodePageDemo />
</ClientOnly> 