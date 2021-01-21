import socket from '../model/socketModel'
import userInfo from "../model/userInfoModel"
import { getRoomList, createRoom, joinRoom, outRoom } from "../router/socketRouter"
import md5 from 'md5'
class SocketController {
    async getRoomList(ctx) {
        let roomList = getRoomList().map(item => {
            return {
                id: item.id,
                roomName: item.roomName,
                count: item.socket.length
            }
        })
        // console.log(roomList)
        ctx.body = {
            status: 200,
            resCode: "G0000",
            data: roomList
        }
    }
    async joinRoom(ctx) {
        let roomList = getRoomList()
        ctx.body = {
            status: 200,
            resCode: "G0000",
            data: roomList
        }
    }
    async createRoom(ctx) {
        const { userId, socketId } = ctx.request.body
        let userinfo = await userInfo.getOneUserById(userId)
        if (!userinfo.length) {
            ctx.body = {
                status: 200,
                resCode: "S0001",
                resMsg: "该用户不存在",
                data: null
            }
        }
        let reslute = createRoom({ userinfo, socketId })
        ctx.body = reslute
    }
}
export default new SocketController()