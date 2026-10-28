import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] // массив избранных товаров
  }),
  getters: {
    count: (state) => state.items.length // количество избранных
  },
  actions: {
    toggle(product) {
      // Если товар уже в избранном — удаляем, иначе — добавляем
      const index = this.items.findIndex((i) => i.id === product.id)
      if (index >= 0) {
        this.items.splice(index, 1)
      } else {
        this.items.push(product)
      }
    }
  }
})