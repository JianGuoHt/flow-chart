import CircleNode from "./CircleNode";

class EllipseNodeModel extends CircleNode.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.rx = 60;
    this.ry = 30;
  }
}

export default {
  type: "pro-ellipse",
  view: CircleNode.view,
  model: EllipseNodeModel,
};
