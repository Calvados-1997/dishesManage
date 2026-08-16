<script setup lang="ts">

const props = defineProps({
  placeholder: {
    type: String,
    defautl: '',
  },
})

const input = defineModel<number>()

const onChangeInput = (e: Event) => {
  const el = e.target as HTMLInputElement
  const converted = el.value.normalize('NFKC').replace(/[^0-9]/g, '')
  if (el.value !== converted) {
    el.value = converted
    input.value = Number(converted)
  }
}
</script>

<template>
  <input
    class="border"
    type="text"
    :placeholder="props.placeholder"
    v-model.trim.number="input"
    @input="onChangeInput"
    inputmode="numeric"
  />
</template>

<style lang="css"></style>
