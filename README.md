# ue-interacion 交互组件

## 安装

通过npm安装: 

```bash 
npm install npm i ue-interaction
```

## 使用

```js
import Vue from 'vue'
import  ueSetup  from 'ue-interacion'
```

## 发送事件给ue
  
  ```js 
  ue4('eventName', data)
  ```

## 接收ue事件

  ```js 
  window.ue.interface.eventName => function(data) {
    // do something...
  }
  ```
