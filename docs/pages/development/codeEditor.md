# 页面入口组件代码在线编辑

为了满足开发人员多样化的需求，JWLowcode提供了面向开发人员的页面入口文件的代码在线编辑功能。

## 代码在线编辑介绍

页面入口文件代码编辑入口如下所示：

<img src="/onlineEditor-entry.jpg" class="globalImg" style="width: 340px" />


页面入口文件代码编辑面板如下所示：

<img src="/onlineEditor-panel.jpg" class="globalImg" style="width: 840px" />

代码编辑面板允许用户编写JavaScript 代码，并支持 JSX 语法。暂未支持代码语法报错提示。

::: tip
需要注意的是，页面js源码编辑功能仅可在<strong>本地开发及低代码编辑模式</strong>下使用。
:::

## 代码同步原理

代码在线编辑内容同步原理简述如下：

在[安装](./installation.md)章节中已经提到，为了提供面向开发人员的页面入口js的在线编辑功能，引入了`LowcodeEntryFilePlugin`插件。该插件主要功能是在本地开发模式下，初始化`WebSocketServer`，获取文件相对路径，配置全局常量等功能。`WebSocketServer`主要监听来自client端`WebSocket`对文件的一系列请求，如读取文件内容、修改文件内容等。

而在`OnlineCodeEditor.vue`文件（即代码编辑面板组件）中，初始化了client端的`WebSocket`，根据需要向`WebSocketServer`发起请求，并监听`WebSocketServer`对请求的返回显示文件内容。

## 代码在线编辑demo

code here