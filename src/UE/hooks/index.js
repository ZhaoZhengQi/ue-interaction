/**
 * 发送事件给UE
 * @param {string} eventName 事件名称
 * @param {object} data 事件数据
 * @param {object} options 选项
 */
const ueSend = (eventName, data, options = { isJson: true, isLog: false }) => {
  // 是否转换为json并且data不是json
  if (options.isJson && typeof data === "object") {
    data = JSON.stringify(data);
  }
  // 是否打印日志
  if (options.isLog) {
    console.log("通知ue->事件名称：", eventName, "参数：" + data);
  }
  ue4(eventName, data);
};

/**
 * 接收UE事件
 * @param {string} eventName 事件名称
 * @param {function} callback 回调函数
 */
const ueReceive = (eventName, callback) => {
  window.ue.interface[eventName] = callback;
};

export { ueSend, ueReceive };
