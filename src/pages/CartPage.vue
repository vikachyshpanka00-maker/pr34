<template>
  <div class="page">
    <h1>Корзина</h1>

    <!-- Блок с итогами -->
    <div class="cart-summary">
      <p><strong>Товаров:</strong> {{ cartStore.count }}</p>
      <p><strong>Итого:</strong> {{ cartStore.sum }} ₽</p>
    </div>

    <!-- Список товаров -->
    <ul v-if="cartStore.items.length" class="cart-list">
      <li v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <div class="item-info">
          <strong>{{ item.name }}</strong>
          <span>{{ item.price }} ₽ × {{ item.quantity }}</span>
        </div>
        <div class="item-actions">
          <button @click="updateQuantity(item.id, -1)" class="btn-qty">-</button>
          <button @click="updateQuantity(item.id, 1)" class="btn-qty">+</button>
          <button @click="removeFromCart(item.id)" class="btn-remove">Удалить</button>
        </div>
      </li>
    </ul>
    <p v-else>Корзина пуста.</p>

    <!-- Дополнительные функции -->
    <div class="bottom-actions" v-if="cartStore.items.length">
      <button @click="undo" class="btn-undo">Отменить последнее действие</button>
      <button @click="downloadCart" class="btn-download">Скачать корзину (JSON)</button>
      <button @click="clearCart" class="btn-danger">Очистить корзину</button>
    </div>

    <p style="margin-top: 1.5rem; color: #666;">
      Обнови страницу – состояние сохранится благодаря localStorage.
    </p>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()

// Удаление товара
const removeFromCart = (id) => {
  cartStore.removeFromCart(id)
}

// Изменение количества
const updateQuantity = (id, delta) => {
  cartStore.updateQuantity(id, delta)
}

// Очистка корзины
const clearCart = () => {
  cartStore.clearCart()
}

// Отмена последнего действия
const undo = () => {
  cartStore.undo()
}

// Скачивание JSON
const downloadCart = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cartStore.items, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute("href", dataStr)
  downloadAnchor.setAttribute("download", "cart.json")
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}
</script>

<style scoped>
.page { max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.cart-summary { background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
.cart-list { list-style: none; padding: 0; }
.cart-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border-bottom: 1px solid #eee; }
.item-actions button { margin-left: 0.4rem; padding: 0.3rem 0.6rem; cursor: pointer; }
.btn-qty { background: #eee; border: 1px solid #ccc; }
.btn-remove { background: #ffebee; color: #c62828; border: none; }
.btn-danger { padding: 0.7rem 1.2rem; background: #c62828; color: white; border: none; border-radius: 4px; cursor: pointer; }
.bottom-actions { display: flex; gap: 10px; margin-top: 20px; }
.btn-undo { padding: 0.7rem 1.2rem; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer; }
.btn-download { padding: 0.7rem 1.2rem; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>