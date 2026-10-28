<template>
  <!-- Шапка с ссылками и счётчиками -->
  <nav style="padding: 1rem 0; border-bottom: 1px solid #eee; display: flex; gap: 20px; align-items: center; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
    <RouterLink to="/" style="margin-right: 1rem;">Каталог</RouterLink>
    <RouterLink to="/cart">Корзина ({{ cartStore.count }})</RouterLink>
    <span style="margin-left: auto; color: #e91e63;">★ Избранное: {{ favStore.count }}</span>
  </nav>
  
  <!-- Сюда подставляются страницы -->
  <RouterView />
</template>

<script setup>
import { useCartStore } from './stores/cart.js'
import { useFavoritesStore } from './stores/favorites.js'

const cartStore = useCartStore()
const favStore = useFavoritesStore()
</script>