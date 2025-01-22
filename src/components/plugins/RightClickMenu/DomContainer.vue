<template>
  <transition name="el-fade-in-linear">
    <div v-show="show" class="lf-right-click-menu" :style="{ ...positionStyle }">
      <ul>
        <template v-for="(menuItem, menuIndex) in activeMenuTransform">
          <li :key="menuIndex" class="lf-right-click-menu-item" @click="onMenuItemClick(menuItem)">
            {{ menuItem.text }}
          </li>
          <li
            v-show="
              menuItem.type &&
              menuItem.type === 'divider' &&
              typeof activeMenuTransform[menuIndex + 1] !== 'undefined'
            "
            :key="'divider' + menuIndex"
            class="lf-right-click-menu-divider"
          ></li>
        </template>
      </ul>
    </div>
  </transition>
</template>

<script>
import ProGroup from "@/components/node/group/ProGroup";
// import { max, min } from "lodash-es";
import { getNodeOutline, getEdgeOutline } from "../../algorithm/outline";
export default {
  data() {
    return {
      /**
       * @type {import('@logicflow/core').LogicFlow}
       */
      lf: "",

      show: false,
      x: 0,
      y: 0,

      activeMenu: [],
      currentData: null,
      nodeMenu: [],
      edgeMenu: [],
      selectionMenu: [],
      graphMenu: [],
    };
  },

  computed: {
    positionStyle() {
      return {
        top: this.y + "px",
        left: this.x + "px",
      };
    },
    activeMenuTransform() {
      return this.activeMenu.filter((item) => !item.show || item.show(this.currentData));
    },
  },

  mounted() {
    this.init();
    this.initNode();
    this.initEdge();
    this.initSelection();
    this.initGraph();
  },

  methods: {
    init() {
      this.lf.on("node:mousedown", () => {
        this.show = false;
      });
      this.lf.on("edge:click", () => {
        this.show = false;
      });
      this.lf.on("blank:click", () => {
        this.show = false;
      });
    },

    // 初始化 -- node
    initNode() {
      this.setDefaultNodeMenu();
      this.lf.on("node:contextmenu", ({ data, position }) => {
        this.show = true;
        this.x = position.domOverlayPosition.x;
        this.y = position.domOverlayPosition.y;
        this.activeMenu = this.nodeMenu;
        this.currentData = data;
      });
    },

    // 初始化 -- edge
    initEdge() {
      this.setDefaultEdgeMenu();
      this.lf.on("edge:contextmenu", ({ data, position }) => {
        this.show = true;
        this.x = position.domOverlayPosition.x;
        this.y = position.domOverlayPosition.y;
        this.activeMenu = this.edgeMenu;
        this.currentData = data;
      });
    },

    // 初始化 -- selection
    initSelection() {
      this.setDefaultSelectionMenu();
      this.lf.on("selection:contextmenu", ({ data, position }) => {
        this.show = true;
        this.x = position.domOverlayPosition.x;
        this.y = position.domOverlayPosition.y;
        this.activeMenu = this.selectionMenu;
        this.currentData = data;
      });
    },

    // 初始化 -- blank graph
    initGraph() {
      this.setDefaultGraphMenu();
      this.lf.on("blank:contextmenu", ({ data, position }) => {
        this.show = true;
        this.x = position.domOverlayPosition.x;
        this.y = position.domOverlayPosition.y;
        this.activeMenu = this.graphMenu;
        this.currentData = data;
      });
    },

    // 点击某一项菜单
    onMenuItemClick(menuItem) {
      menuItem.callback(this.currentData);
      this.show = false;
    },

    // 设置默认菜单 -- node
    setDefaultNodeMenu() {
      const lf = this.lf;
      this.nodeMenu = [
        {
          text: "置顶",
          callback: (node) => {
            lf.setElementZIndex(node.id, "top");
          },
        },
        {
          text: "置底",
          callback: (node) => {
            lf.setElementZIndex(node.id, "bottom");
          },
          type: "divider",
        },
        {
          text: "删除",
          callback: (node) => {
            lf.deleteNode(node.id);
          },
          type: "divider",
        },
        {
          text: "编辑文本",
          callback: (node) => {
            lf.graphModel.editText(node.id);
          },
          type: "divider",
        },
        {
          text: "复制",
          callback: (node) => {
            lf.cloneNode(node.id);
          },
          type: "divider",
        },
        {
          text: "解除组合",
          callback: (groupNode) => {
            const groupModel = lf.getModelById(groupNode.id);
            groupNode.children.forEach((id) => {
              groupModel.removeChild(id);
              lf.graphModel.group.nodeGroupMap.delete(id);
            });
            lf.deleteNode(groupNode.id);
          },
          show(node) {
            return node.type === ProGroup.type;
          },
        },
      ];
    },

    // 设置默认菜单 -- edge
    setDefaultEdgeMenu() {
      const lf = this.lf;
      this.edgeMenu = [
        {
          text: "删除",
          callback: (node) => {
            lf.deleteEdge(node.id);
          },
          type: "divider",
        },
        {
          text: "编辑文本",
          callback: (node) => {
            lf.graphModel.editText(node.id);
          },
        },
      ];
    },

    // 设置默认菜单 -- selection
    setDefaultSelectionMenu() {
      const lf = this.lf;
      this.selectionMenu = [
        {
          text: "组合",
          callback: (elements) => {
            const { selectElements } = lf.graphModel;
            if (selectElements.size <= 1) return;

            const groupNodes = Array.from(selectElements).filter((item) => item[1].isGroup);
            if (groupNodes && groupNodes.length > 0) {
              this.$message.warning("无法对组合在进行组合");
              return;
            }

            let x = Number.MAX_SAFE_INTEGER;
            let y = Number.MAX_SAFE_INTEGER;
            let x1 = Number.MIN_SAFE_INTEGER;
            let y1 = Number.MIN_SAFE_INTEGER;

            selectElements.forEach((element) => {
              let outline = {
                x: 0,
                y: 0,
                x1: 0,
                y1: 0,
              };
              if (element.BaseType === "node") outline = getNodeOutline(element);
              if (element.BaseType === "edge") outline = getEdgeOutline(element);
              x = Math.min(x, outline.x);
              y = Math.min(y, outline.y);
              x1 = Math.max(x1, outline.x1);
              y1 = Math.max(y1, outline.y1);
            });

            const offset = 20;
            const width = x1 - x + offset * 2;
            const height = y1 - y + offset * 2;

            const group = lf.addNode({
              type: ProGroup.type,
              x: x - offset + width / 2,
              y: y - offset + height / 2,
              // 默认样式
              properties: {
                width,
                height,
                backgroundColor: "#fff",
                borderStyle: "dashed",
              },
            });

            // 仅需要将 node 添加至 group
            elements.nodes.forEach((node) => {
              group.addChild(node.id);
              /**
               * FIXME: appendNodeToGroup 内部方法；（等待官方后续更新后、调整该方法；）
               * 因为：
               *  group.addChild 只会添加关系，不会自动将节点移动到分组里面。(lf.graphModel.group.nodeGroupMap 中没有数据)
               *  但是框选节点时，框选组件内部会判断 lf.graphModel.group.nodeGroupMap 中的数据
               *  所以框选了分组里面的节点，拖动框选内容时 分组内部节点位置错误
               * 所以:
               *  此处使用 组件内部方法 手动添加节点到分组里面（lf.graphModel.group.nodeGroupMap）
               */
              lf.graphModel.group.appendNodeToGroup({ data: node });
            });
            // 取消选中
            lf.clearSelectElements();
          },
        },
        {
          text: "删除",
          callback: (elements) => {
            lf.clearSelectElements();
            elements.edges.forEach((edge) => lf.deleteEdge(edge.id));
            elements.nodes.forEach((node) => lf.deleteNode(node.id));
          },
        },
      ];
    },

    // 设置默认菜单 -- blank graph
    setDefaultGraphMenu() {
      const lf = this.lf;
      this.graphMenu = [
        {
          text: "撤销",
          callback: () => {
            lf.undo();
          },
        },
        {
          text: "恢复",
          callback: () => {
            lf.redo();
          },
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.lf-right-click-menu {
  position: absolute;
  z-index: 999;
  width: 100px;
  box-shadow: 0 2px 8px #dad7d7;
  padding: 4px 0;
  margin: 0;
  background-color: #fff;
  min-width: 200px;
  border-radius: 2px;
  > ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
    }
  }
  .lf-right-click-menu-item {
    cursor: pointer;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    padding: 5px 12px;
    transition: all 0.3s;
    background-color: #fff;
    line-height: 22px;
    white-space: nowrap;
    &:hover {
      background-color: #f5f5f5;
    }
  }

  .lf-right-click-menu-divider {
    margin: 4px 0;
    line-height: 0;
    overflow: hidden;
    height: 1px;
    background-color: #f0f0f0f0;
  }
}
</style>
