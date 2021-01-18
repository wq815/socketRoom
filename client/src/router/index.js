import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/page/HelloWorld'
import Login from '@/components/Login'
import JoinRoom from '@/components/page/joinRoom'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/joinRoom',
      name: 'joinRoom',
      component: JoinRoom
    },
    {
      path: '/home2',
      name: 'home2',
      component: Home
    },
    {
      path: "/",
      redirect: "/helloWorld",
      component: Home,
      children: [
        {
          path: "/helloWorld",
          name: "helloWorld",
          component: HelloWorld
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  const whiteList = ["login"]
  const userInfo = sessionStorage.getItem("userInfo")
  // console.log(userInfo)
  if (userInfo || whiteList.indexOf(to.name) != -1) {
    next()
  } else {
    next("/login")
  }
})

export default router
