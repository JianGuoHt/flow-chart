import { h } from "@logicflow/core";
import RectNode from "../basic/RectNode";
import { getShapeImage } from "../utils/shapeImage";

// 下箭头

class DownArrowNodeModel extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 50;
    this.height = 80;
  }
}

class DownArrowNodeView extends RectNode.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const ArrowWidth = (1 / 3) * width;
    const upY = y - (1 / 2) * height;
    const downY = y + (1 / 2) * height;
    const downY2 = y + (1 / 5) * height;
    const attrs = {
      ...style,
      x,
      y,
      width,
      height,
      points: [
        [x - (1 / 2) * ArrowWidth, downY2],
        [x - (1 / 2) * width, downY2],
        [x, downY],
        [x + (1 / 2) * width, downY2],
        [x + (1 / 2) * ArrowWidth, downY2],
        [x + (1 / 2) * ArrowWidth, upY],
        [x - (1 / 2) * ArrowWidth, upY],
      ],
    };
    const doms = [h("polygon", { ...attrs })];
    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-down-arrow",
  view: DownArrowNodeView,
  model: DownArrowNodeModel,
};
