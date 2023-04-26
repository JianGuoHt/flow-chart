/* eslint-disable no-unused-vars */
import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../utils/transformStyle";
import { getShapeImage } from "../utils/shapeImage";

class RectNodeModel extends RectResize.model {
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

class RectNodeView extends RectResize.view {
  getResizeShape() {
    const { model } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    const leftTopX = x - width / 2;
    const leftTopY = y - height / 2;

    const attrs = {
      x: leftTopX,
      y: leftTopY,
      rx: radius,
      ry: radius,
      width,
      height,
      ...style,
    };

    const doms = [h("rect", { ...attrs })];

    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-rect",
  view: RectNodeView,
  model: RectNodeModel,
};
