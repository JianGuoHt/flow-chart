import { EllipseResize } from "@logicflow/extension";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../transformStyle";

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

export default {
  type: "pro-circle",
  view: EllipseResize.view,
  model: CircleNodeModel,
};
