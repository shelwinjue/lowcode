# 事件绑定

低代码组件除了属性可编辑之外，还支持事件绑定，可以将组件支持的事件与页面级组件定义的函数进行绑定。

## 操作演示

打开组件库，向设计区域拖入一个`button`组件，在属性编辑器面板中，切换到事件tab进行事件绑定，将`button`的click事件与页面入口组件的函数`showInfo`进行绑定

<video controls autoplay muted style="width: 100%;max-width: 1200px">
  <source src="/eventbind.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## demo示例

<ClientOnly>
  <eventbind-EventbindPageDemo />
</ClientOnly> 

## 可绑定的函数列表

事件绑定弹框左侧变量列表有两个选项，一个是“自定义函数”，另一个是“修改pageData”

<img src="/eventbind-1.png" class="globalImg" style="width:100%;max-width: 700px" />

### 自定义函数

自定义函数是指低代码页面入口组件中定义的函数，比如demo示例中，页面入口组件的代码中定义了showInfo函数

```javascript
export default class LowcodePage extends Vue {
  // ...


  public showInfo() {
    this.$message.info('This is test message');
  }

  // ...
} 
```

### 修改pageData

框架层面提供了一个同步修改`pageData`的功能。比如：form表单组件，当表单数据变更时，表单组件内部会触发change事件，只需要将change事件和“修改pageData”绑定起来，就可以实现表单数据与`pageData`实时同步。

::: tip
绑定时，需要指定`pageData`对象中的某个字段，同步修改，更准确地说，是指修改`pageData`对象中的某个字段
:::


如下图所示，form表单组件，在绑定change事件时，选择了"修改pageData"，并指定了`pageData`的字段formData

<img src="/eventbind-2.png" class="globalImg" style="width:100%;max-width: 700px" />

效果demo如下：

<ClientOnly>
  <LowcodePageDemo />
</ClientOnly> 


## 在属性编辑器中指定事件绑定

一个低代码组件，哪些事件可以绑定，需要在组件的属性编辑器中指定，`Button`组件的代码示例如下：

editor.vue

```html
<template>
  <div>
    <a-form :form="form">
      <a-form-item label="按钮文案" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['text', { initialValue: text }]" />
      </a-form-item>
    </a-form>
    <EventBind
      :componentSchema="componentSchema"
      :eventList="['click']"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { EventBind } from '@zjlabvis/lowcode-index';

@Component({
  components: {
    EventBind,
  },
})
export default class ButtonEditor extends Vue {
  @Prop({ default: '按钮' }) public text!: string;
 
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

从上面的代码可以看出，指定组件哪些事件可以绑定，需要做以下几件事：
1. 引入`@zjlabvis/lowcode-index`中的`EventBind`组件
2. 给`EventBind`组件传递2个参数，并绑定`change`事件回调
- componentSchema: 组件的协议描述，[参见低代码组件属性说明](./customComponent.md)
- eventList: 事件字符串数组。比如: `Button`组件内部定义了`click`事件，那么这里的事件字符串就是`click`
- change事件：绑定的事件回调中再次触发change事件，并带上`EventBind`组件回传的事件参数