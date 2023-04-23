<template>
  <el-dropdown placement="bottom" @command="onChangeArrowType">
    <div class="tool-item">
      <i class="iconfont" :class="[selTypeData.icon]"></i>
      <span>终点</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in ArrowTypes" :key="item.value" :command="item.value">
        <i class="iconfont" :class="[item.icon]"></i>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import lf from "../mixin/lf";
import { ArrowType } from "../node/edge/ArrowType";
import { defaultArrowType } from "../config/edge";

export default {
  mixins: [lf],

  data() {
    return {
      ArrowTypes: [],

      selType: localStorage.getItem("LF_endArrowType") || defaultArrowType,
    };
  },

  computed: {
    selTypeData() {
      return this.ArrowTypes.find((item) => item.value === this.selType) || {};
    },
  },

  mounted() {
    const cArrowType = new ArrowType();
    this.ArrowTypes = cArrowType.getShapeArr();
  },

  methods: {
    onChangeArrowType(command) {
      this.selType = command;
      localStorage.setItem("LF_endArrowType", command);
      const { edges } = this.lf.getSelectElements();

      edges.forEach((edge) => {
        this.lf.setProperties(edge.id, { arrowType: command });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
