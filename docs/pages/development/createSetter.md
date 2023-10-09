# 开发组件的属性编辑器

## 属性编辑器说明

很多低代码平台是通过组件的json描述来生成组件的属性编辑器，这种方式存在一定的局限，特别是当属性编辑器包含一些复杂的业务逻辑或者字段联动逻辑时，纯json配置无法满足。大部分低代码平台组件协议如下：

```js
{
  name: 'Select',
  props: [
    {
      name: 'placeholder',
      setter: 'stringSetter',
    },
    {
      name: 'maxHeight',
      setter: 'numberSetter'
    }
  ],
}

```
比如上面这个自定义的下拉框组件`Select`，它定义了两个属性placeholder和maxHeight，`setter`表示该属性在属性编辑器里展示的组件，例如`stringSetter`对应输入框，`numberSetter`对应数字输入框。

这种方式，虽然便捷，但是稍微复杂一点的业务逻辑通过json无法描述，比如下拉框组件的选项列表，需要通过特定的业务接口请求然后过滤结果得到，这段逻辑放在组件的json描述中，是不太合适的。

所以，我们的低代码框架没有采用这种方式来生成组件的属性编辑器，而是采用源码的方式。

## 属性编辑器示例


比如文本组件Text对应属性编辑器editor.vue的示例代码如下：

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
export default class TextEditor extends Vue {
  @Prop({ default: '默认文案' }) public text!: string;

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

属性编辑器组件，其实就是一个表单，每个表单项对应着组件的一个属性，比如上面的`Text`组件中定义的属性text，当表单的值有变化时，触发`change`事件，将属性名和属性值组成的键值对作为事件参数即可。属性的动态设置(表达式绑定)，还有组件的事件绑定，后续文档会详细说明。

## 属性动态设置

框架内部提供了表达式绑定组件`ExpBind`来满足属性动态设置需求，代码示例如下：


```vue
<template>
  <a-form :form="form">
    <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input
      v-if="
            !(
              componentSchema.props &&
              componentSchema.props.text &&
              componentSchema.props.text.type === 'JSExpression'
            )
          "
        type="textarea"
        v-decorator="['text', { initialValue: text }]"
      />
      <ExpBind
        :config="componentSchema.props && componentSchema.props.text"
        @change="$emit('change', { text: $event })"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ExpBind } from '@zjlabvis/lowcode-index';

@Component({
  components: {
    ExpBind,
  },
})
export default class TextEditor extends Vue {
  @Prop({ default: '默认文案' }) public text!: string;

  @Prop({
    default() {
      return {};
    },
  })
  public componentSchema: any;

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

::: tip
组件属性是否绑定了表达式，通过它的`type`是否等于`JSExpression`来判断。在示例中，判断组件的属性text的type(`componentSchema.props.text.type`)是否等于`JSExpression`，如果相等，说明已绑定了表达式，不展示输入框组件`<a-input>`
:::


## 表达式绑定

演示demo如下：

<ClientOnly>
  <expbind-ExpbindPageDemo />
</ClientOnly> 

- 当属性没有绑定表达式，效果图如下：

<img src="/expbind.png" class="globalImg" style="width:100%;max-width: 900px" />



- 当点击表达式绑定组件时，弹出变量绑定弹框，效果图如下：

<img src="/expbind-1.png" class="globalImg" style="width:100%;max-width: 900px" />

在弹出的变量绑定弹框中，可以点击选择变量列表`pageData`的属性`title`，点击后表达式编辑器中出现`this.pageData.title`。


表达式编辑器中可以输入任何有效的js表达式，例如：
- new Date().getTime()
- 10
- 1 + 2
- 'b'
- 'a' + 'b'
- this.pageData.title + 'test'

::: tip
其内部实现是将表达式编辑器中的内容作为函数体，执行后取其返回的结果。其中`this`关键字会绑定为入口组件对应的vue实例对象。
:::


- 绑定后，属性编辑器中，表达式绑定组件将高亮展示

<img src="/expbind-2.png" class="globalImg" style="width:100%;max-width: 900px" />

- 取消表达式绑定

<img src="/expbind-3.png" class="globalImg" style="width:100%;max-width: 900px" />

在变量绑定弹框中，点击“移除绑定”即可




