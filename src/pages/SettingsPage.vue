<template>
      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            Ravenna Baseball Reverse Raffle Settings
          </q-toolbar-title>
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab to="/" label="Raffle" />
        </q-tabs>
      </q-header>
<q-page-container class="flex justify-center row">
  <form class="col-8" action="">
    <div class="q-gutter-sm">
      <p>
        How will the raffle be ran?
      </p>
      <ul>
        <li>
          Base the draw boxes by a predetermined numbers list (ie. sold 100 tickets so 100 boxes will be shown)
        </li>
        <li>
          Base the draw boxes on the amount of Names and Numbers in a contestant list
          <ul>
            <li>
              This option also includes the persons name in the raffle draw down box
            </li>
          </ul>
        </li>
      </ul>
      <q-radio v-model="baseBoxesOn" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="numbers" label="Use Numbers Only" />
      <q-radio v-model="baseBoxesOn" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="contestantList" label="I have a Contestant List" />
    </div>
    <template v-if="baseBoxesOn === 'numbers'">
      <q-select v-model="ticketsSold" :options="options" label="Number Of Tickets Sold" />
    </template>
    <template v-if="baseBoxesOn === 'contestantList'">
      <vue-csv-import
        v-model="allContestants"
        :fields="{
          name: {required: true, label: 'Name'},
          numberPurchased: {required: true, label: 'Number Purchased'}
        }"
      >
        <vue-csv-toggle-headers ></vue-csv-toggle-headers>
        <vue-csv-errors></vue-csv-errors>
        <vue-csv-input></vue-csv-input>
        <vue-csv-map :auto-match="false"></vue-csv-map>
      </vue-csv-import>

      <div v-if="allContestants.length >= 1">
        <q-btn label="Preview Contestants" color="primary" @click="dialog = true" />
        <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card >
            <q-bar>
              <q-space />

              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <div class="text-h6">Uploaded Contestants</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-table
                title="Contestant Data"
                :rows="allContestants"
                :columns="contestantColumns"
                row-key="name"
                dark
                color="amber"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </template>
    <div class="q-mt-lg">
      <q-input
        filled
        v-model="pickedColor"
        label="Picked Number Color"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="pickedColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
<!--    <div class="q-mt-sm">-->
<!--      <q-btn label="Save Settings" type="submit" @click="updateTicketsSoldNumber()" color="primary"/>-->
<!--    </div>-->
  </form>
</q-page-container>
<!--  </q-layout>-->
  <q-page-container>
    <router-view />
  </q-page-container>
</template>

<script>
import { ref } from 'vue'
import { useRaffleSettingsStore } from "stores/raffleSettings";
import { useContestantStore } from "stores/raffleContestants";
import { storeToRefs } from "pinia";
import {useQuasar} from "quasar";


export default {

  name: "SettingsLayout",
  setup () {
    const settingsStore = useRaffleSettingsStore()
    const contestantsStore = useContestantStore()
    const { ticketsSold, pickedColor, baseBoxesOn } = storeToRefs(settingsStore)
    const { allContestants } = storeToRefs(contestantsStore)
    const $q = useQuasar();

    // try {
    //   console.log( $q.localStorage.has('pickedColor'))
    //   $q.localStorage.set( 'pickedColor',store.pickedColor)
    // } catch (e ) {
    //   console.error( e )
    // }
    // const csv = ref()
    return {
      ticketsSold,
      pickedColor,
      options: [
        {
          label: '100',
          value: 100,
          picked: false

        },
        {
          label: '150',
          value: 150,
          picked: false

        },
        {
          label: '200',
          value: 200,
          picked: false

        },
        {
          label: '250',
          value: 250,
          picked: false

        },
        {
          label: '300',
          value: 300,
          picked: false

        },
        {
          label: '350',
          value: 350,
          picked: false

        },
        {
          label: '400',
          value: 400,
          picked: false

        },
        {
          label: '450',
          value: 450,
          picked: false

        },
        {
          label: '500',
          value: 500,
          picked: false

        },

      ],
      allContestants,
      baseBoxesOn,
      dialog: ref(false),
      maximizedToggle: ref(true),
      contestantColumns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name'
        },
        {
          name: 'numberPurchased',
          label: 'Number Purchased',
          align: 'center',
          field: 'numberPurchased'
        },
      ]

      // csv
      // updateTicketsSoldNumber
    }
  }
}
</script>

<style scoped>

</style>
