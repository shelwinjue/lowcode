# 低代码页面入口组件

页面入口组件的代码示例如下：

```js
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  pageContainerUtils,
  Block,
  Row,
  Col,
  Button,
  ButtonEditor,
} from '@zjlabvis/lowcode-index';

const DEFAULT_PAGE_SCHEMA = {
  version: '0.1.0',
  componentsTree: [
    {
      componentName: 'Page',
      props: {},
      children: [
        {
          componentName: 'Block',
          props: {
            defaultLayout: [
              {
                flex: 1,
                cols: [
                  {
                    flex: 1,
                  },
                ],
              },
            ],
          },
          children: [
            {
              componentName: 'Row',
              children: [
                {
                  componentName: 'Col',
                  children: [],
                  props: {},
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

@Component({
  name: 'appPage',
})
export default class LowcodePage extends Vue {
  /** 组件映射 */
  @Prop({
    default() {
      return {
        Block,
        Row,
        Col,
        Button
      };
    },
  })
  private componentsMap: any;

  /** 组件编辑器映射 */
  @Prop({
    default() {
      return {
        Button: ButtonEditor
      };
    },
  })
  private editorMap?: any;
  /** 传入的页面schema */
  @Prop() private pageSchema: any;

  /** 组件库配置 */
  @Prop({
    default() {
      return {
        Button: {
          title: '按钮',
          icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
          group: '系统',
          category: '基础组件',
        }
      };
    },
  })
  private componentsConfig: any;

  /** 最新的页面schema */
  private curPageSchema: any = {};

  /** 当前模式 */
  @Prop({ default: 'edit' }) private mode!: string;

  /** 请保留 */
  private lowcodeEntryFilePath = '${LOWCODE_ENTRY_FILE_PATH}';

  /** 低代码编辑器配置和内部状态 */
  private lowcodeEditorConfig = {
    showLayoutTool: true,
    disableLayoutResize: this.mode === 'preview',
    showEditorEnhanceTool: true,
    isPageAutoHeight: true,
    isSetterPinned: true,
    showWidthSliderTool: true,
    showHeader: false,
    showCodeEditorIcon: false,
    showOnBoarding: false,
  };

  /** 页面级数据 */
  private pageData: any = {};

  private created() {
    this.curPageSchema = JSON.parse(
      JSON.stringify(this.pageSchema || DEFAULT_PAGE_SCHEMA || {})
    );
  }

  private render() {
    return pageContainerUtils.render(this.$createElement, this);
  }
}

```

低代码页面入口组件使用tsx语法，组件内部定义了几个属性(componentsMap、editorMap、pageSchema、componentsConfig和mode)，定义了几个状态数据(curPageSchema、lowcodeEditorConfig、pageData)，另外还定义了生命周期函数created，以及渲染函数render，还有特殊字段lowcodeEntryFilePath

接收的属性包括以下几个：

## 属性

### componentsMap

- 类型：Object
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

- 类型：Object
- 非必须

表示组件名和组件的属性编辑器的映射关系。组件的属性编辑器有两种方式声明渲染：

1. 在低代码页面入口组件中引入组件的属性编辑器，然后配置在editorMap中，低代码框架内部会在合适的时机将它渲染组件的编辑面板中。
2. 在组件内部引入它对应的属性编辑器，必须使用`Portal`组件包裹，`Portal`内部会将属性编辑器对应的DOM挂载到组件的编辑面板中。

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

低代码框架在渲染组件时，会传递一些属性，比如示例代码中出现的`editorVisible`、`editorContainerSelector`。

`editorVisible`: 表示当前组件是否被选中编辑，等于`true`时，表示当前组件被选中，请务必加上指令`v-show="editorVisible"`

`editorContainerSelector`: css选择器，表示组件的属性编辑器对应的DOM将挂载在该css选择器对应的DOM节点下

从代码中可以看到，属性编辑器Editor被<span class="primaryText">Portal</span>组件包裹，是因为Portal内部会将其children对应的DOM节点挂载到指定的节点下。

另外，还需要监听属性编辑器组件的change事件，将最新的属性键值对作为事件参数，触发`onPropsChange`事件，低代码框架层会接收该事件并触发组件重新渲染。

2. 我们再来看下属性编辑器(editor.vue)应该怎么写，代码示例如下：

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

属性编辑器组件，其实就是一个表单，每个表单项对应着组件的一个属性，比如上面的`Paragraph`组件中定义的属性text，当表单的值有变化时，触发`change`事件，将属性名和属性值组成的键值对作为事件参数即可。属性的动态设置(表达式绑定)，还有组件的事件绑定，后续文档会详细说明。



### pageSchema

- 类型：Object
- 非必须

可以在入口组件的`created`方法中看出，初始化时，优先取属性`pageSchema`，如果pageSchema为空，则取`DEFAULT_PAGE_SCHEMA`

详细介绍，请参阅[低代码页面协议](./pageSchema.md)

### componentsConfig

- 类型：Object
- <span class="primaryText">**必须**</span>

组件库面板配置

<img src="/components-config.png" class="globalImg" style="width: 240px" />

componentsConfig用来配置低代码页面处于编辑态时左侧组件库面板的展示内容。

示例如下： 

```js
{
  Button: {
    title: '按钮',
    icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
    group: '系统',
    category: '基础组件'
  },
  Input: {
    title: '输入框',
    icon: 'https://img.alicdn.com/tfs/TB1ysp3u8v0gK0jSZKbXXbK2FXa-112-64.png',
    group: '系统',
    category: '表单',
    defaultSchema: () => {
      return {
        componentName: 'Input',
        props: {},
        children: []
      };
    }
  }
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
| defaultSchema | 如果defaultSchema不为空，当组件拖入设计区域后，将以该函数返回的结果作为组件的默认协议，可以通过这种方式设置props的默认值 | `function` |非必须| 空 | 函数体返回的结果需要遵循组件的协议定义，组件的通用协议可[参阅文档](./pageSchema.md)|


### mode

- 类型：string
- <span class="primaryText">**必须**</span>

表示当前低代码页面的模式，其中`edit`表示编辑模式，`preview`表示预览模式。

- 编辑模式：页面处于设计编辑模式时，左侧工具栏(组件库/页面数据/页面入口js)可见，组件可以进行属性编辑，拖拽操作等
- 预览模式：页面不可编辑

## data

页面状态数据的定义，需要包括以下几个：

### curPageSchema

- 类型：Object
- <span class="primaryText">**必须**</span>

最新的页面协议，与属性中定义的pageSchema不同，当组件有变更时(拖拽或者属性发生变化)，会同步更新curPageSchema，但不会修改props中定义的pageSchema

### lowcodeEditorConfig

- 类型：Object
- <span class="primaryText">**必须**</span>

对象包含以下属性：

| 字段        | 说明        | 类型     | required | 默认值   | 备注 |
|:-----|:-----|:-----|:-----|:-----|:-----|
| disableLayoutResize | 是否禁用行容器(Row)和列容器(Col)的resize行为 | `boolean` |  | `false` | | 
| showLayoutTool | 编辑模式下，是否展示插入行，插入列等功能操作 | `boolean` | | `false` | |
| showEditorEnhanceTool | 编辑模式下，是否展示功能操作，包括(左侧工具栏、组件选中时悬浮在组件右上方/右下方的组件操作工具栏、组件选中时的移动图标) | `boolean` | ✅ | `false` | |
| isPageAutoHeight | 页面是否是自适应高度，当等于`false`时，表示将撑满父容器，等于`true`时，表示页面的高度由子组件对应的DOM节点的渲染高度决定 | `boolean` | ✅  | `false`| |
| isSetterPinned | 编辑模式下，组件的属性编辑面板是否常驻展示 | `boolean` | ✅ | `false` | |
| showWidthSliderTool | 编辑模式下，是否展示设计区域的宽度滑动调节bar | `boolean` | ✅  | `false`| |
| showHeader | 编辑模式下，是否展示顶部工具栏 | `boolean` | ✅ | `false` | |
| showCodeEditorIcon | 编辑模式下，是否展示页面入口组件的源码编辑器 | `boolean` | | `false` | |
| showOnBoarding | 编辑模式下，是否展示使用指引 | `boolean` | | `false` | 当设置为`true`，且页面入口组件包含`renderOnBoarding`函数定义时，那么将渲染该使用引导UI |

### pageData

- 类型：Object
- <span class="primaryText">**必须**</span>

页面级数据，框架层依赖pageData，做了以下几件事：
1. 框架层会将`pageData`，作为属性，传递给每个子组件，这样每个子组件都可以访问到顶层页面入口组件的`pageData`，子组件接收的属性，[请查看详细说明](./customComponent.md)
2. 左侧工具栏中的页面数据编辑功能（新增字段/删除字段），修改的是`pageData`


### created

created函数应该至少包含以下代码，用来初始化curPageSchema

```js
private created() {
  this.curPageSchema = JSON.parse(
    JSON.stringify(this.pageSchema || DEFAULT_PAGE_SCHEMA || {})
  );
}

```

### render

render函数应该至少包含以下代码，通过`pageContainerUtils.render`返回vnode
```js
private render() {
  return pageContainerUtils.render(this.$createElement, this);
}
```

## 保留的特殊变量

### DEFAULT_PAGE_SCHEMA 

它有两个作用：
1. 它是默认的页面协议，如果属性`pageSchema`为空，将使用`DEFAULT_PAGE_SCHEMA`的协议内容进行渲染。
2. 当启用了左侧工具栏中的页面入口组件的源码编辑功能，即处于本地开发模式，对组件属性的编辑操作，或者对页面入口组件源码的编辑操作，会同步更新原文件中`DEFAULT_PAGE_SCHEMA`的内容


### lowcodeEntryFilePath

请保留该变量和变量的值，不要更改。当处于本地开发模式时，构建插件会寻找该关键字，并替换成本地文件的相对路径，从而实现页面入口文件`双端(web端和本地)同步`功能。








