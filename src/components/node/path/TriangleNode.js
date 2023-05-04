import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../utils/transformStyle";
import { getShapeImage } from "../utils/shapeImage";

class TriangleNodeModel extends RectResize.model {
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

class TriangleNodeView extends RectResize.view {
  getResizeShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    const attrs = {
      ...style,
      x,
      y,
      width,
      height,
      points: [
        [x - width / 2, y + height / 2],
        [x - width / 2, y - height / 2],
        [x + width / 2, y],
      ],
    };

    const doms = [h("polygon", { ...attrs })];

    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-triangle",
  view: TriangleNodeView,
  model: TriangleNodeModel,
};
