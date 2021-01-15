import query from '../utils/query'
import escape from '../utils/escape'

class UserInfoModel {
	async userLogin() {
		return await query(escape`select * from user`)
	}
	async getOneUserByName(user) {
		return await query(escape`select * from user where user=${user.name}`)
	}
	async getOneUser(user) {
		return await query(escape`select * from user where user=${user.name} and password=${user.password}`)
	}
	async addNewUser(user) {
		return await query(escape`INSERT INTO user (user,password) values(${user.name},${user.password})`)
	}
	async deleteUser(user) {
		return await query(escape`delete from user where user=${user.name}`)
	}
	async updateUser(user) {
		return await query(escape`UPDATE user set password=${user.password} where user=${user.name}`)
	}
}
export default new UserInfoModel()