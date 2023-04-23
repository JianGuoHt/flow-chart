import ImageNode from "./ImageNode";

// 图片-用户节点
class UserImageNode extends ImageNode.view {
  getImageHref() {
    return "https://dpubstatic.udache.com/static/dpubimg/-6Fd2uIoJ-/user.png";
  }
}

export default {
  type: "pro-image-user",
  view: UserImageNode,
  model: ImageNode.model,
};
