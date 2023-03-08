import { defineStore } from 'pinia'

export const useContestantStore = defineStore('contestants', {
  state: () => ({
    allContestants: {}
  }),

  getters: {
    getContestants (state) {
      let allState = state.allContestants.map( value => ( {
        ...value,  picked: false
      }))
      this.allContestants = allState
      return state.allContestants
    },
    getContestantByNumber (state)  {
      return ( contestantNumber ) => state.allContestants.find ( ( contestant ) => contestant.numberPurchased === contestantNumber)
    },

    getChunkedRows (state) {
      let group = [];
      let itemsPer = 20;
      for(var i = 0; i < this.getContestants.length; i += itemsPer) {
        group.push(this.getContestants.slice(i, i+itemsPer));
      }
      return group
    }
  },

  actions: {
    picked ( numberToFind ) {


      const contestants = this.allContestants.find((obj) => obj.numberPurchased === numberToFind);

      if (contestants) {
        contestants.picked = !contestants.picked;
      }
    },
  },

  persist: true
})
