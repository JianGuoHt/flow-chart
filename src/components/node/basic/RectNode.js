import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping } from "../transformStyle";

class RectNodeModel extends RectResize.model {
  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }
}

export default {
  type: "pro-rect",
  view: RectResize.view,
  model: RectNodeModel,
};
