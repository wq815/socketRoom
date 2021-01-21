# speakroom

> A node.js project

mysql 中间件对于 mysql8 以上的默认强密码规则无法兼容，需要更改这个设置。具体方式请自行百度！

## Build Setup

## resCode 含义
| resCode        | 含义    |
| --------   | -----:   |
| G0000        | 请求成功      |
| U0001        | 登录用户名或密码错误     |
| U0002        | 注册相关错误     |

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
## 接口文档(普通请求)
<!-- <font color=#00ffff>  字体改成蓝色了 </font>   -->
前缀：本机ip地址加端口号加 /api （例如：http://192.168.0.127:3000/api）

| 接口名        | 请求方式    |  参数   |
| --------   | :-----:   | :----: |
| /login        | POST      |   userName / userPas    |
| /regist        | POST      |   userName / userPas / userPasRe    |

## 接口文档(socket-server)
| 方法名             |  参数   | 描述 |
| --------          | :----: | :---- |
| reset             |   无    | 用于清空该聊天的所有内容 |
| connection        |   无   | 链接成功时调用 |
| chatmessage       |   chatmessage    | 用于发送信息并广播 |
## 接口文档(socket-client)
| 方法名             |  参数   | 描述 |
| --------          | :----: | :---- |
| message           |   message    | 用于提示用户相关信息 |
| messageList       |   messageList    | 用于返回聊天信息，和接收其他用户信息 |
| userNum       |   userNum    | 返回当前连接数 |