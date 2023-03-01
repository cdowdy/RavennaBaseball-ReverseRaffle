import { defineStore } from 'pinia'

export const useRaffleSettingsStore = defineStore('settings', {
  state: () => ({
    ticketsSold: 200,
    pickedColor: '#08133A',
    baseBoxesOn: 'numbers'
  }),

  getters: {
    numberSold (state) {
      return state.ticketsSold
    },
    numberPickedColor ( state ) {
      return state.pickedColor
    },
    raffleBasedOn ( state ) {
      return state.baseBoxesOn
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  },

  persist: true
})
