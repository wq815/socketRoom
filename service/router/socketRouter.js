export const socketRouter = {
    "chatmessage": (msg) => {
        let name = null
        for (let i of arr) {
            if (i.socketId == socket.id) {
                name = i.name
            }
        }
        socket.emit("message", "message")
        message.push({ name: name, message: msg })
        io.sockets.emit('user', { name: name, message: msg })
    },
    "reset": () => {
        message = []
        io.sockets.emit('reset')
    }
}