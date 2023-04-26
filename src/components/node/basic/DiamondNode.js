import { h } from "@logicflow/core";
import { DiamondResize } from "@logicflow/extension";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../utils/transformStyle";
import { getShapeImage } from "../utils/shapeImage";

// 菱形
class DiamondNodeModel extends DiamondResize.model {
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

class DiamondNodeView extends DiamondResize.view {
  getResizeShape() {
    const { model } = this.props;
    const { x, y, points } = model;
    const style = model.getNodeStyle();

    const attrs = {
      x: x,
      y: y,
      points,
      ...style,
    };
    const doms = [h("polygon", { ...attrs })];

    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-diamond",
  view: DiamondNodeView,
  model: DiamondNodeModel,
};
