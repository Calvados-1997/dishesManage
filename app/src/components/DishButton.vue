<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'タイトル',
  },
  fontSize: {
    type: String,
    default: '10px',
  },
  color: {
    type: String,
    default: 'black',
  },
})

const pressed = ref(false)

const styleObject = {
  'font-size': props.fontSize,
  color: props.color,
}
</script>

<template>
  <button
    type="button"
    class="btn border transition focus:outline-none active:scale-95 active:opacity-80"
    :class="{ 'scale-95 opacity-80 shadow-none': pressed }"
    @pointerdown="pressed = true"
    @pointerup="pressed = false"
    @pointercancel="pressed = false"
    @pointerleave="pressed = false"
    :style="styleObject"
  >
    {{ props.title }}
  </button>
</template>

<style lang="css">
.btn {
  padding: 5px 20px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
</style>
