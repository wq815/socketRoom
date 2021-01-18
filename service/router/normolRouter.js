import Router from 'koa-router'
import { base_API } from '../config.js'
import userInfoController from '../controller/userInfoController'
const router = new Router()

router.prefix(base_API)
router.post('/login', userInfoController.userLogin)
router.post('/regist', userInfoController.userRegist)


export default router