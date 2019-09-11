import userInfo from '../model/userInfoModel'
import md5 from 'md5'
class UserInfoController {
	async userLogin(ctx) {
		// let info = await userInfo.addNewUser({name:'ceshi',password:'13213213'})
		await userInfo.updateUser({name:'admin',password:md5('13213213')})
		let userinfo = await userInfo.getOneUser({name:'admin',password:'13213213'})
		// console.log(info)
		console.log(userinfo)
		ctx.body = {
			status: 200
		}
	}
	getOneUser() { }
}
export default new UserInfoController()