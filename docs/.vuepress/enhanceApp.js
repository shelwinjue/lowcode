import Vue from 'vue';
import Antd from 'ant-design-vue';

import 'prismjs/themes/prism-okaidia.css';

import 'ant-design-vue/dist/antd.css';
import '@zjlabvis/lowcode-index/dist/jianweiComponents.css';
if (typeof window !== 'undefined') {
  window.global = window;
}
Vue.use(Antd);
