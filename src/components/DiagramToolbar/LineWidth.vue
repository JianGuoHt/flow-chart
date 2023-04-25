<template>
  <el-popover placement="bottom" width="80" trigger="hover">
    <div slot="reference" class="tool-item">
      <span>{{ lineWidth }}</span>
      <span>线宽</span>
    </div>

    <el-input-number
      v-model="lineWidth"
      controls-position="right"
      size="small"
      :min="1"
      :max="10"
      style="width: 100%"
      @change="onChangeLineWidth"
    ></el-input-number>
  </el-popover>
</template>

<script>
import lf from "../mixin/lf";
import { defaultLineWidth } from "../config/edge";

export default {
  mixins: [lf],

  data() {
    return {
      lineWidth: Number(localStorage.getItem("LF_edgeBorderWidth")) || defaultLineWidth,
    };
  },

  computed: {},

  methods: {
    onChangeLineWidth(val) {
      localStorage.setItem("LF_edgeBorderWidth", val);

      const { edges } = this.lf.getSelectElements();
      edges.forEach((edge) => {
        this.lf.setProperties(edge.id, { borderWidth: val });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
