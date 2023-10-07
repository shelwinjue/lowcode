# 低代码页面协议

协议示例如下：

```json
{
  "version": "0.1.0",
  "componentsTree": [
    {
      "componentName": "Page",
      "props": {},
      "children": [
        {
          "componentName": "Block",
          "props": {
            "defaultLayout": [
              {
                "flex": 1,
                "cols": [
                  {
                    "flex": 1
                  }
                ]
              }
            ]
          },
          "children": [
            {
              "componentName": "Row",
              "children": [
                {
                  "componentName": "Col",
                  "children": [
                    {
                      "componentName": "Paragraph",
                      "id": "527a4160-5cf9-11ee-9354-c10d0fd1f438",
                      "children": [],
                      "refId": 25,
                      "props": {
                        "text": "段落"
                      }
                    }
                  ],
                  "props": {},
                  "id": "7b40ed05-5b83-11ee-95e2-7be9236eaf56",
                  "refId": 4
                }
              ],
              "props": {},
              "id": "7b40ed04-5b83-11ee-95e2-7be9236eaf56",
              "refId": 3
            }
          ],
          "id": "7b40ed03-5b83-11ee-95e2-7be9236eaf56",
          "refId": 2
        }
      ],
      "id": "7b40ed02-5b83-11ee-95e2-7be9236eaf56",
      "refId": 1
    }
  ],
  "startRefId": 44
}

```

## 协议结构

协议最顶层的结构如下：

- version: `{string}` 当前协议版本号，后续如果协议有大的结构调整，会升级该版本号
- componentsTree: `{Array}` 描述低代码组件构成的组件树
- startRefId: `{number}` refId基数，它的值应该大于子组件refId的最大值

### Page

页面组件，组件树的顶层组件，低代码框架渲染层会渲染Page组件的children

### Block

区块容器，一个区块可以被拆分成多行多列

#### defaultLayout

Block组件的默认布局属性，表示其子组件`Row(行容器)`和`Col(列容器)`的flex布局配置等，可以参阅[详细文档](https://zj-jianwei.netlify.app/pages/components/GridInteract.html#api)

### 组件结构描述

每个组件都包含以下属性

| 字段        | 说明        | 类型     | required | 默认值   | 备注 |
|:-----|:-----|:-----|:-----|:-----|:-----|
| id | 组件唯一标识 | `string` | 非必须   | 空 | 如果id为空，框架内部会生成唯一的UUID，在组件发生拖拽移动时，id不会变更| 
| componentName | 组件名称 | `string` |✅| | |
| refId | 组件计数 | `number` | 非必须 | 空 | 框架内部会统一生成，保证协议内唯一 | 
| props | 组件属性对象 | `object` | ✅ | 空 | 属性值的类型没有约束 |
| children | 子组件列表 | `Array` |非必须| 空 | |





