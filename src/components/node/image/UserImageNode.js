import ImageNode from "./ImageNode";

class UserImageNodeModel extends ImageNode.model {
  initNodeData(data) {
    super.initNodeData(data);

    this.setProperties({
      imageHref: "https://dpubstatic.udache.com/static/dpubimg/-6Fd2uIoJ-/user.png",
    });
  }
}

// 图片-用户节点
class UserImageNode extends ImageNode.view {}

export default {
  type: "pro-image-user",
  view: UserImageNode,
  model: UserImageNodeModel,
};
