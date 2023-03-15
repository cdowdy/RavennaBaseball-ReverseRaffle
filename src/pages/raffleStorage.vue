<template>
  <q-page padding>
    <!-- content -->
    <!-- if its numbers only -->

    <template v-if="store.raffleBasedOn === 'numbers' ">
      <div v-if="store.getTicketNumberList.length >= 1">

      </div>
      <div v-else>
        not greater than or equal too 1
        <ul>
          <li>
            {{ store.getTicketNumberList }}
          </li>
        </ul>

      </div>

    </template>

<!--    <template v-if="store.getTicketNumberList.length >= 1">-->
<!--      <q-table-->
<!--        :rows="getTicketNumberList"-->
<!--      >-->
<!--      </q-table>-->
<!--      <div class="row q-py-sm q-my-sm">-->
<!--        <div class="col">-->
<!--          <p>-->
<!--            Warning this is NOT reversible-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="col">-->
<!--          <q-btn-->
<!--            color="secondary"-->
<!--            label="Clear Number List"-->
<!--            @click="clearNumberList()"-->
<!--          >-->

<!--          </q-btn>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--    <template v-if="contestantsStore.getContestants.length >= 1">-->
<!--      <q-table-->
<!--        :rows="getContestants"-->
<!--      >-->
<!--      </q-table>-->
<!--      <div class="row q-py-sm q-my-sm">-->
<!--        <div class="col">-->
<!--          <p>-->
<!--            Warning this is NOT reversible-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="col">-->
<!--          <q-btn-->
<!--            color="secondary"-->
<!--            label="Clear Contestant List"-->
<!--            @click="clearContestantList()"-->
<!--          >-->

<!--          </q-btn>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->

    <div class="q-py-md" >

      <div class="row justify-center items-center">
        <div class="col-4 items-center">
          <router-link class="q-mb-auto q-mt-auto  text-weight-medium justify-center"
                       to="/">
            Raffle
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
  </q-page>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useRaffleSettingsStore} from "stores/raffleSettings";
import { useContestantStore} from 'stores/raffleContestants'

const store = useRaffleSettingsStore();
const {getTicketNumberList } = storeToRefs(store)

const contestantsStore = useContestantStore()
const {getContestants  } = storeToRefs(contestantsStore)

const clearNumbersList = () => {

}

const clearContestantList = () => {
  store.baseBoxesOn.$reset();
  return contestantsStore.$reset()
}

</script>
