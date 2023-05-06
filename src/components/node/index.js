import CircleNode from "./basic/CircleNode";
import DiamondNode from "./basic/DiamondNode";
import EllipseNode from "./basic/EllipseNode";
import RectNode from "./basic/RectNode";
import RectRadiusNode from "./basic/RectRadiusNode";
import Bezier from "./edge/Bezier";
import Line from "./edge/Line";
import Polyline from "./edge/Polyline";
import TriangleNode from "./path/TriangleNode";
import CylinderNode from "./path/CylinderNode";
import ActorNode from "./path/ActorNode";
import ParallelogramNode from "./path/ParallelogramNode";
import DownArrowNode from "./arrow/DownArrowNode";
import HorizontalArrowNode from "./arrow/HorizontalArrowNode";
import LeftArrow from "./arrow/LeftArrow";
import RightArrow from "./arrow/RightArrow";
import UpArrowNode from "./arrow/UpArrowNode";
import VerticalArrowNode from "./arrow/VerticalArrowNode";
import UserImageNode from "./image/UserImageNode";
import CustomImageNode from "./image/CustomImageNode";
import ProGroupModel from "./group/ProGroup";

/**
 *
 * @param {import('@logicflow/core').LogicFlow} lf
 */
export const registerCustomElement = (lf) => {
  // 基础图形
  lf.register(CircleNode);
  lf.register(RectNode);
  lf.register(RectRadiusNode);
  lf.register(TriangleNode);
  lf.register(EllipseNode);
  lf.register(DiamondNode);
  lf.register(CylinderNode);
  lf.register(ActorNode);
  lf.register(ParallelogramNode);
  lf.register(DownArrowNode);
  lf.register(HorizontalArrowNode);
  lf.register(LeftArrow);
  lf.register(RightArrow);
  lf.register(UpArrowNode);
  lf.register(VerticalArrowNode);

  // 分组
  lf.register(ProGroupModel);

  // 边
  lf.register(Line);
  lf.register(Polyline);
  lf.register(Bezier);

  // image绘制图片节点
  lf.register(UserImageNode);
  lf.register(CustomImageNode);
};
