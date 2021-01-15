# speakroom

> A node.js project

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

# 接口文档
前缀：本机ip地址加端口号加 /api （例如：http://192.168.0.127:3000/api）
```
| 接口名        | 请求方式    |  参数   |
| --------   | :-----:   | :----: |
| /login        | POST      |   userName / userPas    |
| /regist        | POST      |   userName / userPas / userPasRe    |