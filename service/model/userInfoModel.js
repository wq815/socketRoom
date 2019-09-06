import query from '../utils/query'
import escape from '../utils/escape'

class UserInfoModel {
	async userLogin() {
		return await query(escape`select * from user`)
	}
	async getOneUser(id) {
		return await query(escape`select * from user where user="admin"`)
	}
}
export default new UserInfoModel()