import { isObject } from "./is";

/**
 * Helper function which will merge objects recursively - creating brand new one - like clone
 *
 * @param {object} target
 * @params {object} sources
 *
 * @returns {object}
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (typeof target[key] === "undefined") {
          target[key] = {};
        }
        target[key] = mergeDeep(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        target[key] = [];
        for (let item of source[key]) {
          if (isObject(item)) {
            target[key].push(mergeDeep({}, item));
            continue;
          }
          target[key].push(item);
        }
      } else {
        target[key] = source[key];
      }
    }
  }
  return mergeDeep(target, ...sources);
}

/**
 *
 * This JavaScript function returns the file extension of a given file name.
 * @param {string} fileName
 * @returns {string}
 */
export function getFileExtension(fileName = "") {
  const lastIndex = fileName.lastIndexOf(".");
  const ext = fileName.substring(lastIndex + 1);
  return ext;
}

/**
 * This function creates a hidden file input element, allows the user to select a file, and returns a
 * promise that resolves with the selected file.
 * @returns A Promise object is being returned.
 */
export function createFileInput(fileAttr = { accept: "" }) {
  return new Promise((resolve) => {
    let file = document.createElement("input");
    file.setAttribute("type", "file");
    file.setAttribute("accept", fileAttr.accept);

    file.style.display = "none";
    document.body.appendChild(file);

    file.click();

    file.onchange = function () {
      const fileList = file.files;
      document.body.removeChild(file);
      file = undefined;

      resolve({
        fileList,
      });
    };
  });
}
