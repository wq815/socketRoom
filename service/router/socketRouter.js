import Mock from 'mockjs'

let Random = Mock.Random
let count = 0
let arr = []
let message = []
let nickNames = {}
let roomName = {}

export const socketRouter = {
    "connection": (io, socket) => {
        arr.push({ socketId: socket.id, socket: socket, name: Random.cname() })
    },
    "user": (io, socket) => {
        for (let i of message) {
            socket.emit('user', i)
        }
        count = count + 1
        io.sockets.emit('userNum', count)
    },
    "chatmessage": (io, socket) => {
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
    },
    "reset": (io, socket) => {
        socket.on('reset', () => {
            message = []
            io.sockets.emit('reset')
        })
    },
    "getUserNum": (io, socket) => {
        socket.on('getUserNum', () => {
            socket.emit('userNum', count)
        })
    },
    "disconnect": (io, socket) => {
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
    },
}