import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../utils/transformStyle";
import { getShapeImage } from "../utils/shapeImage";

// 圆柱体
class CylinderNodeModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 60;
    this.height = 80;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();
    return transformTextStyleMapping(style, properties);
  }

  // 设置调整边框样式
  getResizeOutlineStyle() {
    return {
      stroke: "#000000",
      strokeWidth: 1,
      strokeDasharray: "3,3",
    };
  }
}

class CylinderNodeView extends RectResize.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    // 圆柱体顶部椭圆
    const ellipseAAttrs = {
      ...style,
      cx: x,
      cy: y - (1 / 3) * height,
      rx: (1 / 2) * width,
      ry: (1 / 6) * height,
      width,
      height,
    };
    // 圆柱体左直线
    const pathAAttrs = {
      ...style,
      d: `M ${x - (1 / 2) * width} ${y - (1 / 3) * height} L ${x - (1 / 2) * width} ${
        y + (1 / 3) * height
      }`,
    };
    // 圆柱体右直线
    const pathBAttrs = {
      ...style,
      d: `M ${x + (1 / 2) * width} ${y - (1 / 3) * height} L ${x + (1 / 2) * width} ${
        y + (1 / 3) * height
      }`,
    };
    // 圆柱体下椭圆
    const ellipseBAttrs = {
      ...style,
      cx: x,
      cy: y + (1 / 3) * height,
      rx: (1 / 2) * width,
      ry: (1 / 6) * height,
      width,
      height,
    };
    // 圆柱体中间填充部分
    const rectAttrs = {
      ...style,
      x: x - (1 / 2) * width,
      y: y - (1 / 3) * height,
      width,
      height: (2 / 3) * height,
      stroke: "transparent",
    };
    const doms = [
      h("ellipse", {
        ...ellipseBAttrs,
      }),
      h("rect", {
        ...rectAttrs,
      }),
      h("path", {
        ...pathAAttrs,
      }),
      h("path", {
        ...pathBAttrs,
      }),
      h("ellipse", {
        ...ellipseAAttrs,
      }),
    ];

    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-cylinder",
  model: CylinderNodeModel,
  view: CylinderNodeView,
};
