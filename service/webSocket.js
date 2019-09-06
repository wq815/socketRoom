import koa from 'koa'
import query from './utils/query'
import Mock from 'mockjs'
let Random = Mock.Random

let count = 0
let arr = []
let message = []

const app = new koa()

const server = app.listen(4000);
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket, data) => {
    console.log('连接成功', { id: socket.id })
    arr.push({ socketId: socket.id, name: Random.cname() })
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
        message.push({ name: name, message: msg })
        io.sockets.emit('user', { name: name, message: msg })
    });
    socket.on('reset',()=>{
        message = []
        io.sockets.emit('reset')
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
        console.log('user disconnected',socket.id);
    });
});