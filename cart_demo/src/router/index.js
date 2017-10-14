import Vue from 'vue'
import Router from 'vue-router'

import ProductList from '@/pages/ProductList'
import Cart from '@/pages/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: ProductList},
    { path: '/productList', component: ProductList},
    { path: '/cart', component: Cart },
  ]
})
