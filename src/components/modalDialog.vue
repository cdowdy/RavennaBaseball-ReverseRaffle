<template>
  <q-dialog  ref="dialogRef"  @hide="onDialogHide" full-width>
    <q-card class="q-dialog-plugin text-center bg-primary text-white">
      <q-card-section>
        <q-card-section>
          <h1>
            {{ pickedName }}
          </h1>
          <h2>
            {{ pickedNumber }}
          </h2>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn color="secondary" label="close" @click="onOKClick"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    pickedName: {
      type: String,
      default: ''
    },
    pickedNumber: {
      type: [Number, String]
    }
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup () {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick () {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK()
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
    }
  }
}

</script>

<style scoped>

</style>
