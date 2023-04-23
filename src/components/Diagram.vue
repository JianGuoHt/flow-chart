<template>
  <div class="diagram__view">
    <!-- 侧边栏 -->
    <DiagramSidebar @drag-in-node="onDragInNode" />

    <!-- 主要区域 -->
    <div class="diagram__main">
      <!-- 顶部工具栏 -->
      <DiagramToolbar />

      <div class="main__content" ref="diagram"></div>
    </div>
    <!-- 右侧属性面板 -->
    <DiagramPropertyPanel v-if="isInit" />
  </div>
</template>

<script>
import LogicFlow from "@logicflow/core";
import { SelectionSelect } from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";

import "./assets/styles/index.scss";

import DiagramSidebar from "./DiagramSidebar.vue";
import DiagramPropertyPanel from "./DiagramPropertyPanel";
import DiagramToolbar from "./DiagramToolbar";

import { defaultEdgeType } from "./config";

import { registerCustomElement } from "./node";

export default {
  name: "Diagram",

  components: { DiagramSidebar, DiagramPropertyPanel, DiagramToolbar },

  provide() {
    const provider = {};
    const self = this;
    Object.defineProperty(provider, "root", {
      enumerable: true,
      get: () => self,
    });
    return provider;
  },

  data() {
    return {
      /**
       * @type {LogicFlow}
       */
      lf: "",
    };
  },

  computed: {
    isInit() {
      return this.lf instanceof LogicFlow;
    },
  },

  mounted() {
    this.initLogicFlow();
  },

  methods: {
    // 初始化 LogicFlow
    initLogicFlow() {
      LogicFlow.use(SelectionSelect);

      const lf = new LogicFlow({
        container: this.$refs.diagram,
        overlapMode: 1,
        autoWrap: true,
        metaKeyMultipleSelected: true,
        keyboard: {
          enabled: true,
        },
        grid: {
          visible: false,
          size: 5,
        },
        background: {
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")',
          backgroundRepeat: "repeat",
          backgroundColor: "#f4f4f4",
        },
      });

      lf.setTheme({
        baseEdge: { strokeWidth: 1 },
        baseNode: { strokeWidth: 1 },
        nodeText: { overflowMode: "autoWrap", lineHeight: 1.5, fontSize: 12 },
        edgeText: { overflowMode: "autoWrap", lineHeight: 1.5, fontSize: 12 },
      });

      // 注册自定义形状
      registerCustomElement(lf);

      lf.render();

      // 设置默认 edge
      lf.setDefaultEdgeType(defaultEdgeType);

      this.lf = lf;
    },

    onDragInNode(type) {
      this.lf.dnd.startDrag({
        type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.diagram__view {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.diagram__main {
  flex: 1;
  display: flex;
  flex-direction: column;

  .main__content {
    flex: 1;
  }
}
</style>
