<template>
  <div>
    <div
      class="testPortalContainer"
      :style="{ width: '100%', height: '300px', border: '1px solid black' }"
    ></div>
    <Portal containerSelector=".testPortalContainer">
      <div :style="{ width: '150px', height: '150px', background: 'orange' }">
        这是一段文本
      </div>
    </Portal>
    <CodeHelp :codeStr="code1" />
  </div>
</template>
<script>
import { Portal } from '@zjlabvis/lowcode-index';
import code1 from './PortalDemoCode/code1';
import CodeHelp from './CodeHelp.vue';
export default {
  data() {
    return {
      code1,
    };
  },
  components: {
    Portal,
    CodeHelp,
  },
};
</script>
