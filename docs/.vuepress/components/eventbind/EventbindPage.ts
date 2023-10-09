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
                  id: '7b40ed05-5b83-11ee-95e2-7be9236eaf56',
                  refId: 4,
                },
              ],
              props: {},
              id: '7b40ed04-5b83-11ee-95e2-7be9236eaf56',
              refId: 3,
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
    showComponentList: true,
  };

  /** 页面级数据 */
  private pageData: any = {
    title: '低代码标题示例',
  };

  public showInfo() {
    (this as any).$message.info('This is test message');
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
