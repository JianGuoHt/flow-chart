const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction(val) {
  return is(val, "Function") || is(val, "AsyncFunction");
}

/**
 * @description: 是否为对象
 */
export function isObject(val) {
  return val !== null && is(val, "Object");
}

/**
 * @description:  是否为时间
 */
export function isDate(val) {
  return is(val, "Date");
}

/**
 * @description:  是否为数值
 */
export function isNumber(val) {
  return is(val, "Number");
}

/**
 * @description 是否为数组
 */
export function isArray(val) {
  return val && Array.isArray(val);
}
