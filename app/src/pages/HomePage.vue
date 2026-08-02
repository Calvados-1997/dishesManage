<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
const selected = ref<string>('')
const options = [
  {text: '115', value: '115'},
  {text: '120', value: '120'},
  {text: '130', value: '130'},
  {text: '150', value: '150'},
]

const toDishCountPage = () => {
  router.push({name: 'dish-count', params: { 'stdPrice': selected.value }})
}
</script>

<template>
    <div class="main-content">
      <p>1皿の値段を選択してください</p>
      <div class="price-select-area flex">
        <select @change="toDishCountPage()" class="border" v-model="selected" placeholder="1皿の値段を選択してください">
          <option v-for="option in options" :value="option.value" :key="option.text">
            {{ option.text }}
          </option>
        </select>
      </div>
  </div>
</template>

<style scoped>
.price-select-area > select option {
  font-size: 17px;
}</style>