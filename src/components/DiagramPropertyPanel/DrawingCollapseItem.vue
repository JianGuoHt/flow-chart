<template>
  <div class="collapse__item">
    <el-form v-model="form" label-width="80px" label-position="left" size="small">
      <!-- <el-collapse-item title="样式" name="style">
        <el-form-item label="背景色">
          <el-color-picker
            v-model="form.backgroundColor"
            show-alpha
            @change="setStyle"
          ></el-color-picker>
        </el-form-item>
      </el-collapse-item> -->
    </el-form>
  </div>
</template>

<script>
import lf from "../mixin/lf";

export default {
  mixins: [lf],

  data() {
    return {
      form: {
        backgroundColor: "",
      },
    };
  },

  methods: {
    setStyle() {},
  },
};
</script>
