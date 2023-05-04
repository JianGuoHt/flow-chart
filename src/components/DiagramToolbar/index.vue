<template>
  <div class="diagram__toolbar" :style="toolbarStyle">
    <Logo />
    <div class="tool-list">
      <div class="flex">
        <FileMore />
        <Save />
      </div>
      <div class="flex">
        <SelectionSelect />
        <LineType />
        <LineWidth />
        <ArrowType />
        <MiniMap />
        <Transform />
      </div>
      <div class="flex"></div>
    </div>
  </div>
</template>

<script>
import { headerHeight } from "../config";
import Logo from "./Logo.vue";
import ArrowType from "./ArrowType.vue";
import LineType from "./LineType.vue";
import LineWidth from "./LineWidth.vue";
import MiniMap from "./MiniMap.vue";
import SelectionSelect from "./SelectionSelect.vue";
import Save from "./Save.vue";
import FileMore from "./FileMore.vue";
import Transform from "./Transform.vue";

export default {
  components: {
    Logo,
    LineType,
    SelectionSelect,
    ArrowType,
    MiniMap,
    LineWidth,
    Save,
    FileMore,
    Transform,
  },

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
  display: flex;

  .flex {
    display: flex;
  }
}

.tool-list {
  flex: 1;
  display: flex;
  height: 100%;
  // justify-content: center;
  justify-content: space-between;

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
