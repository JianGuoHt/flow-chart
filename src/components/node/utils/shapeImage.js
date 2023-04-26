import { h } from "@logicflow/core";

export function getShapeImage(doms, props, callback = () => {}) {
  const { model } = props;
  const {
    x,
    y,
    width,
    height,
    properties: { imageHref, imageZIndex, imageWidth, imageHeight },
  } = model;

  // 存在图片
  if (imageHref) {
    const defaultWidth = width;
    const defaultHeight = height;
    const style = model.getNodeStyle();
    const imgAttrs = {
      ...style,
      x: x - width / 2,
      y: y - height / 2,

      width: typeof imageWidth === "undefined" ? defaultWidth : imageWidth,
      height: typeof imageHeight === "undefined" ? defaultHeight : imageHeight,
      href: imageHref,
      xlinkHref: imageHref,
      // preserveAspectRatio: "none",
    };
    const imgDom = h("image", { ...imgAttrs });

    if (imageZIndex === "bottom") {
      doms.unshift(imgDom);
    } else {
      doms.push(imgDom);
    }

    callback();
  }

  return doms;
}
