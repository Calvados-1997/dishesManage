<script setup lang="ts">
import { ref, watch } from 'vue'
import SaraButton from './components/SaraButton.vue'
import { MENU_PRICE_115, MENU_PRICE_120, MENU_PRICE_130, MENU_PRICE_150 } from './const/menu_price'

const minPrice = ref<string | undefined>(undefined)
const dishPrices = ref<number[] | undefined>(undefined)

watch(minPrice, (selectedPrice) => {
  switch (selectedPrice){
    case "115":
      dishPrices.value = MENU_PRICE_115
      break
    case "120":
      dishPrices.value = MENU_PRICE_120
      break
    case "130":
      dishPrices.value = MENU_PRICE_130
      break
    case "150":
      dishPrices.value = MENU_PRICE_150
      break
    default:
      console.error(
        `
        [エラー]
        入力された選択肢が想定している値と一致しません。
        data: ${selectedPrice}
        data_type: ${typeof selectedPrice}
        `
      )
      break
  }
})
</script>

<template>
  <div>
    <select v-model="minPrice" placeholder="1皿の値段を選択してください">
      <option disabled value="">1皿の値段を選択してください</option>
      <option>115</option>
      <option>120</option>
      <option>130</option>
      <option>150</option>
    </select>
  </div>

  <div v-for="price in dishPrices">
    <p>{{ price }}</p>
  </div>
  
  <div v-if="minPrice">
    <p>任意入力</p>
  </div>
</template>

<style scoped></style>
