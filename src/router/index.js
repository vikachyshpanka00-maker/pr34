import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '../pages/CatalogPage.vue' // страница каталога
import CartPage from '../pages/CartPage.vue' // страница корзины

const routes = [
  { path: '/', name: 'Catalog', component: CatalogPage }, // главная — каталог
  { path: '/cart', name: 'Cart', component: CartPage } // страница корзины
]

export default createRouter({
  history: createWebHistory(), // используем историю браузера (URL без #)
  routes // передаем маршруты
})