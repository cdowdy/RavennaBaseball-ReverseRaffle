import { defineStore } from 'pinia'
import { range } from 'src/js/utilities'

export const useRaffleSettingsStore = defineStore('settings', {
  state: () => ({
    ticketsSold: [ 200 ],
    pickedColor: '#08133A',
    baseBoxesOn: 'numbers',
    pickTimer: 20
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
    },
    pickTime( state ) {
      return state.pickTimer
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  },

  persist: true
})
