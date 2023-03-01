import { defineStore } from 'pinia'

export const useContestantStore = defineStore('contestants', {
  state: () => ({
    allContestants: {}
  }),

  getters: {
    getContestants (state) {
      return state.allContestants
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
