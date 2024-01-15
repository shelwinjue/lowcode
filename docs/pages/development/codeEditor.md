# 页面入口组件代码在线编辑

为了满足开发人员多样化的需求，JWLowcode提供了面向开发人员的页面入口文件的代码在线编辑功能。

::: tip
注意：页面入口文件的代码在线编辑功能，仅可在<span class="primaryText">本地开发及低代码编辑模式</span>下使用。
:::

## 功能介绍

页面入口文件代码编辑入口如下所示：

<img src="/lowcode-site/onlineEditor-entry.jpg" class="globalImg" style="max-width: 340px;width: 100%" />


页面入口文件代码编辑面板如下所示：

<img src="/lowcode-site/onlineEditor-panel.jpg" class="globalImg" style="max-width: 840px;width: 100%" />

代码编辑面板允许用户编写JavaScript 代码，并支持 JSX 语法。暂未支持代码语法报错提示。



## 功能原理

代码在线编辑内容同步原理简述如下：

在[安装](./installation.md)章节中已经提到，为了提供面向开发人员的页面入口js的在线编辑功能，引入了`LowcodeEntryFilePlugin`插件。

该插件主要功能是在本地开发模式下，初始化`WebSocketServer`，获取文件相对路径，配置全局常量等功能。`WebSocketServer`主要监听来自client端`WebSocket`对文件的一系列请求，如读取文件内容、修改文件内容等。

而在`OnlineCodeEditor.vue`文件（即代码编辑面板组件）中，初始化了client端的`WebSocket`，根据需要向`WebSocketServer`发起请求，并监听`WebSocketServer`对请求的返回显示文件内容。

## 操作演示

首先，拖入文本组件，在属性编辑器面板中，将属性内容通过绑定变量的方式绑定入口文件中`pageData`对象的`textDemo`。

随后，打开代码在线编辑面板，对入口文件中`pageData`对象的`textDemo`赋予新的值，点击保存按钮。

<video controls muted style="width: 100%;max-width: 1200px">
  <source src="/lowcode-site/onlineCodeEditor.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>