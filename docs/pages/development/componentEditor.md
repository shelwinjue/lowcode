# 组件编辑器面板

<img src="/componentEditor.png" class="globalImg" style="width:100%;max-width: 1000px" />

组件编辑器面板位于页面的右侧，分为以下几个功能区块

## 组件层级

组件层级，以面包屑的形式，展示了包含当前组件，往上3层的组件层级。如上图所示，当前编辑的是`Radio`组件，可点击面包屑元素切换组件，切换到父组件`FormItem`，或者切换到父父组件`Form` 。也可以通过设计区域内选中组件的快捷操作栏的层级切换功能进行组件切换。

<img src="/switchLayer.png" class="globalImg" style="width:100%;max-width: 1000px" />

## 组件常用操作区域

目前只开放了`删除`功能

## 组件ref

组件的ref值，在本地开发模式中，可以在页面入口组件的任意函数中通过ref获取任意组件的实例，从而获取组件的内部数据或者调用组件定义的函数。

## 属性tab

组件的属性编辑器会渲染在`属性tab`的容器中

## 样式tab

用于编辑组件的样式，包括行内样式(源码)编辑和常见的布局(margin/padding)、背景色、边框、圆角样式编辑

<img src="/styleEditor.png" class="globalImg" style="width:100%;max-width: 280px" />

### 行内样式编辑

与正常书写css代码一样，操作演示如下：

<video controls autoplay loop muted style="width: 100%;max-width: 1200px">
  <source src="/styleEditor.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


## 事件tab

事件绑定操作在此tab下进行

## 更多tab

目前更多tab只开放了配置组件“是否渲染”功能。

搭建的页面上线后，每个组件都有可能根据页面入口组件的数据状态来决定是否渲染。

是否渲染可以使用`switch`开关进行切换，也可以通过表达式绑定，进行动态设置。

::: tip
编辑模式下，无论是否设置为true，始终都会渲染组件。预览模式或者线上模式，设置为false时，则不会渲染组件
:::

<img src="/moreTab.png" class="globalImg" style="width:100%;max-width: 1000px" />
