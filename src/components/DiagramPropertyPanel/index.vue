<template>
  <div
    class="diagram__property_panel"
    :class="[activeLength ? 'is-active' : '']"
    :style="panelStyle"
  >
    <el-tabs v-model="activeTabName">
      <el-tab-pane v-if="drawingTabPaneShow" label="图纸" name="drawing">
        <el-scrollbar style="height: 100%">
          <el-collapse v-model="drawingActiveCollapseNames">
            <DrawingCollapseItem />
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>

      <el-tab-pane v-if="styleTabPaneShow" label="外观" name="style">
        <el-scrollbar style="height: 100%">
          <el-collapse v-model="styleActiveCollapseNames">
            <StyleCollapseItem
              :activeNodes="activeNodes"
              :activeEdges="activeEdges"
              :activeLength="activeLength"
            />
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { headerHeight } from "../config";
import lf from "../mixin/lf";
import DrawingCollapseItem from "./DrawingCollapseItem.vue";
import StyleCollapseItem from "./StyleCollapseItem.vue";

export default {
  name: "DiagramPropertyPanel",

  mixins: [lf],

  components: { StyleCollapseItem, DrawingCollapseItem },

  data() {
    return {
      visible: true,

      activeTabName: "drawing",
      drawingActiveCollapseNames: ["style"],
      styleActiveCollapseNames: ["style", "font", "image"],

      activeNodes: [],
      activeEdges: [],
    };
  },

  computed: {
    panelStyle() {
      return {
        paddingTop: headerHeight + "px",
      };
    },

    // 已选中节点的数量
    activeLength() {
      const nodeLength = this.activeNodes.length;
      const edgesLength = this.activeEdges.length;
      console.log("activeLength", nodeLength + edgesLength);
      return nodeLength + edgesLength;
    },

    // 是否显示图纸tab
    drawingTabPaneShow() {
      return this.activeLength === 0;
    },

    // 是否显示外观tab
    styleTabPaneShow() {
      return this.activeLength > 0;
    },
  },

  watch: {
    activeLength: {
      handler(n) {
        if (n > 0) {
          this.activeTabName = "style";
        } else {
          this.activeTabName = "drawing";
        }
      },
    },
  },

  mounted() {
    if (this.lf) {
      this.registerOnEvent();
    }
  },

  methods: {
    registerOnEvent() {
      this.lf.on("selection:selected,node:click,blank:click,edge:click", () => {
        this.$nextTick(() => {
          const { nodes, edges } = this.lf.getSelectElements();
          this.activeNodes = nodes;
          this.activeEdges = edges;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.diagram__property_panel {
  --width: 230px;
  position: absolute;
  top: 0;
  // right: calc(var(--width) * -1);
  right: 0;
  z-index: 8;
  width: var(--width);
  height: 100%;
  background-color: #ffffff;
  padding: 10px 0 10px 10px;
  transition: right 0.3s;
  overflow: hidden;
  box-shadow: 0 2px 4px #dad7d7;
  &.is-active {
    right: 0;
  }
}

.collapse__item {
  padding-right: 10px;
}

::v-deep(.el-form-item) {
  margin-bottom: 10px !important;

  .el-form-item__label {
    color: #7f838c;
  }
}

::v-deep(.el-tabs) {
  height: 100%;
  .el-tabs__content {
    height: calc(100% - 40px - 15px);
  }
  .el-tab-pane {
    height: 100%;
  }
  .el-tabs__item {
    color: #7f838c;
    &.is-active {
      color: #333333;
      font-weight: bold;
    }
  }
  .el-tabs__active-bar {
    background-color: #333333;
  }
  .el-tabs__nav-wrap::after {
    background-color: #f3f3f3;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
