import { defineStore } from 'pinia'
import  _filter from 'lodash/filter'
import { range } from 'src/js/utilities'

export const useRaffleSettingsStore = defineStore('settings', {
  state: () => ({
    ticketsSold:  200 ,
    pickedColor: '#08133A',
    baseBoxesOn: 'numbers',
    pickTimer: 20,
    drawType: 'manual',
    ticketNumbers: null
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
    },

    getDrawType( state ) {
      return state.drawType
    },

    getTicketNumberList( state ) {
      // let numberRange = range(1, this.numberSold.value, 1 )
      state.ticketNumbers= range(1, this.numberSold, 1 );
      let allState = state.ticketNumbers.map( value => ( {
        ...value, number: value,  picked: false
      }))
      return state.ticketNumbers = allState
    },

    getChunkedNumberRows( state ) {
      let group = [];
      let itemsPer = 20;

      if ( this.getTicketNumberList.length > 249 ) {
        console.log('we got more than 249')
        itemsPer = 30
      }

      for(var i = 0; i < this.getTicketNumberList.length ; i += itemsPer) {

        group.push(this.getTicketNumberList.slice(i, i+itemsPer));
      }
      return group
    },

    getPickedNumbers( state ) {
      // let contest = state.ticketNumbers.find ( ( contestant ) => contestant.picked === true)
      let pickedNumbers = _filter( state.ticketNumbers, 'picked')


      return Object.fromEntries( contest )
    }
  },

  actions: {
      picked ( numberToFind ) {

        console.log('numberToFind', numberToFind )

        const contestants = this.getTicketNumberList.find((obj) => obj.number === numberToFind);

        if (contestants) {
          contestants.picked = !contestants.picked;
        }
      },
  },

  persist: true
})
