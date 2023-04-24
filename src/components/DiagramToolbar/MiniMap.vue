<template>
  <div class="tool-item" :class="[state ? 'is_active' : '']" @click="onChangeState">
    <i class="iconfont icon-suoxiaoditu"></i>
    <span>小地图</span>
  </div>
</template>

<script>
import lf from "../mixin/lf";

export default {
  mixins: [lf],

  data() {
    return {
      state: false,
    };
  },

  methods: {
    onChangeState() {
      const lf = this.lf;
      if (this.state) {
        this.state = false;
        lf.extension.miniMap.hide();
      } else {
        this.state = true;
        lf.extension.miniMap.show(0, 0);
      }
    },
  },
};
</script>
