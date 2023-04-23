<template>
  <div class="diagram__property_panel" :style="panelStyle">
    <el-collapse v-model="activeCollapseNames">
      <StyleCollapseItem :activeNodes="activeNodes" :activeEdges="activeEdges" />
    </el-collapse>
  </div>
</template>

<script>
import { headerHeight } from "../config";
import lf from "../mixin/lf";
import StyleCollapseItem from "./StyleCollapseItem.vue";

export default {
  name: "DiagramPropertyPanel",

  mixins: [lf],

  components: { StyleCollapseItem },

  data() {
    return {
      visible: true,

      activeCollapseNames: ["style", "font", "image"],

      activeNodes: [],
      activeEdges: [],
    };
  },

  computed: {
    panelStyle() {
      return {
        paddingTop: headerHeight + 10 + "px",
      };
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
  position: fixed;
  top: 0;
  right: 0;
  z-index: 8;
  width: 230px;
  height: 100%;
  background-color: #ffffff;
  padding: 10px;
}

::v-deep(.el-form-item) {
  margin-bottom: 10px !important;

  .el-form-item__label {
    color: #7f838c;
  }
}
</style>
