import { h } from "@logicflow/core";

export class ArrowType {
  attr = {};
  arrowType = "";

  constructor(attr = {}, arrowType = "default") {
    this.attr = attr;
    this.arrowType = arrowType;
  }

  getAttr() {
    return this.attr || {};
  }

  getShapeArr() {
    return [
      this.getDefaultShape(),
      // this.getEmptyShape(),
      this.getHalfShape(),
    ];
  }

  getShape() {
    const shapeArr = this.getShapeArr();
    const shape = shapeArr.find((item) => item.value === this.arrowType);
    return shape.shape;
  }

  // 默认箭头
  getDefaultShape() {
    return {
      shape: h("path", {
        d: "M 0 0 -10 -5 -10 5 z",
        ...this.getAttr(),
      }),
      label: "默认",
      value: "default",
      icon: "icon-arrow-right",
    };
  }

  // 空心箭头
  getEmptyShape() {
    return {
      shape: h("path", {
        fill: "#FFF",
        d: "M -10 0  -20 -5 -30 0 -20 5 z",
        ...this.getAttr(),
      }),
      label: "空心",
      value: "empty",
      icon: "",
    };
  }

  // 半箭头
  getHalfShape() {
    return {
      shape: h("path", {
        d: "M 0 0 -10 5",
        b: "bb",
        ...this.getAttr(),
      }),
      label: "半箭头",
      value: "half",
      icon: "icon-jiantou_qiehuanyou",
    };
  }
}
