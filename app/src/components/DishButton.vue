<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'タイトル',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const pressed = ref(false)

</script>

<template>
  <button
    type="button"
    class="btn border transition focus:outline-none active:scale-95 active:opacity-80"
    :class="{ 'scale-95 opacity-80 shadow-none': pressed, 'opacity-30 cursor-not-allowed': props.disabled }"
    :disabled="props.disabled"
    @pointerdown="pressed = true"
    @pointerup="pressed = false"
    @pointercancel="pressed = false"
    @pointerleave="pressed = false"
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
