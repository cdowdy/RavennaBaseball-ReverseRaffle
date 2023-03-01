<template>
  <div class="column draw-box--container" >
    <div class="col q-card--bordered draw-box" :id=" id ">
      <p class="text-center text-h6">
        {{ id }}
      </p>
      <p v-if="purchaserName" class="text-center text-caption">
        {{ purchaserName }}
      </p>
      <template v-if="picked">
        <q-input outlined :value="purchaserName" />
      </template>

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: "drawBox",

  props: {
    id: {
      type:[ Number, String ],
      default: 0
    },
    purchaserName: {
      type: String,
      default: ''
    },
    picked: {
      type: Boolean,
      default: false
    }
  }


})
</script>
