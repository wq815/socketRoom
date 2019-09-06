import Router from 'koa-router'
import { base_API } from '../config.js'
import userInfoController from '../controller/userInfoController'
const router = new Router()

router.get('/', userInfoController.userLogin)

// router.prefix(base_API)


export default router