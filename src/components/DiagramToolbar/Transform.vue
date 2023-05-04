<template>
  <el-popover placement="bottom" width="80" trigger="hover">
    <div slot="reference" class="tool-item">
      <span>{{ transformNum }}</span>
      <span>视图</span>
    </div>
    <div class="transform__view">
      <i class="iconfont icon-jianhao" @click="setZoom(-1)"></i>
      <i class="iconfont icon-jiahao" style="margin-left: 10px" @click="setZoom(1)"></i>

      <el-button size="mini" style="margin-left: 10px" @click="setReset">重置</el-button>
    </div>
  </el-popover>
</template>

<script>
import { Decimal } from "decimal.js";
import lf from "../mixin/lf";

export default {
  mixins: [lf],

  data() {
    return {
      transform: {},
    };
  },

  computed: {
    transformNum() {
      const { SCALE_X } = this.transform;
      return SCALE_X ? Decimal.mul(SCALE_X, 100).toFixed(0) : 100;
    },
  },

  mounted() {
    this.init();
    this.transform = this.getTransform();
  },

  methods: {
    init() {
      this.lf.on("graph:transform", (e) => {
        this.transform = e.transform;
      });
    },

    getTransform() {
      return this.lf.getTransform();
    },

    setZoom(to) {
      const lf = this.lf;
      const step = 0.1;
      const toZoom = Decimal.add(lf.getTransform().SCALE_X, Decimal.mul(step, to)).toNumber();

      this.lf.zoom(toZoom);
    },

    setReset() {
      this.lf.zoom(1);
      this.lf.resetTranslate();
    },
  },
};
</script>

<style lang="scss" scoped>
.transform__view {
  display: flex;
  justify-content: center;
  align-items: center;
  > i {
    cursor: pointer;
  }
}
</style>
