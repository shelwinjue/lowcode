# 低代码组件

## 接收的属性

框架层会向每个组件传递以下属性

| 字段        | 说明        | 类型     | required | 默认值   | 备注 |
|:-----|:-----|:-----|:-----|:-----|:-----|
| componentId | 组件的id | `string` |  |  | | 
| pageData | 低代码页面入口组件的pageData  | `object` |  |  |  |
| editorContainerSelector | 属性编辑器的DOM节点挂载的容器对应的css选择器 | `string` |  |  |  | 
| editorVisible | 属性编辑器是否可见 | `boolean` |  | `false` |  |
| mode | 当前页面的编辑模式 | `string` | | | |
| lowcodeEditorConfig | 当前低代码页面的配置对象 | `object` | | | | 
| componentSchema | 当前组件对应的组件协议，`{props: {}, componentName: ''}` | `object` | | | |
| findNearestParentByName | 通过组件选项里的name属性查找最近的父实例 | `(name: string) => vm` | | | |

`findNearestParentByName`：在低代码页面范围内，通过组件选项里的name属性查找最近的父组件实例

示例如下：

父组件parent.vue

```vue
<template>
	<div><Sub /></div>
</template>
<script>
import Sub from 'sub.vue';
export default {
	// 指定name
	name: 'Block'
	props: {
	},
	components: {
		Sub
	}
}

</script>
```

子组件sub.vue

```vue
<template>
	<div>子组件</div>
</template>
<script>

export default {
	
	props: {
		findNearestParentByName: Function
	},
	components: {
		Sub
	},
	created() {
		// 根据指定name返回最近父组件的实例，从而可以访问父实例的任何属性和方法
		const blockVm = this.findNearestParentByName('Block');
	}
}

</script>
```

## 事件

### onPropsChange

组件内部可以通过触发事件onPropsChange修改props中的属性

```js
this.$emit('onPropsChange', {
  propA: true
});
```

