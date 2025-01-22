<template>
  <div class="diagram__view">
    <template v-if="isInit">
      <!-- 侧边栏 -->
      <DiagramSidebar @drag-in-node="onDragInNode" />

      <!-- 顶部工具栏 -->
      <DiagramToolbar />

      <!-- 右侧属性面板 -->
      <DiagramPropertyPanel />
    </template>

    <!-- 主要区域 -->
    <div class="diagram__main">
      <div class="main__content" ref="diagram"></div>
    </div>

    <transition name="el-fade-in-linear">
      <div v-if="!isInit" class="diagram__loading">
        <img src="./assets/images/logo.png" height="150" alt="" />
        <p>Loading ...</p>
      </div>
    </transition>
  </div>
</template>

<script>
import LogicFlow from "@logicflow/core";
import { SelectionSelect, MiniMap, Snapshot, Group } from "@logicflow/extension";

import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";

import "./assets/styles/index.scss";

import DiagramSidebar from "./DiagramSidebar.vue";
import DiagramPropertyPanel from "./DiagramPropertyPanel";
import DiagramToolbar from "./DiagramToolbar";

import { defaultEdgeType } from "./config";

import { registerCustomElement } from "./node";

import { RightClickMenu } from "./plugins/RightClickMenu";

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
      const lf = new LogicFlow({
        plugins: [
          SelectionSelect,
          MiniMap,
          Snapshot,
          Group,
          // 右键菜单
          RightClickMenu,
        ],
        container: this.$refs.diagram,
        overlapMode: 1,
        autoWrap: true,
        metaKeyMultipleSelected: true,
        // 	自定义键盘相关配置
        keyboard: {
          enabled: true,

          shortcuts: [
            // delete键 -- 删除节点
            {
              keys: ["del", "delete"],
              callback: () => {
                const { edges, nodes } = lf.getSelectElements();

                edges.forEach((item) => {
                  lf.deleteEdge(item.id);
                });

                nodes.forEach((item) => {
                  lf.deleteNode(item.id);
                });
              },
            },
          ],
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
        snapline: {
          stroke: "#1890ff", // 对齐线颜色
          strokeWidth: 1, // 对齐线宽度
        },
      });

      // 注册自定义形状
      registerCustomElement(lf);

      lf.on("history:change", ({ data }) => {
        console.log(data);
      });

      lf.render();

      // 设置默认 edge
      lf.setDefaultEdgeType(defaultEdgeType);

      setTimeout(() => {
        this.lf = lf;
      }, 100);
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
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.diagram__main {
  height: 100%;
  width: 100%;
  padding-left: 240px;
  .main__content {
    height: 100%;
    width: 100%;
  }
}

.diagram__loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > p {
    letter-spacing: 8px;
    margin-top: 20px;
  }
}
</style>
