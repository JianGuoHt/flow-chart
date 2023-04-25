// 默认 edge 类型
export const defaultEdgeType = "pro-polyline";

export const headerHeight = 40;

// 线条样式
export const borderStyles = [
  {
    value: "solid",
    label: "实线",
  },
  {
    value: "dashed",
    label: "虚线",
  },
  {
    value: "dotted",
    label: "点虚线",
  },
];

export const fontFamilyList = [
  {
    label: "Arial",
    value: "Arial",
  },
  {
    label: "Verdana",
    value: "Verdana",
  },
  {
    label: "Georgia",
    value: "Georgia",
  },
  {
    label: "Times New Roman",
    value: "Times New Roman",
  },
];

export const imageAlign = [
  {
    label: "居中",
    value: "center",
    getCoordinate(x, y, width, height) {
      return {
        x: x - width / 2,
        y: y - height / 2,
      };
    },
  },
  {
    label: "上",
    value: "top",
    getCoordinate(x, y, width) {
      return {
        x: x - width / 2,
        y: y,
      };
    },
  },
  {
    label: "下",
    value: "bottom",
    getCoordinate(x, y, width, height) {
      return {
        x: x - width / 2,
        y: y - height / 2,
      };
    },
  },
  { label: "左", value: "left" },
  { label: "右", value: "right" },
  { label: "左上", value: "lt" },
  { label: "右上", value: "rt" },
  { label: "左下", value: "lb" },
  { label: "右下", value: "rb" },
];
