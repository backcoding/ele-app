import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('../views/index')
const Login = () => import('../views/Login')
const Home = () => import('../views/Home')
const Me = () => import('../views/Me')
const Order = () => import('../views/Order')
const Address = () => import('../views/Address')
const City = () => import('../views/City')
const Search = () => import('../views/Search')
const Shop = () => import('../views/Shops/Shop')
const Goods = () => import('../views/Shops/Goods')
const Comments = () => import('../views/Shops/Comments')
const Seller = () => import('../views/Shops/Seller')
const MyAddress = () => import('../views/Orders/MyAddress')
const AddAddress = () => import('../views/Orders/AddAddress')
const Settlement = () => import('../views/Orders/Settlement')
const Remark = () => import('../views/Orders/Remark')
const Pay = () => import('../views/Orders/Pay')
const OrderInfo = () => import('../views/Orders/OrderInfo.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //name: 'index',
    component: Index,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/order',
        name: 'order',
        component: Order
      },
      {
        path: '/me',
        name: 'me',
        component: Me
      },
      {
        path: '/address',
        name: 'address',
        component: Address
      },
      {
        path: '/city',
        name: 'city',
        component: City
      }
    ]
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/search', name: 'search', component: Search },
  {
    path: '/shop',
    name: 'shop',
    redirect: '/goods',
    component: Shop,
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: Goods
      },
      {
        path: '/comments',
        name: 'comments',
        component: Comments
      },
      {
        path: '/seller',
        name: 'seller',
        component: Seller
      },
    ]
  },
  { path: '/myAddress', name: 'myAddress', component: MyAddress },
  { path: '/addAddress', name: 'addAddress', component: AddAddress },
  { path: '/settlement', name: 'settlement', component: Settlement },
  { path: '/remark', name: 'remark', component: Remark },
  { path: '/pay', name: 'pay', component: Pay },
  { path: '/orderInfo', name: 'orderInfo', component: OrderInfo }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false
  if (to.path == '/login') {
    next()
  } else {
    // 是否在登陆状态下
    isLogin ? next() : next('/login')
  }
})

export default router
