import { h } from "@logicflow/core";
import RectNode from "../basic/RectNode";
import { getShapeImage } from "../utils/shapeImage";

// 图片-基础节点
class ImageModel extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 60;
  }
}

class ImageNode extends RectNode.view {
  getResizeShape() {
    return h("g", {}, getShapeImage([], this.props));
  }
}

export default {
  type: "pro-image-node",
  view: ImageNode,
  model: ImageModel,
};
