import userInfo from '../model/userInfoModel'
import md5 from 'md5'
class UserInfoController {
	async userLogin(ctx) {
		const { userName, userPas } = ctx.request.body
		// await userInfo.updateUser({name:'admin',password:md5('123456')})
		let userinfo = await userInfo.getOneUser({ name: userName, password: md5(userPas) })
		if (userinfo.length) {
			ctx.body = {
				status: 200,
				resCode: "G0000",
				data: userinfo[0]
			}
		} else {
			ctx.body = {
				status: 200,
				resCode: "U0001",
				resMsg: "用户名或密码不正确"
			}
		}
	}
	async userRegist(ctx) {
		const { userName, userPas, userPasRe } = ctx.request.body
		if (userPas != userPasRe) {
			ctx.body = {
				status: 200,
				resCode: "U0002",
				resMsg: "两次输入密码不一致，请重新输入"
			}
		}
		// await userInfo.updateUser({name:'admin',password:md5('123456')})
		let userinfo = await userInfo.getOneUserByName({ name: userName })
		if (userinfo.length) {
			ctx.body = {
				status: 200,
				resCode: "U0002",
				resMsg: "该用户名已存在"
			}
		} else {
			await userInfo.addNewUser({ name: userName, password: md5(userPas) })
			ctx.body = {
				status: 200,
				resCode: "G0000",
				resMsg: "注册成功"
			}
		}
	}
	getOneUser() { }
}
export default new UserInfoController()