<template>
  <div class="page">
    <h1>Каталог товаров</h1>
    <p>Перейдите на <RouterLink to="/cart">корзину</RouterLink>, чтобы проверить работу состояния.</p>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} ₽</p>
        
        <!-- Кнопка добавления в корзину -->
        <button @click="addToCart(product)" class="btn-add">В корзину</button>
        
        <!-- Кнопка избранного -->
        <button @click="toggleFavorite(product)" class="btn-fav">
          {{ isFavorite(product.id) ? '★ В избранном' : '☆ В избранное' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'
import { useFavoritesStore } from '../stores/favorites.js'

const cartStore = useCartStore() // подключаем хранилище корзины
const favStore = useFavoritesStore() // подключаем хранилище избранного

// Список товаров
const products = [
  { id: 1, name: 'Ноутбук', price: 75000 },
  { id: 2, name: 'Смартфон', price: 35000 },
  { id: 3, name: 'Наушники', price: 5000 }
]

// Добавляем товар в корзину
const addToCart = (product) => {
  cartStore.addToCart(product)
}

// Добавляем/удаляем из избранного
const toggleFavorite = (product) => {
  favStore.toggle(product)
}

// Проверяем, в избранном ли товар
const isFavorite = (id) => {
  return favStore.items.some((i) => i.id === id)
}
</script>

<style scoped>
.page { max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.products-grid { display: flex; gap: 20px; margin-top: 20px; }
.product-card { border: 1px solid #ccc; padding: 15px; border-radius: 8px; width: 200px; }
.btn-add { display: block; margin-top: 10px; padding: 8px 15px; background: #42b983; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
.btn-fav { display: block; margin-top: 5px; padding: 8px 15px; background: #f9f9f9; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; width: 100%; }
</style>