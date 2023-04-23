import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping } from "../transformStyle";

class TriangleNodeModel extends RectResize.model {
  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  getTextStyle() {
    const style = super.getTextStyle();
    return style;
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
    return h("g", {}, [h("polygon", { ...attrs })]);
  }
}

export default {
  type: "pro-triangle",
  view: TriangleNodeView,
  model: TriangleNodeModel,
};
