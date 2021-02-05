import Mock from 'mockjs'

let Random = Mock.Random
let count = 0
let arr = []
let message = []
let roomList = []

export const joinRoom = ({ userinfo, socketId, roomId }) => {
	let socket = getUserById(socketId)
	let roomInfo = getRoomById(roomId)
	if (!socket || !roomInfo) {
		return {
			status: 200,
			resCode: "S0001",
			resMsg: "该用户不存在",
			data: null
		}
	}
	roomInfo.socket.push(socket)
	roomInfo.userId.push(userinfo[0].id)
	return {
		status: 200,
		resCode: "G0000",
		data: {
			id: roomId
		}
	}
}

export const createRoom = ({ userinfo, socketId }) => {
	let socket = getUserById(socketId)
	if (!socket) {
		return {
			status: 200,
			resCode: "S0001",
			resMsg: "该用户不存在",
			data: null
		}
	}
	let roomName = Random.ctitle(2, 5)
	let roomId = Random.guid()
	roomList.push({
		id: roomId,
		roomName,
		socket: [socket],
		userId: [userinfo[0].id]
	})
	return {
		status: 200,
		resCode: "G0000",
		data: {
			id: roomId,
			roomName,
		}
	}
}

export const outRoom = ({ roomId, userId }) => {
}

export const getRoomList = () => {
	return roomList
}

const getUserById = (socketId) => {
	let reslute = null
	arr.map(item => {
		if (item.socketId == socketId) {
			reslute = item
		}
	})
	return reslute
}

const getRoomById = (roomId) => {
	let reslute = null
	roomList.map(item => {
		if (item.id == roomId) {
			reslute = item
		}
	})
	return reslute
}

export const socketRouter = {
	"connection": (io, socket) => {
		let name = Random.cname()
		arr.push({ socketId: socket.id, socket: socket, name })
		socket.on("getName", () => {
			socket.emit('getName', name)
		})
	},
	"messageList": (io, socket) => {
		count = count + 1
		io.sockets.emit('userNum', count)
	},
	"chatmessage": (io, socket) => {
		socket.on('chatmessage', ({ roomId, value }) => {
			let name = null
			for (let i of arr) {
				if (i.socketId == socket.id) {
					name = i.name
				}
			}
			let room = getRoomById(roomId)
			room.socket.map(item=>{
				io.to(item.id).emit('messageList', { name: name, message: value, id: socket.id })
			})
			// socket.emit("message", "发送成功")
			message.push({ name: name, message: value, id: socket.id })
		});
	},
	"reset": (io, socket) => {
		socket.on('reset', () => {
			message = []
			io.sockets.emit('reset')
		})
	},
	"getUserNum": (io, socket) => {
		socket.on('getUserNum', (roomId) => {
			let count = null
			roomList.map(item => {
				console.log(roomId, item)
				if (item.id == roomId) {
					count = item.socket.length
				}
			})
			console.log(count)
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
	"getRoomName": (io, socket) => {
		socket.on('getRoomName', (roomId) => {
			let name = null
			for (let room of roomList) {
				if (room.id == roomId) {
					name = room.roomName
				}
			}
			socket.emit('getRoomName', name)
		})
	},
	"joinRoom": (io, socket) => {
		socket.on('joinRoom', (data) => {
			joinRooms(data, socket)
		})
	},
	"disconnect": (io, socket) => {
		socket.on('disconnect', ({ roomId, userId }) => {
			outRoom({ roomId, userId })
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