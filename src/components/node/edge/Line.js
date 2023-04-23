import { LineEdge, LineEdgeModel } from "@logicflow/core";
import { transformShapeStyleMapping } from "../transformStyle";
import { ArrowType } from "./ArrowType";
import { defaultArrowType } from "../../config/edge";

// 直线
class ProLineEdgeModel extends LineEdgeModel {
  initEdgeData(data) {
    super.initEdgeData(data);
    this.setProperties({
      arrowType: localStorage.getItem("LF_endArrowType") || defaultArrowType,
    });
  }

  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }
}

class ProLineEdge extends LineEdge {
  getEndArrow() {
    const { model } = this.props;
    const {
      properties: { arrowType },
    } = model;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      stroke,
      strokeWidth,
    };

    const cArrowType = new ArrowType(pathAttr, arrowType);
    return cArrowType.getShape();
  }
}

export default {
  type: "pro-line",
  view: ProLineEdge,
  model: ProLineEdgeModel,
};
