import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping } from "../utils/transformStyle";
import { getShapeImage } from "../utils/shapeImage";
// 人物
class ActorNodeModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 40;
    this.height = 80;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }
}

class ActorNodeView extends RectResize.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    // 人物头部圆形
    const ellipseAttrs = {
      ...style,
      cx: x,
      cy: y - (3 / 8) * height,
      rx: (1 / 4) * width,
      ry: (1 / 8) * height,
      width,
      height,
    };
    // 人物肩膀横线
    const pathAAttrs = {
      ...style,
      d: `M ${x - (1 / 2) * width} ${y - (1 / 8) * height} L ${x + (1 / 2) * width} ${
        y - (1 / 8) * height
      }`,
    };
    // 人物身体躯干竖线
    const pathBAttrs = {
      ...style,
      d: `M ${x} ${y - (1 / 4) * height} L ${x} ${y + (1 / 5) * height}`,
    };
    // 人物左腿斜线
    const pathCAttrs = {
      ...style,
      d: `M ${x} ${y + (1 / 5) * height} L ${x - (1 / 2) * width} ${y + (1 / 2) * height}`,
    };
    // 人物右腿斜线
    const pathDAttrs = {
      ...style,
      d: `M ${x} ${y + (1 / 5) * height} L ${x + (1 / 2) * width} ${y + (1 / 2) * height}`,
    };
    // 人物透明背景板
    const bgAttrs = {
      x: x - (1 / 5) * width,
      y: y - (1 / 2) * height,
      width: (2 / 5) * width,
      height,
      style: "fill: transparent",
    };
    const doms = [
      h("ellipse", {
        ...ellipseAttrs,
      }),
      h("path", {
        ...pathAAttrs,
      }),
      h("path", {
        ...pathBAttrs,
      }),
      h("path", {
        ...pathCAttrs,
      }),
      h("path", {
        ...pathDAttrs,
      }),
      h("rect", {
        ...bgAttrs,
      }),
    ];
    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-actor",
  view: ActorNodeView,
  model: ActorNodeModel,
};
