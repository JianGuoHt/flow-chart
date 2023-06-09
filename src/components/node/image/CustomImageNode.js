import ImageNode from "./ImageNode";

class CustomImageNodeModel extends ImageNode.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 128;
    this.height = 128;

    this.setProperties({
      imageHref: require("../../assets/images/image.png"),
    });
  }
}

class CustomImageNode extends ImageNode.view {}

export default {
  type: "pro-custom-image",
  view: CustomImageNode,
  model: CustomImageNodeModel,
};
