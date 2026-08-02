<script setup lang="ts">
const props = defineProps({
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
    type="text"
    :placeholder="props.placeholder"
    v-model.trim="input"
  />
</template>

<style lang="css"></style>
