<template>
  <q-page padding>
   <q-markup-table >
     <thead>
     <tr>
       <td>Name</td>
       <td>Number</td>
     </tr>
     </thead>
     <tbody>
     <tr v-for="contestant in contestantsStore.getContestants" :key="contestant.numberPurchased">
       <template v-if="contestant.picked === true ">
         <td>

           {{ contestant.name }}
         </td>
         <td>
           {{ contestant.numberPurchased }}
         </td>
       </template>

     </tr>
     </tbody>
   </q-markup-table>

    <div class="row justify-center items-center">
      <div class="col-4 items-center">
        <router-link class="q-mb-auto q-mt-auto  text-weight-medium justify-center"
                     to="/">
          Raffle
        </router-link>
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
  </q-page>
</template>

<script setup>
import { useContestantStore} from 'stores/raffleContestants'
import {storeToRefs} from "pinia";
const contestantsStore = useContestantStore()
const {getPickedContestants,getContestants } = storeToRefs(contestantsStore)

</script>
