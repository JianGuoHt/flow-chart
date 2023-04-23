import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping } from "../transformStyle";

// 平行四边形
class ParallelogramNodeModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 100;
    this.height = 60;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }
}

class ParallelogramNodeView extends RectResize.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const pointList = [
      [x - width / 2, y + height / 2],
      [x - width / 5, y - height / 2],
      [x + width / 2, y - height / 2],
      [x + width / 5, y + height / 2],
    ];
    const points = pointList.map((item) => {
      return `${item[0]},${item[1]}`;
    });
    const attrs = {
      ...style,
      x,
      y,
      width,
      height,
      points: points.join(" "),
    };
    return h("g", {}, [h("polygon", { ...attrs })]);
  }
}

export default {
  type: "pro-parallelogram",
  view: ParallelogramNodeView,
  model: ParallelogramNodeModel,
};
