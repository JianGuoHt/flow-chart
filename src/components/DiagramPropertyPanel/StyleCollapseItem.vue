<template>
  <div>
    <el-form v-model="form" label-width="80px" label-position="left" size="small">
      <el-collapse-item title="样式" name="style">
        <el-form-item label="背景色">
          <el-color-picker
            v-model="form.backgroundColor"
            show-alpha
            @change="setStyle"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="线条样式">
          <el-select v-model="form.borderStyle" @change="setStyle">
            <el-option value="hidden" label="不显示"></el-option>
            <el-option
              v-for="border in borderStyles"
              :key="border.value"
              :value="border.value"
              :label="border.label"
            >
              <div class="border-style" :style="{ borderBottomStyle: border.value }"></div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线条颜色">
          <el-color-picker
            v-model="form.borderColor"
            show-alpha
            @change="setStyle"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="线条宽度">
          <el-input-number v-model="form.borderWidth" @change="setStyle"></el-input-number>
        </el-form-item>
        <el-form-item label="置顶">
          <el-button size="small" @click="setZIndex('top')">置顶</el-button>
        </el-form-item>
        <el-form-item label="置底">
          <el-button size="small" @click="setZIndex('bottom')">置底</el-button>
        </el-form-item>
      </el-collapse-item>

      <el-collapse-item title="文字" name="font">
        <el-form-item label="文字颜色">
          <el-color-picker v-model="form.fontColor" show-alpha @change="setStyle"></el-color-picker>
        </el-form-item>
        <el-form-item label="文字大小">
          <el-input-number v-model="form.fontSize" @change="setStyle"></el-input-number>
        </el-form-item>
        <el-form-item label="文字行高">
          <el-input-number
            v-model="form.lineHeight"
            :step="0.1"
            @change="setStyle"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="文字对齐">
          <el-select v-model="form.textAlign" @change="setStyle">
            <el-option value="left" label="左对齐"></el-option>
            <el-option value="center" label="居中"></el-option>
            <el-option value="right" label="右对齐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字字体">
          <el-select v-model="form.fontFamily" @change="setStyle">
            <el-option
              v-for="font in fontFamilyList"
              :key="font.value"
              :value="font.value"
              :label="font.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加粗">
          <el-select v-model="form.fontWeight" @change="setStyle">
            <el-option value="normal" label="正常"></el-option>
            <el-option value="bold" label="加粗"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="倾斜">
          <el-select v-model="form.fontStyle" @change="setStyle">
            <el-option value="normal" label="正常"></el-option>
            <el-option value="oblique" label="倾斜"></el-option>
          </el-select>
        </el-form-item>
      </el-collapse-item>

      <el-collapse-item v-if="imageCollapseShow" title="图片" name="image">
        <el-form-item label="图片地址">
          <el-input v-model="form.imageHref" placeholder="请输入内容" @change="setStyle"></el-input>
        </el-form-item>
      </el-collapse-item>
    </el-form>
  </div>
</template>

<script>
import lf from "../mixin/lf";
import { borderStyles, fontFamilyList } from "../config";
import { cloneDeep } from "lodash-es";

export default {
  mixins: [lf],

  props: {
    activeNodes: {
      type: Array,
      default: () => [],
    },
    activeEdges: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      borderStyles,
      fontFamilyList,

      form: {
        // 背景色
        backgroundColor: "",
        // 线条样式
        borderStyle: "solid",
        // 线条颜色
        borderColor: "#000000",
        // 线条宽度
        borderWidth: "1",
        // 文字颜色
        fontColor: "#000000",
        // 文字字体
        fontFamily: "",
        // 文字大小
        fontSize: 12,
        // 行高
        lineHeight: 1.5,
        // 文字对齐
        textAlign: "center",
        // 加粗
        fontWeight: "normal",
        // 字体样式
        fontStyle: "normal",
        // 图片地址
        imageHref: "",
      },

      // ! 不要更改该属性 !
      // 默认配置 初始化时继承自 form
      defaultForm: {},
    };
  },

  computed: {
    // 已选中节点的数量
    activeLength() {
      const nodeLength = this.activeNodes.length;
      const edgesLength = this.activeEdges.length;
      return nodeLength + edgesLength;
    },

    edgeAndNode() {
      return [].concat(this.activeEdges, this.activeNodes);
    },

    imageCollapseShow() {
      return this.activeLength === 1 && !this.edgeAndNode[0].type.includes("pro-image");
    },
  },

  watch: {
    activeLength: {
      handler(n) {
        // 没有选中一个节点
        if (n === 0) {
          return;
        }

        // 仅选中一个节点时
        if (n === 1) {
          const active = (this.activeNodes.length ? this.activeNodes : this.activeEdges)[0];
          this.initStyle(active.properties);
          return;
        }

        if (n > 1) {
          this.initStyle();
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.defaultForm = cloneDeep(this.form);
  },

  methods: {
    // 初始化单个节点的样式
    initStyle(properties = {}) {
      Object.keys(this.form).forEach((key) => {
        if (typeof properties[key] !== "undefined") {
          this.form[key] = properties[key];
        } else {
          this.form[key] = this.defaultForm[key];
        }
      });
    },

    // 调整样式
    setStyle() {
      this.edgeAndNode.forEach((item) => {
        this.lf.setProperties(item.id, this.form);
      });
    },

    // 设置 zIndex
    setZIndex(zIndex) {
      this.edgeAndNode.forEach((item) => {
        this.lf.setElementZIndex(item.id, zIndex);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.border-style {
  display: inline-block;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #333333;
}
</style>
