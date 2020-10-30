import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {path:'/',component:()=> import ('../views/Main.vue'),children:[
      {path:'/',component:()=>import ('../views/Home.vue')},
      {path:'/home',component:()=> import ('../views/Home.vue')},
      {path:'/user',component:()=> import ('../views/User.vue')},
      {path:'/role',component:()=>import ('../views/Role.vue')},
      {path:'/right',component:()=>import ('../views/Right.vue')},
      {path:'/customer',component:()=>import ('../views/Customer.vue')},
      {path:'/callRecords',component:()=>import ('../views/CallRecords.vue')},
      {path:'/msgRecords',component:()=>import ('../views/MsgRecords.vue')},
      {path:'/wxRecord',component:()=>import ('../views/WxRecord.vue')}
    ]},
    {path:'/login',component:()=> import ('../views/Login.vue')},
    {path:'/register',component:()=> import ('../views/Register.vue')}
  ]
})

//路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.accessToken?true : false
  if(to.path=='/login' || to.path=='/register'){
    next()
  }else{
    isLogin?next():next('/login')
  }
})

export default  router