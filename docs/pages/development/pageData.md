# 页面数据

在[页面入口组件]('./entry.md')中，介绍了`pageData`，本章节将介绍位于左侧工具栏的页面数据编辑功能

::: tip
页面数据编辑功能，主要应用于<span class="primaryText">**非本地开发模式**</span>。页面搭建人员可以在pageData下新建字段，并设置初始值，在组件的属性编辑面板中关联该字段([表达式绑定](./createSetter.md#表达式绑定))，也可以用于事件绑定面板中关联[“修改pageData”](./eventBind.md#修改pagedata)时指定的字段。
:::

<img src="/lowcode-site/pageData.png" class="globalImg" style="width:100%;max-width: 200px" />

点击“页面数据”，将出现页面数据编辑抽屉，如下所示：

<img src="/lowcode-site/pageData-1.png" class="globalImg" style="width:100%;max-width: 700px" />

## 操作演示

新建字段`formData`，并设置初始值`{name: '苏轼', gender: 'male'}`，然后在两个文本组件的属性编辑器中进行绑定。


<video controls autoplay muted style="width: 100%;max-width: 1200px">
  <source src="/lowcode-site/pageData.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


## demo实操

<ClientOnly>
  <LowcodePageDemo />
</ClientOnly> 

