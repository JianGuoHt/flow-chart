import { DiamondResize } from "@logicflow/extension";
import { transformShapeStyleMapping } from "../transformStyle";

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
}

export default {
  type: "pro-diamond",
  view: DiamondResize.view,
  model: DiamondNodeModel,
};
