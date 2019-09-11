import Router from 'koa-router'
import { base_API } from '../config.js'
import userInfoController from '../controller/userInfoController'
const router = new Router()

router.prefix(base_API)
router.get('/', userInfoController.userLogin)


export default router