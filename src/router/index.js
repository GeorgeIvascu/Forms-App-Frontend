import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Form from '../components/Form.vue';
import AddQuestion from '../views/AddQuestion';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Form
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path:'/admin/add',
    name:'AddQuestion',
    component: AddQuestion
  }
]

const router = new VueRouter({
  routes
})

export default router
