import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProductDetails from '@/components/ProductDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products/:productId',
      name: 'ProductDetails',
      component: ProductDetails
    },
    { path: '*', redirect: '/' }
  ]
})
