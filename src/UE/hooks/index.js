/**
 * 发送事件给UE
 * @param {string} eventName 事件名称
 * @param {object} data 事件数据
 * @param {object} options 选项
 */
const ueSend = (eventName, data, options = { isJson: true }) => {
  if (options.isJson) {
    data = JSON.stringify(data);
  }
  ue4(eventName, data);
};

/**
 * UE接收事件
 * @param {string} eventName 事件名称
 * @param {function} callback 回调函数
 */
const ueReceive = (eventName, callback) => {
  window.ue.interface[eventName] = callback;
};

export { ueSend, ueReceive };
