import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";
import { transformShapeStyleMapping, transformTextStyleMapping } from "../transformStyle";
import { ArrowType } from "./ArrowType";
import { defaultArrowType, defaultLineWidth } from "../../config/edge";

// 直角折线
class ProPolylineEdgeModel extends PolylineEdgeModel {
  initEdgeData(data) {
    super.initEdgeData(data);
    this.setProperties({
      arrowType: localStorage.getItem("LF_endArrowType") || defaultArrowType,
      borderWidth: Number(localStorage.getItem("LF_edgeBorderWidth")) || defaultLineWidth,
    });
  }

  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return transformTextStyleMapping(style, properties);
  }
}

class ProPolylineEdge extends PolylineEdge {
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
  type: "pro-polyline",
  view: ProPolylineEdge,
  model: ProPolylineEdgeModel,
};
