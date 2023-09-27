import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  pageContainerUtils,
  Block,
  Row,
  Col,
  Table,
  ImageBox,
  Icon,
  RichText,
  Button,
  ButtonEditor,
  Tabs,
  TabsEditor,
  Form,
  FormEditor,
  FormItem,
  FormItemEditor,
  Input,
  InputEditor,
  TextArea,
  TextAreaEditor,
  Text,
  TextEditor,
  Select,
  SelectEditor,
  Radio,
  RadioEditor,
  InputNumber,
  InputNumberEditor,
} from '@zjlabvis/lowcode-index';

const DEFAULT_PAGE_SCHEMA = {
  version: '0.1.0',
  componentsTree: [
    {
      componentName: 'Page',
      props: {
        customPageDataKeys: [
          {
            name: 'pageNum',
            value: '1',
          },
          {
            name: 'formData',
            value: '{ }',
          },
        ],
      },
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
              {
                flex: 1,
                cols: [
                  {
                    flex: 1,
                  },
                  {
                    flex: 1.8,
                  },
                ],
              },
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
                  children: [
                    {
                      componentName: 'Text',
                      id: '527a4160-5cf9-11ee-9354-c10d0fd1f438',
                      children: [],
                      refId: 25,
                      props: {
                        text: '新建表单',
                        display: 'inline',
                        style: {},
                        inlineCSS:
                          '#current {\ncolor: #1890ff;\nfont-weight: bold;\n}',
                      },
                    },
                    {
                      componentName: 'Text',
                      id: 'c0d4b1f0-5cfd-11ee-b6ac-0d019c2bda6f',
                      children: [],
                      refId: 35,
                      props: {
                        text: '当前表单值：',
                        style: {
                          marginLeft: '12px',
                        },
                      },
                    },
                  ],
                  props: {},
                  id: '7b40ed05-5b83-11ee-95e2-7be9236eaf56',
                  refId: 4,
                },
              ],
              props: {},
              id: '7b40ed04-5b83-11ee-95e2-7be9236eaf56',
              refId: 3,
            },
            {
              componentName: 'Row',
              id: '1434bb00-5cff-11ee-b6ac-0d019c2bda6f',
              children: [
                {
                  componentName: 'Col',
                  id: '1434bb01-5cff-11ee-b6ac-0d019c2bda6f',
                  children: [
                    {
                      componentName: 'Text',
                      id: 'daa08be0-5cfd-11ee-b6ac-0d019c2bda6f',
                      children: [],
                      refId: 36,
                      props: {
                        text: {
                          type: 'JSExpression',
                          value:
                            "'name:' + (this.pageData.formData.name ?? '')",
                        },
                        inlineCSS: '#current {\nmargin-left: 12px;\n}',
                      },
                    },
                  ],
                  refId: 42,
                  props: {},
                },
                {
                  componentName: 'Col',
                  id: '17f78f60-5cff-11ee-b6ac-0d019c2bda6f',
                  children: [
                    {
                      componentName: 'Text',
                      id: '0a89ddc0-5cfe-11ee-b6ac-0d019c2bda6f',
                      children: [],
                      refId: 37,
                      props: {
                        text: {
                          type: 'JSExpression',
                          value:
                            "'gender:' + (this.pageData.formData.gender ?? '')",
                        },
                      },
                    },
                  ],
                  refId: 43,
                },
              ],
              refId: 41,
            },
            {
              componentName: 'Row',
              id: 'f3317f60-5cfe-11ee-b6ac-0d019c2bda6f',
              children: [
                {
                  componentName: 'Col',
                  id: 'f3317f61-5cfe-11ee-b6ac-0d019c2bda6f',
                  children: [
                    {
                      componentName: 'Form',
                      id: '79e1d740-5cf9-11ee-9354-c10d0fd1f438',
                      children: [
                        {
                          componentName: 'FormItem',
                          id: '7ce50520-5cf9-11ee-9354-c10d0fd1f438',
                          children: [
                            {
                              componentName: 'Input',
                              id: '7f5da640-5cf9-11ee-9354-c10d0fd1f438',
                              children: [],
                              refId: 30,
                              props: {},
                            },
                          ],
                          refId: 29,
                          props: {
                            label: '姓名',
                            fieldName: 'name',
                          },
                        },
                        {
                          componentName: 'FormItem',
                          id: '8946e180-5cf9-11ee-9354-c10d0fd1f438',
                          children: [
                            {
                              componentName: 'Radio',
                              id: '956a5550-5cf9-11ee-9354-c10d0fd1f438',
                              children: [],
                              refId: 32,
                              props: {
                                options: {
                                  type: 'JSExpression',
                                  value:
                                    "[{ label: '男', value: 'male' }, {label: '女', value: 'female'}]",
                                },
                              },
                            },
                          ],
                          refId: 31,
                          props: {
                            label: '性别',
                            fieldName: 'gender',
                          },
                        },
                        {
                          componentName: 'FormItem',
                          id: 'b51d9150-5cf9-11ee-9354-c10d0fd1f438',
                          children: [
                            {
                              componentName: 'Button',
                              id: 'b7a96c50-5cf9-11ee-9354-c10d0fd1f438',
                              children: [],
                              refId: 34,
                              props: {
                                text: '提交',
                                type: 'primary',
                                __events: {
                                  eventDataList: [
                                    {
                                      name: 'click',
                                      relatedEventName: 'showInfo',
                                    },
                                  ],
                                },
                              },
                            },
                          ],
                          refId: 33,
                          props: {
                            label: '',
                            wrapperCol: {
                              type: 'JSExpression',
                              value: '{ offset: 6}',
                            },
                          },
                        },
                      ],
                      refId: 28,
                      props: {
                        labelCol: {
                          type: 'JSExpression',
                          value: '{ span: 6}',
                        },
                        wrapperCol: {
                          type: 'JSExpression',
                          value: '{ span: 18}',
                        },
                        __events: {
                          eventDataList: [
                            {
                              name: 'change',
                              relatedEventName: '__modifyPageData',
                              propName: 'formData',
                            },
                          ],
                        },
                      },
                    },
                  ],
                  refId: 40,
                },
              ],
              refId: 39,
            },
          ],
          id: '7b40ed03-5b83-11ee-95e2-7be9236eaf56',
          refId: 2,
        },
      ],
      id: '7b40ed02-5b83-11ee-95e2-7be9236eaf56',
      refId: 1,
    },
  ],
  startRefId: 44,
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
        Table,
        ImageBox,
        Icon,
        RichText,
        Button,
        Tabs,
        Form,
        FormItem,
        Input,
        Select,
        TextArea,
        Text,
        Radio,
        InputNumber,
      };
    },
  })
  private componentsMap: any;

  /** 组件编辑器映射 */
  @Prop({
    default() {
      return {
        Button: ButtonEditor,
        Tabs: TabsEditor,
        Form: FormEditor,
        FormItem: FormItemEditor,
        Select: SelectEditor,
        Input: InputEditor,
        TextArea: TextAreaEditor,
        Text: TextEditor,
        Radio: RadioEditor,
        InputNumber: InputNumberEditor,
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
        },
        Text: {
          title: '纯文本',
          icon: 'https://img.alicdn.com/imgextra/i3/O1CN01n5wpxc1bi862KuXFz_!!6000000003498-55-tps-50-50.svg',
          group: '系统',
          category: '文本',
        },
        ImageBox: {
          title: '图片',
          icon: 'https://img.alicdn.com/imgextra/i3/O1CN01tnhXhk1GUIFhsXwzA_!!6000000000625-55-tps-56-56.svg',
          group: '系统',
          category: '图片',
        },
        Icon: {
          title: '图标',
          icon: 'https://img.alicdn.com/imgextra/i1/O1CN01yR8vcY1M504YbHxzo_!!6000000001382-55-tps-56-56.svg',
          group: '系统',
          category: '图片',
        },
        RichText: {
          title: '富文本',
          icon: 'https://img.alicdn.com/imgextra/i3/O1CN01n5wpxc1bi862KuXFz_!!6000000003498-55-tps-50-50.svg',
          group: '系统',
          category: '文本',
        },
        Table: {
          title: 'table',
          icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
          group: '系统',
          category: '表格',
        },
        Tabs: {
          title: '选项卡',
          icon: 'https://img.alicdn.com/imgextra/i4/O1CN01mh9LPG268B90t8DaA_!!6000000007616-55-tps-56-56.svg',
          group: '系统',
          category: '容器',
          defaultSchema() {
            return {
              componentName: 'Tabs',
              props: {
                items: [
                  {
                    value: '标签项1',
                    key: '1',
                  },
                  {
                    value: '标签项2',
                    key: '2',
                  },
                  {
                    value: '标签项3',
                    key: '3',
                  },
                ],
              },
              children: [
                {
                  componentName: 'Block',
                  props: {
                    defaultLayout: [
                      {
                        flex: 1,
                        cols: [{ flex: 1 }],
                      },
                    ],
                  },
                  children: [
                    {
                      componentName: 'Row',
                      children: [
                        {
                          componentName: 'Col',
                        },
                      ],
                    },
                  ],
                },
              ],
            };
          },
        },
        Form: {
          title: '通用表单',
          icon: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/form-1.png',
          group: '系统',
          category: '表单',
        },
        FormItem: {
          title: '表单项',
          icon: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/form-item-1.jpg',
          group: '系统',
          category: '表单',
        },
        Input: {
          title: '输入框',
          icon: 'https://img.alicdn.com/tfs/TB1ysp3u8v0gK0jSZKbXXbK2FXa-112-64.png',
          group: '系统',
          category: '表单',
        },
        InputNumber: {
          title: '数字输入框',
          icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_number-picker.png',
          group: '系统',
          category: '表单',
        },
        TextArea: {
          title: 'textarea',
          icon: 'https://img.alicdn.com/tfs/TB1ysp3u8v0gK0jSZKbXXbK2FXa-112-64.png',
          group: '系统',
          category: '表单',
        },
        Select: {
          title: '下拉框',
          icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_select.png',
          group: '系统',
          category: '表单',
        },
        Radio: {
          title: '单选框',
          icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_radio.png',
          group: '系统',
          category: '表单',
        },
      };
    },
  })
  private componentsConfig: any;

  /** 最新的页面schema */
  private curPageSchema: any = {};

  /** 当前模式 */
  @Prop({ default: 'edit' }) private mode!: string;

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

  public showInfo() {
    (this as any).$message.info('普通提示');
  }

  public showSuccess() {
    (this as any).$message.success('成功提示');
  }

  private created() {
    this.curPageSchema = JSON.parse(
      JSON.stringify(this.pageSchema || DEFAULT_PAGE_SCHEMA || {})
    );
  }

  private render() {
    return pageContainerUtils.render(this.$createElement, this);
  }
}
