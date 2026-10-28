import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  // 1. СОСТОЯНИЕ (данные)
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart_items')) || [], // берем корзину из localStorage или пустой массив
    history: [] // история для кнопки "Отменить"
  }),

  // 2. ГЕТТЕРЫ (вычисляемые значения)
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0), // общее количество товаров
    sum: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0) // общая сумма
  },

  // 3. ДЕЙСТВИЯ (изменение состояния)
  actions: {
    addToCart(product) {
      // Проверка лимита (не больше 10 товаров)
      if (this.count >= 10) {
        alert('Лимит корзины: не более 10 товаров!')
        return
      }

      // Сохраняем историю для отмены
      this.history.push(JSON.parse(JSON.stringify(this.items)))

      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity += 1 // если товар уже есть — увеличиваем количество
      } else {
        // если нет — добавляем новый
        this.items.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
      }
      this.saveToLocalStorage()
    },

    removeFromCart(id) {
      this.history.push(JSON.parse(JSON.stringify(this.items)))
      this.items = this.items.filter((i) => i.id !== id) // оставляем все, кроме удаляемого
      this.saveToLocalStorage()
    },

    updateQuantity(id, delta) {
      this.history.push(JSON.parse(JSON.stringify(this.items)))
      const item = this.items.find((i) => i.id === id)
      if (!item) return

      item.quantity += delta // меняем количество (+1 или -1)

      if (item.quantity <= 0) {
        this.removeFromCart(id) // если стало 0 — удаляем
      } else {
        this.saveToLocalStorage()
      }
    },

    clearCart() {
      this.history.push(JSON.parse(JSON.stringify(this.items)))
      this.items = [] // очищаем
      this.saveToLocalStorage()
    },

    undo() {
      // Отмена последнего действия
      if (this.history.length > 0) {
        this.items = this.history.pop()
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      // Сохраняем в localStorage при каждом изменении
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    }
  }
})