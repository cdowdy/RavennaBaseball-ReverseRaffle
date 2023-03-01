<template>
  <q-page>
    <template v-if="store.raffleBasedOn === 'contestantList' && getContestants.length >= 1 "

    >
      <div class="row justify-center" v-for="item in chunkedRows" :key="item">
       <draw-box v-for="key in item" :key="key" :id="key.numberPurchased" :purchaser-name="key.name" />
      </div>
    </template>
    <template v-else>

      <div class="row justify-center" v-for="item in chunkedRows" :key="item">
        <draw-box v-for="key in item" :key="key" :id="key" />
      </div>
    </template>

  </q-page>
  <div class="q-py-md">

    <div class="row justify-center items-center">
      <div class="col">
        <q-btn color="primary" label="Start" @click="setBGColor()"/>
      </div>
      <div class="col">
        <router-link class="q-mb-auto q-mt-auto  text-weight-medium justify-center"
                     to="/settings">
          Settings
        </router-link>
      </div>
    </div>
  </div>
<!--  <q-page-container>-->
<!--    &lt;!&ndash;    style="width: 100vw; height: 15vh;"&ndash;&gt;-->

<!--  </q-page-container>-->
</template>

<script setup>
import {defineComponent, computed, ref, onMounted} from 'vue'
import {useRaffleSettingsStore} from "stores/raffleSettings";
import { useContestantStore} from 'stores/raffleContestants'
import {useQuasar} from "quasar";
import {storeToRefs} from "pinia";
import DrawBox from "components/drawBox.vue";


const store = useRaffleSettingsStore();
const {numberSold, numberPickedColor, raffleBasedOn} = storeToRefs(store)
const contestantsStore = useContestantStore()
const {getContestants} = storeToRefs(contestantsStore)

const $q = useQuasar();

const idNumberRef = ref([])
const picked = ref(false)

// onMounted()
// use Array.from to get all the numbers from the number of tickets sold and 1
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range

// const ticketsSold = computed( () => {
//   return Array.from({ length: ticketsSold }, (v, i) => i);
// })

// const numberIsPickedColor = ref( numberPickedColor );
// const setBGColor = () => { console.log( 'clicked' )}

const drawBoxes = () => {
  if (baseBoxesOn === 'contestantList' && getContestants.length > 1) {
    return getContestants
  }
  return numberSold
}

const chunkedRows = computed( () => {
  let group = [];
  const itemsPer = 20;
  let source = [];



  if (store.raffleBasedOn === 'contestantList' ) {
    source = getContestants.value
  } else {
    let ns = Array.from({length: numberSold.value }, (v, k) => k+1);

    source.push( ...ns )
  }

  for(var i = 0; i < source.length; i += itemsPer) {
    group.push(source.slice(i, i+itemsPer));
  }

  return group;
})

const setBGColor = () => {
  console.log('store', store.numberSold)
  let min = Math.ceil(1);
  console.log('min', min)
  let max = Math.floor(store.numberSold);
  console.log('max', max)
  let id = Math.floor(Math.random() * (max - min) + min);
  console.log(id)

  console.log('itemRef', idNumberRef.value)
  return document.querySelector('#' + id).style.backgroundColor = store.numberPickedColor
}


//   return {
//     numberSold,
//     numberPickedColor,
//     hover: false,
//     setBGColor,
//     picked: false
//   }
// }
// })
</script>

<style lang="scss">
.draw-box--container {
  //height: 10%;
  //width: 10%;
}

.draw-box {
  //flex-grow: 1;
  //flex: 1 1 0;
  width: 9vw;
}

</style>
