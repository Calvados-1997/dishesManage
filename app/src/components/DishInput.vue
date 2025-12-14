<script setup lang="ts">
const props = defineProps({
  inputType: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    defautl: '',
  },
})

const input = defineModel('input')
</script>

<template>
  <input
    class="border"
    :type="props.inputType"
    :placeholder="props.placeholder"
    v-model.trim="input"
  />
</template>

<style lang="css"></style>
