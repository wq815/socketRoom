import userInfo from '../model/userInfoModel'
class UserInfoController {
	async userLogin(ctx) {
		let info = await userInfo.getOneUser()
		ctx.body = {
			status: info
		}
	}
	getOneUser() { }
}
export default new UserInfoController()