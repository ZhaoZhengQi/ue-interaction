# zzq-cli
![Npm 版本](https://img.shields.io/badge/zzq-ue_v0.0.6-blue)
## 📖 简介
用于前端项目与ue项目交互（包括ue引擎嵌套前端项目，或前端嵌套ue像素流两种方式）

## 🔩 安装
```bash
npm install zzq-ue
```

## 📚 使用
由于ue引擎嵌套前端项目、前端嵌套ue像素流是两种不同的接入方式，所以也就导致交互方式也是不同

使用`ueSend、ueRegister`发送和接收事件是会在内部通过判断当钱环境来决定使用哪种交互方式的

`UE_ENV`为ue的环境变量

`onSetEnv`为环境发生变化时的回调

`pcSetEnv`为手动更改当前环境的方法


## 💡 API
### ue嵌套前端环境下
#### pcSend()
  由前端发送事件给ue引擎
    
    参数：eventName: 事件名称；params: 事件参数；option: 配置项 ；

    配置项默认为：{ isLog: false, isJson: false }

    isLog: 是否打印日志,默认为false
    
    isJson: 参数是否为json格式，默认为false
#### pcRegister()
  由前端注册ue引擎发送过来的事件
    
    参数：eventName: 事件名称 ； callback: 回调函数  ；
## 前端嵌套ue像素流环境下
### psLoad()
  加载像素流画面
    
    参数：path:ws地址；callback:回调函数

### psSend()
  前端发送时间给像素流
  
    参数：eventName:事件名称；params:事件参数

### psRegister()
  前端注册像素流发送过来的事件
  
      参数：eventName:事件名称；callback:回调函数

### psUnregister()
  移除监听的像素流事件
  
      参数：eventName:事件名称
### psDisconnect()
  断开像素流
### psClose()
  关闭像素流
  
## 通用模式
会根据当前设置的环境自动判断发送和接受事件的方式，适合项目中会切换显示方式的场景

### ueSend
  前端发送事件给ue引擎，参数同上
### ueRegister
  前端注册ue引擎发送过来的事件，参数同上
### onSetEnv
  环境发生变化时的回调
### pcSetEnv
  手动更改当前环境
### UE_ENV
  当前模式的环境变量








