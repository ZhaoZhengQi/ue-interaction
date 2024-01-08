# ue-interacion 交互组件

## 安装

通过npm安装: 

```bash 
npm install ue-interaction
```

## 使用

```js
import { ueSend, ueReceive } from 'ue-interacion'
```

## 发送事件给ue
  
  ```js 
  ueSend('eventName', data)
  ```

## 接收ue事件

  ```js 
  ueReceive('eventName',()=>{
    // do something......
  })
  ```

