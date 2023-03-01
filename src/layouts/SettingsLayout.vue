<template>
  <q-layout view="hHh lpR fFf">

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
  <q-form>
    <div class="q-pa-md">
      <q-select v-model="model" :options="options" label="Number Of tickets Sold" />
    </div>
  </q-form>
  </q-layout>
  <q-page-container>
    <router-view />
  </q-page-container>
</template>

<script>
// import { ref } from 'vue'

export default {

  name: "SettingsLayout",
  model: raffleSettings,
  options: [
    '100', '150', '200', '250', '300', '350', '400', '450', '500'
  ]
}
</script>

<style scoped>

</style>
