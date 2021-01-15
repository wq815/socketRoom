import koa from 'koa'
import query from './utils/query'
import router from './router/normolRouter'
import koaCors from 'koa-cors'
import koaBody from 'koa-bodyparser'
import ws from 'ws'
import Mock from 'mockjs'
import createToken from './utils/createToken'
import staticPage from 'koa-static'
import {socketRouter} from "./router/socketRouter"
let Random = Mock.Random

const app = new koa()
// var WebSocketServer = require('ws').Server
// var wss = new WebSocketServer({ port: 8181 });
// wss.on('connection', function (ws) {
//   console.log('client connected');
//   ws.on('message', function (message) {
//     console.log(message);
//     ws.send('请求成功')
//   });
// });
app.use(koaCors()).use(koaBody({ mutations: true })).use(staticPage('../client/dist')).use(router.routes())

app.listen(3000, err => {
  console.log('run...')
})


let count = 0
let arr = []
let message = []
let nickNames = {}
let roomName = {}
const appSocket = new koa()

const server = appSocket.listen(4000);
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket, data) => {
  console.log('连接成功', { id: socket.id })
  arr.push({ socketId: socket.id, socket: socket, name: Random.cname() })
  for (let i of message) {
    socket.emit('user', i)
  }
  count = count + 1
  io.sockets.emit('userNum', count)
  socket.on('chatmessage', (msg) => {
    let name = null
    for (let i of arr) {
      if (i.socketId == socket.id) {
        name = i.name
      }
    }
    socket.emit("message", "message")
    message.push({ name: name, message: msg })
    io.sockets.emit('user', { name: name, message: msg })
  });
  socket.on('reset', () => {
    message = []
    io.sockets.emit('reset')
  })
  socket.on('getUserNum', () => {
    socket.emit('userNum', count)
  })
  socket.on('disconnect', () => {
    socket.emit('logout')
    let index = null
    for (let i in arr) {
      if (arr[i].socketId == socket.id) {
        index = i
      }
    }
    arr.splice(index, 1)
    count = count - 1
    io.sockets.emit('userNum', count)
    console.log('user disconnected', socket.id);
  });
});
function addRoomNames(socket, name) {
  nickNames[socket.id] = name
  ++count
}