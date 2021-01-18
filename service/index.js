import koa from 'koa'
import query from './utils/query'
import router from './router/normolRouter'
import koaCors from 'koa-cors'
import koaBody from 'koa-bodyparser'
import createToken from './utils/createToken'
import staticPage from 'koa-static'
import { socketRouter } from "./router/socketRouter"

const app = new koa()
app.use(koaCors()).use(koaBody({ mutations: true })).use(staticPage('../client/dist')).use(router.routes())

app.listen(3000, err => {
  console.log('run...')
})

const appSocket = new koa()

const server = appSocket.listen(4000);
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket, data) => {
  console.log('连接成功', { id: socket.id })
  for(let key in socketRouter){
    socketRouter[key](io, socket)
  }
});