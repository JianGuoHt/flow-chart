import { BezierEdge, BezierEdgeModel } from "@logicflow/core";
import { transformShapeStyleMapping } from "../transformStyle";
import { ArrowType } from "./ArrowType";
import { defaultArrowType } from "../../config/edge";

// 贝塞尔曲线
class ProBezierEdgeModel extends BezierEdgeModel {
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

class ProBezierEdge extends BezierEdge {
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
  type: "pro-bezier",
  view: ProBezierEdge,
  model: ProBezierEdgeModel,
};
