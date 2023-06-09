import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../utils/transformStyle";
import { getShapeImage } from "../utils/shapeImage";

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

  getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();
    return transformTextStyleMapping(style, properties);
  }

  // 设置调整边框样式
  getResizeOutlineStyle() {
    return {
      stroke: "#000000",
      strokeWidth: 1,
      strokeDasharray: "3,3",
    };
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
    const doms = [h("polygon", { ...attrs })];
    return h("g", {}, getShapeImage(doms, this.props));
  }
}

export default {
  type: "pro-parallelogram",
  view: ParallelogramNodeView,
  model: ParallelogramNodeModel,
};
