import Router from 'koa-router'
import { base_API } from '../config.js'
import userInfoController from '../controller/userInfoController'
import socketController from '../controller/socketController'
const router = new Router()

router.prefix(base_API)
router.post('/login', userInfoController.userLogin)
router.post('/regist', userInfoController.userRegist)
router.get('/getRoomList', socketController.getRoomList)
router.post('/createRoom', socketController.createRoom)


export default router