<template>
  <q-page class="fill-height-more">
    <template v-if="store.raffleBasedOn === 'contestantList' && getContestants.length >= 1 "

    >
      <div class="row flex-center number-row" v-for="item in contestantsStore.getChunkedRows "
           :key="item.picked">

       <draw-box v-for="(key, value ) in item"
                 :key="value.picked"
                 :blob="key"
                 :id="key.numberPurchased"
                 :picked="key.picked"
                 :purchaserName="key.name"
                 @manually-selected="manuallyPicked(key)"
       />
      </div>
    </template>
    <!-- if the getTicketNumbersList has entries and is bigger than or equal too 1 -->
    <template v-else-if="store.raffleBasedOn === 'numbers' && store.getTicketNumberList.length >= 1 ">
      <div class="row flex-center number-row" v-for="item in  store.getChunkedNumberRows  "
           :key="item.picked">

        <draw-box v-for="(key, value ) in item"
                  :key="value.picked"
                  :blob="key"
                  :id="key.number"
                  :picked="key.picked"
                  @manually-selected="numberOnlyPick(key)"
        />
      </div>

    </template>
    <!-- if not then show the raven logo -->
    <template v-else>
     <div class="row justify-center">
       <div class="col-6">
         <q-img src="~assets/raven_400x400.png" fit="contain"/>
         <h4 class="text-center text-primary">Ravenna Baseball</h4>
       </div>
     </div>
    </template>

  </q-page>
  <div class="q-py-md" >

    <div class="row justify-center items-center">
      <div class="col-4" v-if="getDrawType === 'random' ">
        <q-btn color="primary" label="Start" @click="startRaffle()"/>
        <q-btn color="secondary" label="Stop Raffle" @click="stopRaffle()" />
      </div>
      <div class="col-4 items-center">
        <router-link class="q-mb-auto q-mt-auto  text-weight-medium justify-center"
                     to="/settings">
          Settings
        </router-link>
      </div>
      <div class="col-4">
        <router-link class="q-mb-auto q-mt-auto  text-weight-medium justify-center"
                     to="/picked">
          Picked Numbers
        </router-link>
      </div>
    </div>
  </div>


</template>

<script setup>
import {computed, ref} from 'vue'
import {useRaffleSettingsStore} from "stores/raffleSettings";
import { useContestantStore} from 'stores/raffleContestants'
import {useQuasar} from "quasar";
import {storeToRefs} from "pinia";
import DrawBox from "components/drawBox.vue";
import _sample from 'lodash/sample'
import modalDialog from "components/modalDialog.vue";
import {range} from "src/js/utilities";


const store = useRaffleSettingsStore();
const {numberSold, numberPickedColor, raffleBasedOn, getDrawType , getChunkedNumberRows } = storeToRefs(store)
const contestantsStore = useContestantStore()


const {getContestants, getChunkedRows  } = storeToRefs(contestantsStore)


const $q = useQuasar();

let intervalID;

// use Array.from to get all the numbers from the number of tickets sold and 1
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
// const numberIsPickedColor = ref( numberPickedColor );
// const setBGColor = () => { console.log( 'clicked' )}




const startRaffle = () => {

  const flattened = getChunkedRows.value.flat(Infinity);

  if (!intervalID) {
    intervalID = setInterval(  () => {
      getRandom(flattened)
    }, 5000)
  }
}

const stopRaffle = () => {
  clearInterval(intervalID)
  intervalID = null;
}

function numberOnlyPick(payload) {
  let dialogSeconds = 3

  const dialog =  $q.dialog({
    component: modalDialog,

    componentProps:{
      pickedName: payload.number
    },
  })
    .onOk(() => {
    })
    .onCancel(() => {
    })
    .onDismiss(() => {
      clearTimeout( dialogTimer )
    })

  const dialogTimer = setInterval(() => {
    dialogSeconds--

    if (dialogSeconds > 0) {
      dialog.update({
        message: `Autoclosing in ${dialogSeconds} second${dialogSeconds > 1 ? 's' : ''}.`
      })
    }
    else {
      clearInterval(dialogTimer)
      dialog.hide()
    }
  }, 1000)



  return store.numberOnlyPicked( payload.number )
}

function manuallyPicked(payload) {
  let dialogSeconds = 3


  const dialog =  $q.dialog({
    component: modalDialog,

    componentProps:{
      pickedName: payload.name,
      pickedNumber: payload.numberPurchased
    },
  })
    .onOk(() => {
    })
    .onCancel(() => {
    })
    .onDismiss(() => {
      clearTimeout( dialogTimer )
    })

  const dialogTimer = setInterval(() => {
    dialogSeconds--

    if (dialogSeconds > 0) {
      dialog.update({
        message: `Autoclosing in ${dialogSeconds} second${dialogSeconds > 1 ? 's' : ''}.`
      })
    }
    else {
      clearInterval(dialogTimer)
      dialog.hide()
    }
  }, 1000)



  return contestantsStore.picked( payload.numberPurchased )
}

function getRandom(input) {

  let index = _sample(input)
  let dialogSeconds = 3

  const dialog =  $q.dialog({
    component: modalDialog,

    componentProps:{
      pickedName: index.name,
      pickedNumber: index.numberPurchased
    },
  })
    .onOk(() => {
      console.log('ok')
    })
    .onCancel(() => {
      console.log('canceled')
    })
    .onDismiss(() => {
      clearTimeout( dialogTimer )
      console.log('Called on OK or Cancel')
    })

  const dialogTimer = setInterval(() => {
    console.log('dialog befer --', dialogSeconds)
    dialogSeconds--
    console.log('ds after', dialogSeconds )

    if (dialogSeconds > 0) {
      dialog.update({
        message: `Autoclosing in ${dialogSeconds} second${dialogSeconds > 1 ? 's' : ''}.`
      })
    }
    else {
      clearInterval(dialogTimer)
      dialog.hide()
    }
  }, 1000)

  return contestantsStore.picked( index.numberPurchased )
}

</script>

<style lang="scss">
.draw-box--container {
  //height: 10%;

  //min-width: 4.9vw;
  min-width: 3.2vw;

  //min-height: 10vh;

    & p {
      font-size: 20px;
      margin: 20px 0;
    }
  &:hover {
    cursor: pointer;
  }
}

.fill-height-more {
  display: flex;
  flex-direction: column;
}

.fill-height-more > div {
  /* these are the flex items */
  //flex: 1;
  //display: flex;
  //justify-content: center;
  ////flex-direction: column;
  //align-items: stretch;
}

.number-row {
  //flex-grow: 1;
  flex: 1;
  display: flex;
  justify-content: center;
  //flex-direction: column;
  align-items: stretch;
}

.draw-box {
  //flex-grow: 1;
  //flex: 1 1 0;
 //min-width: 4.9vw;
}

.row-height {
  //min-height: 100% !important;
  //height: 100%;
}

</style>
