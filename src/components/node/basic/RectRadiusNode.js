import RectNode from "./RectNode";

class RectRadiusModel extends RectNode.model {
  setAttributes() {
    super.setAttributes();
    this.radius = 20;
  }
}

export default {
  type: "pro-rect-radius",
  view: RectNode.view,
  model: RectRadiusModel,
};
