import "./src/ue-engine/index.js";

import {
  pcSend,
  pcRegister,
  psSend,
  psRegister,
} from "./src/UE/hooks/index.js";

// 当前的ue环境
let UE_ENV = "pixel_stream"; // 像素流环境：pixel_stream ，ue引擎环境：ue_engine

// 获取当前的ue环境
window.ue.interface.setUE_ENV = function () {
  UE_ENV = "ue_engine";
  console.log("设置为ue引擎环境————>", UE_ENV);
};

/**
 * 根据当前环境判断何种方式给ue发送事件
 * @param {*} name  事件名称
 * @param {*} data  数据
 * @param {*} option 选项 isJson:是否转换为json并且data不是json，isLog:是否打印日志 h5端永远是json所以无法配置isJson
 * @returns
 */
export const ueSend = (name, data, option) => {
  // ue引擎环境
  if (UE_ENV === "ue_engine") {
    return pcSend(name, data, option);
  } else {
    // 像素流环境
    return psSend(name, data, option);
  }
};

/**
 * 根据当前环境判断何种方式给ue注册事件
 * @param {*} name  事件名称
 * @param {*} callback  回调函数
 * @param {*} option  选项 isLog:是否打印日志
 * @returns
 */
export const ueRegister = (name, callback, option) => {
  // ue引擎环境
  if (UE_ENV === "ue_engine") {
    return pcRegister(name, callback, option);
  } else {
    // 像素流环境
    return psRegister(name, callback, option);
  }
};

export { pcSend, pcRegister, psSend, psRegister };
