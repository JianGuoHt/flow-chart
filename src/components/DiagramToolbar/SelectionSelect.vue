<template>
  <div class="tool-item" :class="[state ? 'is_active' : '']" @click="onChangeState">
    <i class="iconfont icon-kuangxuan"></i>
    <span>框选</span>
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
      if (this.state) {
        this.state = false;
        this.lf.extension.selectionSelect.closeSelectionSelect();
      } else {
        this.state = true;
        this.lf.extension.selectionSelect.openSelectionSelect();
      }
    },
  },
};
</script>
