# zzq-ue
![Npm 版本](https://img.shields.io/badge/zzq-ue_v0.0.15-blue)
## 📖 简介
用于前端项目与ue项目交互（包括ue引擎嵌套前端项目，或前端嵌套ue像素流两种方式）

## 🔩 安装
```bash
npm install zzq-ue
```

## 📚 使用
支持ue客户端嵌套前端项目、前端嵌套ue像素流是两种不同的接入方式
### 前端嵌入像素流
需要在模版中定义一个id为player的元素用来接受展示像素流的内容

参数：
  - location: 像素流的ws地址
  - callback: 像素流加载完成后的回调函数

```html
<!-- 必须容器 -->
<div id="player"></div>

<script setup>
import { psLoad } from 'zzq-ue'

psLoad(location, callback) 

// 初始化像素流
psLoad('wss://your-streaming-server', () => {
  console.log('Pixel Streaming 初始化完成')
})
</script>
```
### 三种不同的交互方式
#### 方式一（通用模式）
会根据当前设置的环境自动判断发送和接受事件的方式，适合项目中会切换显示方式的场景
##### 发送事件给ue
```js
import { ueSend } from 'zzq-ue'

ueSend(eventName, params, option = { isLog: false, isJson: false })
```
参数：
  - eventName: 事件名称
  - params: 事件参数
  - option: 配置项
    - isLog: 是否打印日志-默认false
    - isJson: 参数是否为json格式-默认false

##### 注册ue发送过来的事件
```js
import { ueRegister } from 'zzq-ue'

ueRegister(eventName, callback)
// 注意：ue传递给前端的事件参数格式为{
//   eventName: '事件名称',
//   eventParam: '参数'
// }
```
参数：
  - eventName: 事件名称
  - callback: 回调函数-(参数为ue传递的事件参数-内部做了处理，会将ue默认发送过来的json数据转换为对象或数组)
##### 当前环境
```js
import { UE_ENV } from 'zzq-ue'

console.log(UE_ENV) // 'ue_engine' | 'pixel_stream'
```
ue_engine：ue嵌套前端环境
pixel_stream：前端嵌套ue像素流环境


`注意：`
- 在使用方式一时，`UE_ENV`的状态很重要，插件内部会根据这个变量判断发送和接受事件的方式。
- 因为可能会有切换显示方式的场景，可以考虑暴露给ue一个更改当前变量的Api，让ue切换显示方式时来调用，在该变量发生变化时会执行下面的函数。

##### 环境发生变化时的回调函数
```js
import { onSetEnv } from 'zzq-ue'

onSetEnv(callback)
```
参数：
  - callback: 回调函数 -（参数为'ue_engine' | 'pixel_stream'）

##### 手动更改当前环境的方法
```js
import { setEnv } from 'zzq-ue'

setEnv(env)
```
参数：
  - env: 'ue_engine' | 'pixel_stream'

除了使用通用方式，还提供了前端嵌套ue像素流的方式（psLoad、psSend、psRegister、psUnregister、psDisconnect、psClose）和ue嵌套前端的方式（ueSend、ueRegister）
#### 方式二（ue嵌套前端项目）
##### 发送事件给ue和注册ue发送过来的事件
```js
import { pcSend, pcRegister } from 'zzq-ue'

pcSend｜pcRegister使用方式同ueSend｜ueRegister
```
#### 方式三（前端嵌套像素流）
##### 加载像素流
```js
import { psLoad } from 'zzq-ue'

psLoad(url, callback)
```
参数：
  - url: ws地址
  - callback: 像素流加载完成后的回调函数

##### 发送事件给ue像素流和注册ue像素流发送过来的事件
```js
import { pcSend, pcRegister } from 'zzq-ue'

psSend｜psRegister使用方式同ueSend｜ueRegister
```
##### 移除监听的像素流事件
```js
import { psUnregister } from 'zzq-ue'

psUnregister(eventName)
```
参数：
  - eventName: 事件名称
##### 断开像素流
```js
import { psDisconnect } from 'zzq-ue'

psDisconnect()
```
##### 关闭像素流
```js
import { psClose } from 'zzq-ue'

psClose()
```
