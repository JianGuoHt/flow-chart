<template>
  <el-dropdown placement="bottom" @command="onChangeLineType">
    <div class="tool-item">
      <i class="iconfont" :class="[selTypeData.icon]"></i>
      <span>{{ selTypeData.label }}</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in LineTypes" :key="item.value" :command="item.value">
        <span> {{ item.label }} </span>&nbsp;
        <i class="iconfont" :class="[item.icon]"></i>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import lf from "../mixin/lf";
import { defaultEdgeType } from "../config";
import { LineTypes } from "../config/edge";

export default {
  mixins: [lf],

  data() {
    return {
      LineTypes,

      selType: defaultEdgeType,
    };
  },

  computed: {
    selTypeData() {
      return this.LineTypes.find((item) => item.value === this.selType);
    },
  },

  methods: {
    // 切换连接线样式
    onChangeLineType(command) {
      this.selType = command;
      this.lf.setDefaultEdgeType(command);
      // 如果存在选在的线条，则同时进行更改
      const { edges } = this.lf.getSelectElements();
      edges.forEach((edge) => {
        this.lf.changeEdgeType(edge.id, command);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
