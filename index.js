import "./src/ue-engine/index.js";
import { pcSend, pcRegister, psSend, psRegister } from "./src/hooks/index.js";

// 更新ue环境的回调函数
let setEnvCallback = null;
// 当前的ue环境
let UE_ENV = "ue_engine"; // 像素流环境：pixel_stream ，ue引擎环境：ue_engine

// window.UE_ENV = "pixel_stream";

// 前端设置当前环境
const pcSetEnv = (data) => {
  UE_ENV = data;
  console.log("前端更改了当前交互环境", data);
};

// ue设置当前的ue环境
pcRegister("setUE_ENV", (data) => {
  UE_ENV = data;
  setEnvCallback && setEnvCallback(UE_ENV);
});

// 像素流设置当前的ue环境
// psRegister("setUE_ENV", () => {
//   UE_ENV = "ue_engine";
//   setEnvCallback && setEnvCallback(UE_ENV);
//   console.log("设置为ue引擎环境————>", UE_ENV);
// });

// 监听ue环境变化
const onSetEnv = function (callback) {
  setEnvCallback = callback;
};

/**
 * 根据当前环境判断何种方式给ue发送事件
 * @param {*} name  事件名称
 * @param {*} data  数据
 * @param {*} option 选项 isJson:是否转换为json并且data默认不是json，isLog:是否打印日志 h5端永远是json所以无法配置isJson
 * @returns
 */
const ueSend = (name, data, option) => {
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
const ueRegister = (name, callback, option) => {
  // ue引擎环境
  if (UE_ENV === "ue_engine") {
    return pcRegister(name, callback, option);
  } else {
    // 像素流环境
    return psRegister(name, callback, option);
  }
};

import {
  app_load,
  api_close,
  api_disconnect,
} from "./src/pixel-stream/index.js";

const psLoad = app_load;
const psClose = api_close;
const psDisconnect = api_disconnect;
export {
  pcSend,
  pcRegister,
  psSend,
  psRegister,
  psLoad,
  psClose,
  psDisconnect,
  ueSend,
  ueRegister,
  onSetEnv,
  pcSetEnv,
};
