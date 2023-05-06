import { GroupNode } from "@logicflow/extension";
import { transformShapeStyleMapping } from "../utils/transformStyle";

class ProGroupModel extends GroupNode.model {
  initNodeData(data) {
    super.initNodeData(data);
    const { width, height, foldedWidth, foldedHeight } = this.properties;
    this.isRestrict = true;
    this.resizable = true;
    this.foldable = true;
    this.width = width;
    this.height = height;
    this.foldedWidth = foldedWidth;
    this.foldedHeight = foldedHeight;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }
}

class ProGroup extends GroupNode.view {}

export default {
  type: "pro-group",
  model: ProGroupModel,
  view: ProGroup,
};
