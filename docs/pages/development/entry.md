# 低代码页面入口文件

低代码页面入口文件使用tsx书写，定义了几个属性(componentsMap、editorMap、pageSchema、componentsConfig和mode)，定义了几个状态数据(curPageSchema、lowcodeEditorConfig、pageData)，另外还定义了生命周期函数created，以及渲染函数render，还有特殊字段lowcodeEntryFilePath

接收的属性包括以下几个：

## componentsMap

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


## editorMap

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

自定义创建一个低代码组件，比如文本段落组件

1. 新建组件paragraph.vue，代码如下：

```vue
<template>
  <p>
    {{text}}
    <Portal :containerSelector="editorContainerSelector">
      <Editor :text="text" v-show="editorVisible" @change="onPropsChange" />
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
export default class Paragraph extends Vue {
  @Prop({ default: false }) public editorVisible!: boolean;
  @Prop() public editorContainerSelector!: string;
  @Prop({ default: '段落' }) public text!: string;

  public onPropsChange(values: any) {
    this.$emit('onPropsChange', values);
  }
}
</script>
```

每个低代码组件都会接收来自低代码框架在渲染组件时传递的属性，比如示例代码中出现的`editorVisible`、`editorContainerSelector`。

`editorVisible`: 表示当前组件是否被选中编辑，等于`true`时，表示当前组件被选中，请务必加上指令`v-show="editorVisible"`

`editorContainerSelector`: css选择器，表示组件的属性编辑器对应的DOM将挂载在该css选择器对应的DOM节点下

从代码中可以看到，属性编辑器Editor被<span class="primaryText">Portal</span>组件包裹，是因为Portal内部会将其children对应的DOM节点挂载到指定的节点下。

另外，还需要监听属性编辑器组件的change事件，将最新的属性键值对作为事件参数，触发`onPropsChange`事件，低代码框架层会接收该事件并触发组件重新渲染。

2. 我们再来看下属性编辑器(editor.vue)应该怎么写，代码如下：

```vue
<template>
  <a-form :form="form">
    <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input
        type="textarea"
        v-decorator="['text', { initialValue: text }]"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ParagraphEditor extends Vue {
  @Prop({ default: '段落' }) public text!: string;

  public labelCol = { span: 10 };

  public wrapperCol = { span: 13 };

  public form: any = null;

  private created() {
    this.form = this.$form.createForm(this, {
      onValuesChange: (props, values) => {
        const newValues = JSON.parse(JSON.stringify(values));
        this.$emit('change', newValues);
      },
    });
  }
}
</script>
```

属性编辑器组件，其实就是一个表单，每个表单项对应着组件的一个属性，比如上面的`Paragraph`组件中定义的属性text，当表单的值有变化时，触发`change`事件，将属性名和属性值组成的键值对传递上去即可，属性编辑想动态设置，即表达式绑定，还有组件的事件绑定，后续文档会详细说明。



## pageSchema

非必须，可以在入口组件的`created`方法中看出，初始化时，优先取属性`pageSchema`，如果pageSchema为空，则取`DEFAULT_PAGE_SCHEMA`

详细介绍，请参阅[低代码页面协议](/pages/development/pageSchema)

## componentsConfig

组件库面板配置

<img src="/components-config.png" style="width: 240px" />

componentsConfig用来配置低代码页面处于编辑态时左侧组件库面板的展示内容。

示例如下： 

```js
{
  "Button": {
    "title": "按钮",
    "icon": "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png",
    "group": "系统",
    "category": "基础组件"
  },
  "Input": {
    "title": "输入框",
    "icon": "https://img.alicdn.com/tfs/TB1ysp3u8v0gK0jSZKbXXbK2FXa-112-64.png",
    "group": "系统",
    "category": "表单",
    "defaultSchema": () => {
			return {
				componentName: 'Input',
        prop: {},
				children: []
			};
		}
  },
}

```

key即组件名，比如 "Button", "Input"

value详细配置如下:

| 字段        | 说明        | 类型     | required | 默认值   | 备注 |
|:-----|:-----|:-----|:-----|:-----|:-----|
| title | 组件库面板中每个组件的名称 | `string` | ✅ | 空 | | 
| icon | 组件库面板中每个组件的图标  | `string` |✅| 空 | 图片外链地址或者base64字符串 |
| group | 组件库中tab分组的组名 | `string` | ✅ | 空 |  | 
| category | tab分组下所属的类别 | `string` | ✅ | 空 |  |
| defaultSchema | 组件拖入画布设计区域后组件默认生成的协议 | `function` |非必须| 空 | 函数体需要返回组件的协议内容，组件的通用协议可[参阅文档](/pageSchema.md)|




