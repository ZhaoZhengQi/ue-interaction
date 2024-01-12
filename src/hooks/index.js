import { api_send, api_register } from "../pixel-stream/index.js";
/**
 * PC端-发送事件给UE
 * @param {string} eventName 事件名称
 * @param {object} data 事件数据
 * @param {object} options 选项
 */
const pcSend = (eventName, data, options = { isJson: true, isLog: false }) => {
  // 是否转换为json并且data不是json
  if (options.isJson && typeof data === "object") {
    data = JSON.stringify(data);
  }
  // 是否打印日志
  if (options.isLog) {
    console.log("通知ue->事件名称：", eventName, "参数：" + data);
  }
  window.ue4(eventName, data);
};

/**
 * 像素流端-发送事件给UE
 * @param {string} eventName 事件名称
 * @param {object} data 事件数据
 * @param {object} options 选项
 */
const psSend = (eventName, data, options = { isLog: false }) => {
  // 是否打印日志
  if (options.isLog) {
    console.log("通知ue->事件名称：", eventName, "参数：" + data);
  }
  api_send(eventName, data);
};

/**
 * PC端-接收UE事件
 * @param {string} eventName 事件名称
 * @param {function} callback 回调函数
 */
const pcRegister = (eventName, callback, option = { isLog: false }) => {
  window.ue.interface[eventName] = (data) => {
    if (option.isLog) {
      console.log("接收ue->事件名称：", eventName, "参数：" + data);
    }
    callback(data);
  };
};

/**
 * 像素流端-接收UE事件
 * @param {string} eventName 事件名称
 * @param {function} callback 回调函数
 */
const psRegister = (eventName, callback, option = { isLog: false }) => {
  api_register(eventName, (data) => {
    if (option.isLOg) {
      console.log("接收ue->事件名称：", eventName, "参数：" + data);
    }
    callback(data);
  });
};

export { pcSend, pcRegister, psSend, psRegister };
