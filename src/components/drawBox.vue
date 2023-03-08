<template>
  <div class="column draw-box--container" >
    <div class="col q-card--bordered draw-box" :class="picked && 'bg-primary text-white'" :id=" id ">
      <p class="text-center">
        {{ id }}
      </p>
      <template v-if="picked">
        <modal-dialog  />
      </template>

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ModalDialog from "components/modalDialog.vue";

export default defineComponent({
  name: "drawBox",
  components: {ModalDialog},

  props: {
    items: {
      type: Object
    },
    id: {
      type: [Number, String],
      default: 0
    },
    purchaserName: {
      type: String,
      default: ''
    },
    picked: {
      type: Boolean,
      default: false
    },
    blob: {
      type: Object
    },
  }

  })
</script>
