import { getBBoxOfPoints } from "../utils/edge";

// 获取节点的out
export const getNodeOutline = ({ x, y, width, height }) => ({
  x: x - width / 2,
  y: y - height / 2,
  x1: x + width / 2,
  y1: y + height / 2,
});

export const getLineOutline = (edge) => {
  const { startPoint, endPoint } = edge;
  const x = (startPoint.x + endPoint.x) / 2;
  const y = (startPoint.y + endPoint.y) / 2;
  const width = Math.abs(startPoint.x - endPoint.x) + 10;
  const height = Math.abs(startPoint.y - endPoint.y) + 10;
  return {
    x: x - width / 2,
    y: y - height / 2,
    x1: x + width / 2,
    y1: y + height / 2,
  };
};

export const getPolylineOutline = (edge) => {
  const { pointsList } = edge;
  const bbox = getBBoxOfPoints(pointsList, 8);
  const { x, y, width, height } = bbox;
  return {
    x: x - width / 2,
    y: y - height / 2,
    x1: x + width / 2,
    y1: y + height / 2,
  };
};

export const getBezierOutline = (edge) => {
  const { pointsList } = edge;
  const bbox = getBBoxOfPoints(pointsList, 8);
  const { x, y, width, height } = bbox;
  return {
    x: x - width / 2,
    y: y - height / 2,
    x1: x + width / 2,
    y1: y + height / 2,
  };
};

export const getEdgeOutline = (edge) => {
  if (edge.modelType === "line-edge") {
    return getLineOutline(edge);
  }
  if (edge.modelType === "polyline-edge") {
    return getPolylineOutline(edge);
  }
  if (edge.modelType === "bezier-edge") {
    return getBezierOutline(edge);
  }
};
