import { h } from "@logicflow/core";
import RectNode from "../basic/RectNode";
import { getShapeImage } from "../utils/shapeImage";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../utils/transformStyle";

// 图片-基础节点
class ImageModel extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 60;
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
