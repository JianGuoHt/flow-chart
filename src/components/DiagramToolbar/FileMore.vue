<template>
  <el-dropdown class="lf__popper" placement="bottom-start" @command="onTriggerOption">
    <div class="tool-item">
      <i class="iconfont icon-wenjianjia"></i>
      <span>文件</span>
      <input v-show="false" ref="fileRef" type="file" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="importFile">导入</el-dropdown-item>

      <el-dropdown-item command="exportJson" divided>下载为json文件</el-dropdown-item>
      <el-dropdown-item command="exportXml">下载为xml文件</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import FileSaver from "file-saver";
import lf from "../mixin/lf";
import { lfJson2Xml } from "@logicflow/extension";

export default {
  mixins: [lf],

  methods: {
    onTriggerOption(command) {
      switch (command) {
        case "exportJson":
          this.exportJson();
          break;
        case "exportXml":
          this.exportXml();
          break;
        case "importFile":
          this.importFile();
          break;
      }
    },

    // 导入文件
    importFile() {
      //TODO
      const { fileRef } = this.$refs;
      fileRef.click();
      fileRef.onchange = function () {
        const file = fileRef.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.onload = function () {
          const result = reader.result;
          console.log(result);
        };
        reader.readAsText(file, "utf-8");
      };
    },

    // 下载为json文件
    exportJson() {
      const jsonData = this.lf.getGraphData();
      var blob = new Blob([JSON.stringify(jsonData)], { type: "application/json;charset=utf-8" });
      FileSaver.saveAs(blob, "flow.json");
    },

    // 下载为xml文件
    exportXml() {
      const jsonData = this.lf.getGraphData();
      const xml = lfJson2Xml(jsonData);
      var blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
      FileSaver.saveAs(blob, "flow.xml");
    },
  },
};
</script>

<style lang="scss" scoped></style>
