<template>
  <div class="diagram__sidebar" :style="sidebarStyle">
    <el-scrollbar style="height: 100%">
      <el-collapse v-model="activeCollapseNames">
        <el-collapse-item title="General" name="general">
          <div class="node-category-list">
            <div
              v-for="node in iconNodes"
              :key="node.type"
              class="node-item"
              @mousedown="dragInNode(node.type)"
            >
              <component class="svg-node" :is="node.component" />
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="图片" name="image">
          <div class="node-category-list">
            <div
              v-for="node in imageNodes"
              :key="node.type"
              class="node-item img-node-item"
              @mousedown="dragInNode(node.type)"
              :style="{
                backgroundImage: `url(${node.url})`,
              }"
            ></div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script>
import { headerHeight } from "./config";
import Circle from "./icon/Circle.vue";
import Rect from "./icon/Rect.vue";
import RectRadius from "./icon/RectRadius.vue";
import Triangle from "./icon/Triangle.vue";
import Ellipse from "./icon/Ellipse.vue";
import Diamond from "./icon/Diamond.vue";
import Cylinder from "./icon/Cylinder.vue";
import Actor from "./icon/Actor.vue";
import Parallelogram from "./icon/Parallelogram.vue";
import LeftArrow from "./icon/LeftArrow.vue";
import RightArrow from "./icon/RightArrow.vue";
import HorizontalArrow from "./icon/HorizontalArrow.vue";
import UpArrow from "./icon/UpArrow.vue";
import DownArrow from "./icon/DownArrow.vue";
import VerticalArrow from "./icon/VerticalArrow.vue";

export default {
  name: "DiagramSidebar",

  data() {
    return {
      activeCollapseNames: ["general", "image"],

      iconNodes: [
        {
          component: Circle,
          type: "pro-circle",
        },
        {
          component: Rect,
          type: "pro-rect",
        },
        {
          component: RectRadius,
          type: "pro-rect-radius",
        },
        {
          component: Triangle,
          type: "pro-triangle",
        },
        {
          component: Ellipse,
          type: "pro-ellipse",
        },
        {
          component: Diamond,
          type: "pro-diamond",
        },
        {
          component: Cylinder,
          type: "pro-cylinder",
        },
        {
          component: Actor,
          type: "pro-actor",
        },
        {
          component: Parallelogram,
          type: "pro-parallelogram",
        },
        {
          component: LeftArrow,
          type: "pro-left-arrow",
        },
        {
          component: RightArrow,
          type: "pro-right-arrow",
        },
        {
          component: HorizontalArrow,
          type: "pro-horizontal-arrow",
        },
        {
          component: UpArrow,
          type: "pro-up-arrow",
        },
        {
          component: DownArrow,
          type: "pro-down-arrow",
        },
        {
          component: VerticalArrow,
          type: "pro-vertical-arrow",
        },
      ],

      imageNodes: [
        {
          url: require("./assets/images/image.png"),
          type: "pro-custom-image",
        },
        {
          url: "https://dpubstatic.udache.com/static/dpubimg/-6Fd2uIoJ-/user.png",
          type: "pro-image-user",
        },
      ],
    };
  },

  computed: {
    sidebarStyle() {
      return {
        paddingTop: headerHeight + "px",
      };
    },
  },

  methods: {
    dragInNode(type) {
      this.$emit("drag-in-node", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.diagram__sidebar {
  position: absolute;
  z-index: 8;
  top: 0;
  left: 0;
  background-color: #ffffff;
  padding: 0 10px 10px 10px;
  width: 240px;
  height: 100%;
  user-select: none;

  ::v-deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
}
.node-category-list {
}
.node-item {
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-right: 5px;
  display: inline-block;
  text-align: center;
  line-height: 35px;

  &.img-node-item {
    width: 40px;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
}

.svg-node {
  width: 32px;
  height: 30px;
  display: block;
  overflow: hidden;
}
</style>
