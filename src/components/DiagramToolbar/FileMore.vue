<template>
  <el-dropdown class="lf__popper" placement="bottom-start" @command="onTriggerOption">
    <div class="tool-item">
      <i class="iconfont icon-wenjianjia"></i>
      <span>文件</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="openFile">打开文件</el-dropdown-item>

      <el-dropdown-item command="exportJson" divided>下载为json文件</el-dropdown-item>
      <!-- FIXME: 数据转换错误，暂时隐藏，待修复 -->
      <el-dropdown-item command="exportXml">下载为xml文件</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import FileSaver from "file-saver";
import lf from "../mixin/lf";
import { lfJson2Xml, lfXml2Json } from "@logicflow/extension";
import { createFileInput, getFileExtension } from "../utils";

export default {
  mixins: [lf],

  data() {
    return {
      // FIXME: xml数据转换错误
      whiteExt: ["json", "xml"], //"xml"
    };
  },

  computed: {
    acceptExtString() {
      return this.whiteExt.map((item) => "." + item).toString();
    },
  },

  methods: {
    onTriggerOption(command) {
      switch (command) {
        case "exportJson":
          this.exportJson();
          break;
        case "exportXml":
          this.exportXml();
          break;
        case "openFile":
          this.$confirm("系统将不会保存您的更改，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.openFile();
            })
            .catch(() => {});
          break;
      }
    },

    // 打开文件
    openFile() {
      const _this = this;
      const { lf } = this;
      // 合法的文件类型
      // FIXME: xml数据转换错误
      const whiteExt = this.whiteExt;

      createFileInput({
        accept: this.acceptExtString,
      }).then(({ fileList }) => {
        const file = fileList[0];
        const ext = getFileExtension(file.name);

        if (!whiteExt.includes(ext)) {
          _this.$message({
            type: "error",
            message: "仅支持 [ " + whiteExt.join(" , ") + " ] 文件",
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = function () {
          const result = reader.result;
          let jsonResult;

          if (ext === "json") {
            jsonResult = JSON.parse(result);
          } else if (ext === "xml") {
            // FIXME: 转换错误
            jsonResult = lfXml2Json(result);
          }

          lf.clearData();
          lf.render(jsonResult);
          lf.resetTranslate();
        };
        reader.readAsText(file, "utf-8");
      });
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
      console.log(xml);
      var blob = new Blob([xml], { type: "text/xml;charset=utf-8" });
      FileSaver.saveAs(blob, "flow.xml");
    },
  },
};
</script>

<style lang="scss" scoped></style>
