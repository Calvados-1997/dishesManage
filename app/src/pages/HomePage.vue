<script setup lang="ts">
import { STANDARD_PRICES_OPTIONS } from '@/consts/price'
import router from '@/router'
import type { StandardPrice } from '@/types/price'
import { ref } from 'vue'

const selected = ref<StandardPrice | ''>('')
const options = STANDARD_PRICES_OPTIONS

const toDishCountPage = () => {
  router.push({name: 'dish-count', params: { 'stdPrice': selected.value }})
}
</script>

<template>
    <div class="main-content">
      <p>1皿の値段を選択してください</p>
      <div class="price-select-area flex">
        <select @change="toDishCountPage()" class="border" v-model="selected" placeholder="1皿の値段を選択してください">
          <option v-for="option in options" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
  </div>
</template>

<style scoped>
.price-select-area > select option {
  font-size: 17px;
}
</style>