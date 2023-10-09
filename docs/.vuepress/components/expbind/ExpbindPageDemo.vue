<template>
  <div>
    <div class="header">
      <div>当前状态：{{ mode === 'edit' ? '编辑态' : '预览态' }}</div>
      <a-button type="primary" @click="onPreviewClick" class="actionBtn">{{
        mode === 'edit' ? '预览' : '继续编辑'
      }}</a-button>
    </div>
    <div class="app">
      <Page
        key="edit"
        v-if="mode === 'edit'"
        :pageSchema="pageSchema"
        ref="lowcodePage"
      />
      <Page
        key="preview"
        :pageSchema="pageSchema"
        mode="preview"
        v-if="mode !== 'edit'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Page from './ExpbindPage';
import { pageContainerUtils } from '@zjlabvis/lowcode-index';

@Component({
  components: {
    Page,
  },
})
export default class App extends Vue {
  public pageSchema: any = null;
  public mode: 'edit' | 'preview' = 'edit';
  public onPreviewClick() {
    if (this.mode === 'edit') {
      this.mode = 'preview';
      this.pageSchema = pageContainerUtils.generatePageSchema({
        schema: (this.$refs.lowcodePage as any).curPageSchema,
      });
    } else {
      this.mode = 'edit';
    }
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  padding: 12px;
  .actionBtn {
    margin-left: 12px;
  }
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 700px;
}
</style>
