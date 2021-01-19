import Mock from 'mockjs'

let Random = Mock.Random
let count = 0
let arr = []
let message = []
let nickNames = {}
let roomName = {}

function joinRooms() {

}

export const socketRouter = {
	"connection": (io, socket) => {
		arr.push({ socketId: socket.id, socket: socket, name: Random.cname() })
	},
	"messageList": (io, socket) => {
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
			socket.emit("message", "发送成功")
			message.push({ name: name, message: msg, id: socket.id })
			io.sockets.emit('messageList', { name: name, message: msg, id: socket.id })
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
	"getSocketId": (io, socket) => {
		socket.on('getSocketId', () => {
			socket.emit('getSocketId', socket.id)
		})
	},
	"readyToRoom": (io, socket) => {
		socket.on('readyToRoom', () => {
			let index = null
			for (let i in arr) {
				if (arr[i].socketId == socket.id) {
					index = i
				}
			}
			io.sockets.emit('messageList', { name: arr[index].name, message: `匿名用户${arr[index].name}加入聊天室`, id: null })
		})
	},
	"joinRoom": (io, socket) => {
		socket.on('joinRoom', (data) => {
			joinRooms(data, socket)
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
			io.sockets.emit('messageList', { name: arr[index].name, message: `匿名用户${arr[index].name}退出聊天室`, id: null })
			arr.splice(index, 1)
			count = count - 1
			io.sockets.emit('userNum', count)
			console.log('user disconnected', socket.id);
		});
	},
}