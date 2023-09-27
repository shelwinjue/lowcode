# 低代码页面入口文件

低代码页面入口文件使用tsx书写，定义了几个属性(componentsMap、editorMap、pageSchema、componentsConfig和mode)，定义了几个状态数据(curPageSchema、lowcodeEditorConfig、pageData)，另外还定义了生命周期函数created，以及渲染函数render，还有特殊字段lowcodeEntryFilePath

## 定义的属性

### componentsMap

- <span class="primaryText">**必须**</span>

表示组件名和组件的映射关系，即在页面协议中，componentName所对应的组件，key是组件名, value是组件，例如：

```js
import { Button, Text } from  '@zjlabvis/lowcode-index';
export default class LowcodePage extends Vue {
  @Prop({
      default() {
        return {
          Button,
          Text,
        };
      },
    })
  private componentsMap: any;

  private render() {
    // ...
  }

}

```
::: tip
请注意引入Block, Row, Col等内部布局组件
:::


### editorMap

非必须

表示组件名和组件的属性编辑器的映射关系。组件的属性编辑器有两种方式声明渲染：

1. 在低代码页面入口文件中引入组件的属性编辑器，然后配置在editorMap中，低代码框架内部会在合适的时机将它渲染在正确的地方。
2. 在组件中引入它对应的属性编辑器，使用`Portal`组件包裹，`Portal`组件内部会将属性编辑器对应的DOM挂载到它应该出现的地方。

<span class="primaryText">渲染方式一的示例如下：</span>
```js
import { ButtonEditor } from '@zjlabvis/lowcode-index';


export default class LowcodePage extends Vue {
  @Prop({
    default() {
      return {
        Button: ButtonEditor
      };
    },
  })
  private editorMap?: any;

  private render() {
    // ...
  }

}

```

<span class="primaryText">渲染方式二的示例如下：</span>

自定义低代码组件: 文本段落组件

paragraph.vue

```vue

<template>
<p>
  {{text}}
<Portal :containerSelector="editorContainerSelector">
  <Editor :text="text" v-show="editorVisible" />
</Portal>
</p>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Portal } from '@zjlabvis/lowcode-index';
import Editor from './editor.vue';


@Component({
  components: {
    Portal,
    Editor,
   
  },
})
export default class Button extends Vue {
  @Prop({ default: false }) public editorVisible!: boolean;
  @Prop() public editorContainerSelector!: string;

  @Prop({ default: '段落' }) public text!: string;
  
</script>
```


