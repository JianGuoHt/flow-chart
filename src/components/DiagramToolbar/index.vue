<template>
  <div class="diagram__toolbar" :style="toolbarStyle">
    <div class="tool-list">
      <SelectionSelect />
      <LineType />
      <ArrowType />
    </div>
  </div>
</template>

<script>
import { headerHeight } from "../config";
import ArrowType from "./ArrowType.vue";
import LineType from "./LineType.vue";
import SelectionSelect from "./SelectionSelect.vue";

export default {
  components: { LineType, SelectionSelect, ArrowType },

  data() {
    return {};
  },

  computed: {
    toolbarStyle() {
      return {
        height: headerHeight + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.diagram__toolbar {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  box-shadow: 0 2px 4px #dad7d7;
}

.tool-list {
  display: flex;
  height: 100%;
  justify-content: center;

  ::v-deep(.tool-item) {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 18px;
    padding: 0 5px;
    margin: 0 5px;
    height: 100%;
    font-size: 14px;
    color: #606266;
    &:hover,
    &.is_active {
      color: #1890ff;
    }
  }
}
</style>
