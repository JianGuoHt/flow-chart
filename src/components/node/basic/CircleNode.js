import { h } from "@logicflow/core";
import { EllipseResize } from "@logicflow/extension";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../utils/transformStyle";
import { getShapeImage } from "../utils/shapeImage";

class CircleNodeModel extends EllipseResize.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;
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
}

class CircleNodeView extends EllipseResize.view {
  getResizeShape() {
    const { model } = this.props;
    const { x, y, rx, ry } = model;
    const style = model.getNodeStyle();

    const attrs = {
      x: x,
      y: y,
      cx: x,
      cy: y,
      rx,
      ry,
      ...style,
    };

    const doms = [h("ellipse", { ...attrs })];

    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-circle",
  view: CircleNodeView,
  model: CircleNodeModel,
};
