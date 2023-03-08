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
       />
      </div>
    </template>
    <template v-else>
      <div class="row flex-center number-row"
           v-for="item in chunkedRows"
           :key="item">
        <draw-box v-for="key in item" :key="key" :id="key.value" :picked="key.picked" />
      </div>
    </template>

  </q-page>
  <div class="q-py-md">

    <div class="row justify-center items-center">
      <div class="col">
        <q-btn color="primary" label="Start" @click="startRaffle()"/>
        <q-btn color="secondary" label="Stop Raffle" @click="stopRaffle()" />
      </div>
      <div class="col">
        <router-link class="q-mb-auto q-mt-auto  text-weight-medium justify-center"
                     to="/settings">
          Settings
        </router-link>
      </div>
    </div>
  </div>


</template>

<script setup>
import { ref} from 'vue'
import {useRaffleSettingsStore} from "stores/raffleSettings";
import { useContestantStore} from 'stores/raffleContestants'
import {useQuasar} from "quasar";
import {storeToRefs} from "pinia";
import DrawBox from "components/drawBox.vue";
import _sample from 'lodash/sample'
import modalDialog from "components/modalDialog.vue";


const store = useRaffleSettingsStore();
const {numberSold, numberPickedColor, raffleBasedOn} = storeToRefs(store)
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


function getRandom(input) {
  console.log('getContestants from random', getContestants.value
  )

  let index = _sample(input)
  let dialogSeconds = 3
  console.log('index', index )

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
  //width: v-bind(chunkedRowBoxSize);
  min-width: 4.9vw;
  //min-height: 10vh;

    & p {
      font-size: 20px;
      margin: 20px 0;
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
