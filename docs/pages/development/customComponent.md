# 自定义组件说明

## 接收的属性

框架层会向每个组件传递以下属性

| 字段        | 说明        | 类型     | required | 默认值   | 备注 |
|:-----|:-----|:-----|:-----|:-----|:-----|
| componentId | 组件的id | `string` |  |  | | 
| pageData | 入口文件的pageData  | `object` |  |  |  |
| editorContainerSelector | 属性编辑器的父节点对应的css选择器 | `string` |  |  |  | 
| editorVisible | 属性编辑器是否可见 | `boolean` |  | `false` |  |
| mode | 当前页面的编辑模式 | `string` | | | |
| lowcodeEditorConfig | 当前低代码页面的配置对象 | `object` | | | | 
| componentSchema | 当前组件对应的组件协议，`{props: {}, componentName: ''}` | `object` | | | |
| findNearestParentByName | 通过组件选项里的name属性查找最近的父实例 | `function` | | | |